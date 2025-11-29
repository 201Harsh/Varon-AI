"use client";

import { useState, useEffect, useRef } from "react";
import { FiZap, FiCpu, FiShield } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import { useTheme } from "../theme/ThemeToogle";
import ConnectionAnimation from "../Components/Varon/ConnectionAnimation";
import VaronHeader from "../Components/Varon/VaronHeader";
import VaronConnectionSection from "../Components/Varon/VaronConnectionSection";
import VaronChatSection from "../Components/Varon/VaronChatSection";
import { getSocket } from "@/utils/socketInstance";
import { useAuth } from "@/hooks/UserContext";
import AxiosProxyInstance from "@/config/AxiosProxyInstance";

export default function VaronAIPage() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [userData, setuserData] = useState([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const token: string = useAuth();

  const simulateConnection = () => {
    setIsConnecting(true);

    const socket = getSocket(token);
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to server");
      setIsConnecting(false);
      setIsConnected(true);

      setMessages([
        {
          id: 1,
          text: "Hello! I'm Varon AI, your intelligent assistant. I coordinate multiple expert AIs to help you with any task. What would you like to accomplish today?",
          sender: "varon",
          timestamp: new Date(),
        },
      ]);
    });

    socket.on("server-reply", (msg: string) => {
      setIsTyping(false);

      const varonMessage = {
        id: Date.now(),
        text: msg,
        sender: "varon",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, varonMessage]);
    });
  };

  const disconnect = () => {
    const socket = getSocket(token);
    socket.disconnect();
    setIsConnected(false);
    setMessages([]);
    setInputMessage("");
    setIsTyping(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const socket = getSocket(token);

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    socket.emit("client-message", inputMessage);

    setInputMessage("");
    setIsTyping(true);
  };

  const FetchUserInfo = async () => {
    try {
      const res = await AxiosProxyInstance.get("/api/profile");

      if (res.status === 200) {
        setuserData(res.data.user);
      }
    } catch (error) {}
  };

  useEffect(() => {
    FetchUserInfo();
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-linear-to-br from-black bg-black via-emerald-400/5 to-green-400/10 text-white"
          : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <VaronHeader
        isConnected={isConnected}
        isConnecting={isConnecting}
        simulateConnection={simulateConnection}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        disconnect={disconnect}
        userData={userData}
      />

      {/* Main Content */}
      <main className="pt-20">
        {!isConnected ? (
          <div
            className={`rounded-2xl transition-colors duration-300 ${
              isDarkMode ? "bg-black/5" : "bg-gray-50"
            }`}
          >
            {isConnecting ? (
              <ConnectionAnimation isDarkMode={isDarkMode} />
            ) : (
              <VaronConnectionSection
                isDarkMode={isDarkMode}
                simulateConnection={simulateConnection}
              />
            )}
          </div>
        ) : (
          <div>
            {/* Chat Area */}
            <VaronChatSection
              messages={messages}
              isDarkMode={isDarkMode}
              messagesEndRef={messagesEndRef}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
              isTyping={isTyping}
            />
          </div>
        )}
      </main>
    </div>
  );
}
