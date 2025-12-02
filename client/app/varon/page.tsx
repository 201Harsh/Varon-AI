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
import { redirect } from "next/navigation";
import { Flip, Slide, toast } from "react-toastify";

export default function VaronAIPage() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [userData, setuserData] = useState([]);

  // State for rendering live updates
  const [ThinkingResponse, setThinkingResponse] = useState("");
  const [ThinkingStatus, setThinkingStatus] = useState("");

  // Refs for access inside socket listeners (MANDATORY FIX)
  const thinkingResponseRef = useRef("");
  const thinkingStatusRef = useRef("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, ThinkingResponse]);

  const token: string = useAuth();

  const simulateConnection = () => {
    setIsConnecting(true);

    const socket = getSocket(token);
    socket.connect();

    socket.on("connect", () => {
      toast.success("Connected to Varon AI.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDarkMode ? "dark" : "light",
        transition: Flip,
      });
      setIsConnecting(false);
      setIsConnected(true);
    });

    socket.on("connect_error", (err: any) => {
      toast.success("Failed to connect to Varon AI.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDarkMode ? "dark" : "light",
        transition: Slide,
      });
      if (err.message === "AUTH_REQUIRED") {
        redirect("/login");
      }
    });

    socket.on("thinking-status", (msg: string) => {
      setThinkingStatus(msg);
      thinkingStatusRef.current = msg; // Update ref
    });

    socket.on("thinking-response", (msg: string) => {
      setThinkingResponse(msg);
      thinkingResponseRef.current = msg; // Update ref
    });

    socket.on("server-reply", (msg: string) => {
      setIsTyping(false);

      // Create message object WITH captured thinking data from Refs
      const varonMessage = {
        id: Date.now(),
        text: msg,
        sender: "varon",
        timestamp: new Date(),
        thinking: thinkingResponseRef.current
          ? {
              response: thinkingResponseRef.current,
              status: thinkingStatusRef.current || "Thought Process",
            }
          : null,
      };

      setMessages((prev) => [...prev, varonMessage]);

      // Reset State & Refs
      setThinkingResponse("");
      setThinkingStatus("");
      thinkingResponseRef.current = "";
      thinkingStatusRef.current = "";
    });
  };

  const disconnect = () => {
    const socket = getSocket(token);
    socket.disconnect();
    toast.success("Disconnected from Varon AI.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: isDarkMode ? "dark" : "light",
      transition: Flip,
    });
    setIsConnected(false);
    setMessages([]);
    setInputMessage("");
    setIsTyping(false);
    setThinkingResponse("");
    setThinkingStatus("");
    thinkingResponseRef.current = "";
    thinkingStatusRef.current = "";
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
    // Reset thinking logic for new message
    setThinkingResponse("");
    setThinkingStatus("");
    thinkingResponseRef.current = "";
    thinkingStatusRef.current = "";
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
          ? "bg-linear-to-br from-black bg-black via-emerald-400/5 to-black/3 text-white"
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
              ThinkingResponse={ThinkingResponse}
              ThinkingStatus={ThinkingStatus}
            />
          </div>
        )}
      </main>
    </div>
  );
}
