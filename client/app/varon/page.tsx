"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSend,
  FiUser,
  FiArrowRight,
  FiZap,
  FiCpu,
  FiShield,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { FaTeamspeak, FaRobot, FaCheckCircle } from "react-icons/fa";
import { useTheme } from "../theme/ThemeToogle";
import Image from "next/image";
import ConnectionAnimation from "../Components/Varon/ConnectionAnimation";
import VaronHeader from "../Components/Varon/VaronHeader";
import VaronConnectionSection from "../Components/Varon/VaronConnectionSection";
import VaronChatSection from "../Components/Varon/VaronChatSection";
import { getSocket } from "@/utils/socketInstance";

export default function VaronAIPage() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateConnection = () => {
    setIsConnecting(true);

    const socket = getSocket();
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

    socket.on("server-reply", (msg : string) => {
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const socket = getSocket();

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

  const generateAIResponse = (userMessage: string) => {
    const responses = [
      "I've analyzed your request and coordinated with my specialist team. Here's what we've prepared for you...",
      "Based on your query, I've deployed the most suitable AI specialists. Here are the results of our collaboration...",
      "I've processed your request through multiple expert systems. Here's the comprehensive solution we've developed...",
      "My team of AI specialists has worked together to provide you with the following solution...",
      "I've coordinated with relevant experts to address your request. Here's our combined response...",
    ];

    const actions = [
      "✅ Code analysis completed",
      "🔍 Research findings compiled",
      "📊 Data processed and visualized",
      "📝 Documentation generated",
      "🎯 Solution optimized",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    const randomActions = [...actions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .join("\n");

    return `${randomResponse}\n\n${randomActions}\n\nIs there anything specific you'd like me to elaborate on or modify?`;
  };

  const getRandomSpecialists = () => {
    const specialists = [
      { name: "Code AI", icon: FiCpu, color: "from-blue-500 to-cyan-500" },
      {
        name: "Research AI",
        icon: FiZap,
        color: "from-purple-500 to-pink-500",
      },
      {
        name: "Analysis AI",
        icon: FaRobot,
        color: "from-orange-500 to-red-500",
      },
      {
        name: "Design AI",
        icon: FiShield,
        color: "from-green-500 to-emerald-500",
      },
    ];
    return [...specialists].sort(() => 0.5 - Math.random()).slice(0, 2);
  };

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
      />

      {/* Main Content */}
      <main className="pt-20">
        {!isConnected ? (
          <div
            className={`rounded-2xl transition-colors duration-300 ${
              isDarkMode ? "bg-black/50" : "bg-gray-50"
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
