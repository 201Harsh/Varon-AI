"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../theme/ThemeToogle";
import ConnectionAnimation from "../Components/Varon/ConnectionAnimation";
import VaronHeader from "../Components/Varon/VaronHeader";
import VaronConnectionSection from "../Components/Varon/VaronConnectionSection";
import VaronChatSection from "../Components/Varon/VaronChatSection";
import { getSocket } from "@/utils/socketInstance";
import { useAuth } from "@/hooks/UserContext";
import AxiosProxyInstance from "@/config/AxiosProxyInstance";
import { redirect } from "next/navigation";
import { Flip, toast } from "react-toastify";

export default function VaronAIPage() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [userData, setuserData] = useState([]);

  const [ThinkingResponse, setThinkingResponse] = useState("");
  const [ThinkingStatus, setThinkingStatus] = useState("");
  const [ThinkingTools, setThinkingTools] = useState<string[]>([]);

  const thinkingResponseRef = useRef("");
  const thinkingStatusRef = useRef("");
  const thinkingToolsRef = useRef<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, ThinkingResponse, ThinkingTools]);

  const token: string = useAuth();
  const socket = getSocket(token);

  const generateId = () => {
    return typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => {
      toast.success("Connected to Varon AI.", {
        position: "top-right",
        autoClose: 2500,
        closeOnClick: true,
        theme: isDarkMode ? "dark" : "light",
        transition: Flip,
      });
      setIsConnecting(false);
      setIsConnected(true);
    };

    const onConnectError = (err: any) => {
      toast.error(err.message, { theme: isDarkMode ? "dark" : "light" });
      setIsConnecting(false);
      if (err.message === "AUTH_REQUIRED") redirect("/login");
    };

    const onToolCall = (msg: string) => {
      thinkingToolsRef.current = [...thinkingToolsRef.current, msg];
      setThinkingTools([...thinkingToolsRef.current]);
    };

    const onThinkingStatus = (msg: string) => {
      setThinkingStatus(msg);
      thinkingStatusRef.current = msg;
    };

    const onThinkingResponse = (chunk: string) => {
      setThinkingResponse((prev) => prev + chunk);
      thinkingResponseRef.current += chunk;
    };

    const onServerReply = (msg: string) => {
      setIsTyping(false);

      const varonMessage = {
        id: generateId(),
        text: msg,
        sender: "varon",
        timestamp: new Date(),
        thinking: thinkingResponseRef.current
          ? {
              response: thinkingResponseRef.current,
              status: thinkingStatusRef.current || "Thought Process",
            }
          : null,
        tools:
          thinkingToolsRef.current.length > 0
            ? [...thinkingToolsRef.current]
            : null,
      };

      setMessages((prev) => [...prev, varonMessage]);

      setThinkingResponse("");
      setThinkingStatus("");
      setThinkingTools([]);
      thinkingResponseRef.current = "";
      thinkingStatusRef.current = "";
      thinkingToolsRef.current = [];
    };

    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);
    socket.on("tool-call", onToolCall);
    socket.on("thinking-status", onThinkingStatus);
    socket.on("thinking-response", onThinkingResponse);
    socket.on("server-reply", onServerReply);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.off("tool-call", onToolCall);
      socket.off("thinking-status", onThinkingStatus);
      socket.off("thinking-response", onThinkingResponse);
      socket.off("server-reply", onServerReply);
    };
  }, [socket, isDarkMode]);

  const simulateConnection = () => {
    setIsConnecting(true);
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
    toast.success("Disconnected from Varon AI.", {
      position: "top-right",
      autoClose: 2000,
      closeOnClick: true,
      theme: isDarkMode ? "dark" : "light",
      transition: Flip,
    });
    setIsConnected(false);
    setMessages([]);
    setInputMessage("");
    setIsTyping(false);
    setThinkingResponse("");
    setThinkingStatus("");
    setThinkingTools([]);
    thinkingResponseRef.current = "";
    thinkingStatusRef.current = "";
    thinkingToolsRef.current = [];
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: generateId(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    socket.emit("client-message", inputMessage);

    setInputMessage("");
    setIsTyping(true);

    setThinkingResponse("");
    setThinkingStatus("");
    setThinkingTools([]);
    thinkingResponseRef.current = "";
    thinkingStatusRef.current = "";
    thinkingToolsRef.current = [];
  };

  const FetchUserInfo = async () => {
    try {
      const res = await AxiosProxyInstance.get("/api/profile");
      if (res.status === 200) setuserData(res.data.user);
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
      <VaronHeader
        isConnected={isConnected}
        isConnecting={isConnecting}
        simulateConnection={simulateConnection}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        disconnect={disconnect}
        userData={userData}
      />

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
            ThinkingTools={ThinkingTools}
          />
        )}
      </main>
    </div>
  );
}
