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

    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);

      // Add welcome message
      setMessages([
        {
          id: 1,
          text: "Hello! I'm Varon AI, your intelligent assistant. I coordinate multiple expert AIs to help you with any task. What would you like to accomplish today?",
          sender: "varon",
          timestamp: new Date(),
        },
      ]);
    }, 3000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = generateAIResponse(inputMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: aiResponse,
          sender: "varon",
          timestamp: new Date(),
          specialists: getRandomSpecialists(),
        },
      ]);
    }, 1500);
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

  const ConnectionAnimation = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative mb-8"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`w-24 h-24 rounded-full flex items-center justify-center ${
            isDarkMode
              ? "bg-linear-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
              : "bg-linear-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
          }`}
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaTeamspeak className="text-3xl text-emerald-500" />
          </motion.div>
        </motion.div>

        {/* Orbiting dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${
              isDarkMode ? "bg-emerald-400" : "bg-emerald-500"
            }`}
            animate={{
              x: [0, 40 * Math.cos((i * 2 * Math.PI) / 3), 0],
              y: [0, 40 * Math.sin((i * 2 * Math.PI) / 3), 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <h3 className="text-xl font-semibold mb-2 text-emerald-500">
          Connecting to Varon AI Network...
        </h3>
        <p
          className={`transition-colors duration-300 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Initializing specialist AI coordination system
        </p>
      </motion.div>

      <motion.div
        className="mt-6 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full ${
              isDarkMode ? "bg-emerald-400" : "bg-emerald-500"
            }`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`border-b transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-900 border-emerald-500/20"
            : "bg-white border-emerald-500/30"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-950 via-teal-950 to-black/30"
                    : "bg-linear-to-r from-black to-black"
                }`}
              >
                <Image
                  width={100}
                  height={100}
                  src="/img/logo.png"
                  alt="Varon AI"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">Varon AI</h1>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isConnected ? "bg-emerald-500" : "bg-gray-500"
                    }`}
                  />
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {isConnected ? "Connected" : "Disconnected"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 text-yellow-400"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {isDarkMode ? <FiSun /> : <FiMoon />}
              </motion.button>

              {!isConnected && !isConnecting && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={simulateConnection}
                  className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                      : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-lg hover:shadow-emerald-400/25"
                  }`}
                >
                  Connect to AI <FiArrowRight />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        {!isConnected ? (
          <div
            className={`rounded-2xl p-8 border transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-900 border-emerald-500/20"
                : "bg-gray-50 border-emerald-500/30"
            }`}
          >
            {isConnecting ? (
              <ConnectionAnimation />
            ) : (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mb-8"
                >
                  <div
                    className={`w-32 h-32 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-linear-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
                        : "bg-linear-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10"
                    }`}
                  >
                    <FaTeamspeak className="text-5xl text-emerald-500" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    Welcome to{" "}
                    <span
                      className={`transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                          : "bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                      }`}
                    >
                      Varon AI
                    </span>
                  </h2>
                  <p
                    className={`text-lg mb-8 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Your intelligent AI coordinator that manages multiple
                    specialist assistants
                  </p>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={simulateConnection}
                  className={`px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-3 mx-auto ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-xl hover:shadow-emerald-500/25"
                      : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-xl hover:shadow-emerald-400/25"
                  }`}
                >
                  Connect to Varon AI <FiArrowRight />
                </motion.button>

                <div
                  className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {[
                    {
                      icon: FaTeamspeak,
                      title: "AI Coordination",
                      description:
                        "Intelligent task delegation to specialist AIs",
                    },
                    {
                      icon: FiZap,
                      title: "Real-time Processing",
                      description:
                        "Simultaneous execution across multiple experts",
                    },
                    {
                      icon: FaCheckCircle,
                      title: "Quality Assurance",
                      description:
                        "Verified results from coordinated AI teamwork",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className={`p-6 rounded-xl border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-gray-800/50 border-emerald-500/20"
                          : "bg-white border-emerald-500/30"
                      }`}
                    >
                      <feature.icon className="text-2xl text-emerald-500 mb-3" />
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            {/* Chat Area */}
            <div
              className={`lg:col-span-3 rounded-2xl border transition-colors duration-300 flex flex-col ${
                isDarkMode
                  ? "bg-gray-900 border-emerald-500/20"
                  : "bg-white border-emerald-500/30"
              }`}
            >
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 transition-colors duration-300 ${
                          message.sender === "user"
                            ? isDarkMode
                              ? "bg-emerald-500/20 border border-emerald-500/30"
                              : "bg-emerald-500/10 border border-emerald-500/20"
                            : isDarkMode
                            ? "bg-gray-800 border border-gray-700"
                            : "bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {/* Message Header */}
                        <div className="flex items-center gap-2 mb-2">
                          {message.sender === "varon" ? (
                            <>
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  isDarkMode
                                    ? "bg-linear-to-r from-emerald-500 to-teal-500"
                                    : "bg-linear-to-r from-emerald-400 to-teal-400"
                                }`}
                              >
                                <FaTeamspeak className="text-xs text-white" />
                              </div>
                              <span className="text-sm font-semibold">
                                Varon AI
                              </span>
                            </>
                          ) : (
                            <>
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  isDarkMode ? "bg-gray-600" : "bg-gray-400"
                                }`}
                              >
                                <FiUser className="text-xs text-white" />
                              </div>
                              <span className="text-sm font-semibold">You</span>
                            </>
                          )}
                        </div>

                        {/* Message Content */}
                        <div className="whitespace-pre-wrap text-sm">
                          {message.text}
                        </div>

                        {/* Specialists Involved */}
                        {message.specialists && (
                          <div className="mt-3 pt-3 border-t border-gray-500/20">
                            <p className="text-xs text-gray-500 mb-2">
                              Specialists involved:
                            </p>
                            <div className="flex gap-2">
                              {message.specialists.map(
                                (specialist: any, index: number) => (
                                  <div
                                    key={index}
                                    className={`px-2 py-1 rounded-lg text-xs bg-linear-to-r ${specialist.color} text-white flex items-center gap-1`}
                                  >
                                    <specialist.icon className="text-xs" />
                                    {specialist.name}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-gray-800 border border-gray-700"
                          : "bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isDarkMode
                              ? "bg-linear-to-r from-emerald-500 to-teal-500"
                              : "bg-linear-to-r from-emerald-400 to-teal-400"
                          }`}
                        >
                          <FaTeamspeak className="text-xs text-white" />
                        </div>
                        <span className="text-sm font-semibold">Varon AI</span>
                      </div>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              isDarkMode ? "bg-emerald-400" : "bg-emerald-500"
                            }`}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div
                className={`border-t p-4 transition-colors duration-300 ${
                  isDarkMode ? "border-emerald-500/20" : "border-emerald-500/30"
                }`}
              >
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Message Varon AI..."
                    className={`flex-1 px-4 py-3 rounded-xl border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!inputMessage.trim()}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                      inputMessage.trim()
                        ? isDarkMode
                          ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                          : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-lg hover:shadow-emerald-400/25"
                        : isDarkMode
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <FiSend className="text-sm" />
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div
              className={`rounded-2xl border p-6 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-900 border-emerald-500/20"
                  : "bg-white border-emerald-500/30"
              }`}
            >
              <h3 className="font-semibold mb-4">AI Specialists</h3>
              <div className="space-y-3">
                {[
                  {
                    name: "Code AI",
                    status: "Available",
                    color: "bg-blue-500",
                  },
                  {
                    name: "Research AI",
                    status: "Available",
                    color: "bg-purple-500",
                  },
                  {
                    name: "Analysis AI",
                    status: "Available",
                    color: "bg-orange-500",
                  },
                  {
                    name: "Design AI",
                    status: "Available",
                    color: "bg-green-500",
                  },
                  {
                    name: "Writing AI",
                    status: "Available",
                    color: "bg-pink-500",
                  },
                ].map((ai, index) => (
                  <div
                    key={ai.name}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors duration-300 ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${ai.color}`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{ai.name}</div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {ai.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`mt-6 p-4 rounded-xl transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-emerald-500/10 border border-emerald-500/20"
                    : "bg-emerald-500/5 border border-emerald-500/10"
                }`}
              >
                <h4 className="font-semibold text-sm mb-2 text-emerald-500">
                  System Status
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Coordination Engine</span>
                    <span className="text-emerald-500">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Network</span>
                    <span className="text-emerald-500">Optimal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Time</span>
                    <span className="text-emerald-500">Fast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
