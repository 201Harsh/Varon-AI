import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTeamspeak } from "react-icons/fa";
import {
  FiCloud,
  FiUser,
  FiCopy,
  FiCheck,
  FiThumbsUp,
  FiThumbsDown,
  FiShare2,
  FiMoreHorizontal,
  FiVolume2,
  FiStopCircle,
  FiRefreshCw,
  FiFlag,
} from "react-icons/fi";
import { useEffect, useState, useRef } from "react";

// --- Sub-Component for Individual Messages ---
const MessageItem = ({
  message,
  isDarkMode,
}: {
  message: any;
  isDarkMode: boolean;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [feedback, setFeedback] = useState<"none" | "liked" | "disliked">(
    "none"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle Click Outside Menu to Close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Copy
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Handle Like/Dislike
  const handleFeedback = (type: "liked" | "disliked") => {
    setFeedback((prev) => (prev === type ? "none" : type));
  };

  // Handle Share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Varon AI Response",
          text: message.text,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      handleCopy();
    }
  };

  // Handle Read Aloud
  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      // Cancel any currently speaking audio first
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message.text);
      utterance.onend = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
      className={`flex w-full mb-8 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex gap-4 max-w-[95%] md:max-w-[85%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar Icon */}
        <div className="shrink-0 mt-1">
          {message.sender === "varon" ? (
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                isDarkMode
                  ? "bg-linear-to-r from-emerald-500 to-teal-500"
                  : "bg-linear-to-r from-emerald-400 to-teal-400"
              }`}
            >
              <FaTeamspeak className="text-sm text-white" />
            </div>
          ) : (
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <FiUser
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              />
            </div>
          )}
        </div>

        {/* Message Content & Actions Column */}
        <div
          className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
        >
          <span className="text-sm font-medium mb-1 px-1 opacity-70">
            {message.sender === "varon" ? "Varon AI" : "You"}
          </span>

          <div
            className={`rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed relative group ${
              isUser
                ? isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-900"
                : "bg-transparent px-0 py-0 shadow-none"
            }`}
          >
            <div className="whitespace-pre-wrap">{message.text}</div>
          </div>

          {/* ACTIONS TOOLBAR (Only for AI) */}
          {!isUser && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.4 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.3,
              }}
              className="flex items-center gap-1 mt-2 ml-1 relative"
            >
              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  isDarkMode
                    ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                }`}
                title="Copy"
              >
                {isCopied ? (
                  <FiCheck className="text-emerald-500" />
                ) : (
                  <FiCopy className="text-sm" />
                )}
              </button>

              {/* Like Button */}
              <button
                onClick={() => handleFeedback("liked")}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  feedback === "liked"
                    ? "text-emerald-500 bg-emerald-500/10"
                    : isDarkMode
                    ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                }`}
                title="Good Response"
              >
                <FiThumbsUp className="text-sm" />
              </button>

              {/* Dislike Button */}
              <button
                onClick={() => handleFeedback("disliked")}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  feedback === "disliked"
                    ? "text-red-500 bg-red-500/10"
                    : isDarkMode
                    ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                }`}
                title="Bad Response"
              >
                <FiThumbsDown className="text-sm" />
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  isDarkMode
                    ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                }`}
                title="Share Response"
              >
                <FiShare2 className="text-sm" />
              </button>

              {/* MORE OPTIONS MENU (3-Dots) */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`p-1.5 rounded-md transition-all duration-200 ${
                    isMenuOpen
                      ? isDarkMode
                        ? "bg-gray-800 text-gray-200"
                        : "bg-gray-200 text-gray-900"
                      : isDarkMode
                      ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                      : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                  }`}
                  title="More options"
                >
                  <FiMoreHorizontal className="text-sm" />
                </button>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute top-full left-0 mt-2 w-48 rounded-xl shadow-xl border overflow-hidden z-20 backdrop-blur-md ${
                        isDarkMode
                          ? "bg-gray-900/95 border-gray-700"
                          : "bg-white/95 border-gray-200"
                      }`}
                    >
                      <div className="p-1">
                        {/* Read Aloud Option */}
                        <button
                          onClick={() => {
                            handleReadAloud();
                            setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm transition-colors ${
                            isReading ? "text-emerald-500" : ""
                          } ${
                            isDarkMode
                              ? "hover:bg-gray-800 text-gray-200"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          {isReading ? (
                            <FiStopCircle className="text-lg" />
                          ) : (
                            <FiVolume2 className="text-lg" />
                          )}
                          {isReading ? "Stop Reading" : "Read Aloud"}
                        </button>

                        {/* Regenerate Option */}
                        <button
                          onClick={() => {
                            /* Add regenerate logic here */ setIsMenuOpen(
                              false
                            );
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm transition-colors ${
                            isDarkMode
                              ? "hover:bg-gray-800 text-gray-200"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          <FiRefreshCw className="text-lg" />
                          Regenerate
                        </button>

                        {/* Report Option */}
                        <button
                          onClick={() => {
                            /* Add report logic here */ setIsMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm transition-colors text-red-500 ${
                            isDarkMode
                              ? "hover:bg-red-900/20"
                              : "hover:bg-red-50"
                          }`}
                        >
                          <FiFlag className="text-lg" />
                          Report Issue
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Chat Component ---
const VaronChatSection = ({
  messages,
  inputMessage,
  handleSendMessage,
  setInputMessage,
  messagesEndRef,
  isTyping,
  isDarkMode,
}: {
  isTyping: boolean;
  isDarkMode: boolean;
  messages: any;
  messagesEndRef: any;
  inputMessage: string;
  handleSendMessage: any;
  setInputMessage: (message: string) => void;
}) => {
  const [inputHeight, setInputHeight] = useState<number>(52);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, messagesEndRef]);

  // Logic to Auto-Resize Textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";

      const newHeight = Math.min(textareaRef.current.scrollHeight, 180);
      textareaRef.current.style.height = `${newHeight}px`;

      setInputHeight(newHeight); // ← update height in state
    }
  }, [inputMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div
      className={`h-[calc(100vh-150px)] max-h-[calc(100vh-150px)] relative flex flex-col transition-colors duration-300 pt-2 ${
        isDarkMode
          ? "bg-linear-to-br from-black via-emerald-950/20 to-green-900/10 bg-black/90 text-gray-100"
          : "bg-white text-gray-800"
      }`}
    >
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto scrollbar-small">
        <div className="max-w-3xl mx-auto w-full px-4 md:px-6 py-6 pb-40">
          <AnimatePresence mode="popLayout">
            {messages.map((message: any) => (
              <MessageItem
                key={message.id}
                message={message}
                isDarkMode={isDarkMode}
              />
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start w-full mb-6"
            >
              <div className="flex gap-4 max-w-[85%]">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500"
                      : "bg-linear-to-r from-emerald-400 to-teal-400"
                  }`}
                >
                  <FaTeamspeak className="text-sm text-white" />
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        isDarkMode ? "bg-emerald-400" : "bg-emerald-500"
                      }`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
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
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Floating Input Area */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 pt-10 pb-6 px-4 md:px-8 duration-300`}
      >
        <div className="max-w-3xl mx-auto w-full">
          <form onSubmit={handleSendMessage} className="relative group">
            {/* Input Container */}
            <div
              className={`relative flex items-end w-full p-2  shadow-lg transition-all duration-300 border ${
                isDarkMode
                  ? "bg-[#1e1e1f] border-gray-700 shadow-black/50 focus-within:border-emerald-500/50"
                  : "bg-white border-gray-200 shadow-emerald-100/50 focus-within:border-emerald-400"
              }`}
              style={{
                borderRadius:
                  inputHeight > 80
                    ? "25px"
                    : inputHeight > 60
                    ? "36px"
                    : "9999px",
              }}
            >
              <textarea
                ref={textareaRef}
                rows={1}
                autoFocus
                value={inputMessage}
                disabled={isTyping}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Varon AI..."
                className={`w-[95%] bg-transparent max-h-[200px] py-3 pl-4 pr-12 outline-none resize-none scrollbar-small leading-relaxed ${
                  isDarkMode
                    ? "text-white placeholder-gray-500"
                    : "text-gray-900 placeholder-gray-400"
                }`}
                style={{
                  minHeight: "52px", // Ensures it matches the button height initially
                }}
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!inputMessage.trim()}
                className={`absolute right-2 bottom-3 p-2 h-10 w-10 rounded-full flex items-center justify-center transition-colors cursor-pointer
                  ${
                    inputMessage.trim()
                      ? isDarkMode
                        ? "text-white"
                        : "text-black"
                      : isDarkMode
                      ? "bg-transparent text-gray-600"
                      : "bg-transparent text-gray-300"
                  }`}
              >
                <AnimatePresence mode="wait">
                  {inputMessage.trim() ? (
                    <motion.div
                      key="send"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaPaperPlane className="text-2xl" />
                    </motion.div>
                  ) : (
                    <motion.div
                      title="Live Connect to Varon AI"
                      key="cloud"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiCloud className="text-2xl text-emerald-500" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </form>

          <div className="mt-3 text-center">
            <p
              className={`text-[10px] md:text-xs font-normal opacity-80 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <span className="text-emerald-500 font-bold">Varon AI</span> can
              make mistakes. Please check important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaronChatSection;
