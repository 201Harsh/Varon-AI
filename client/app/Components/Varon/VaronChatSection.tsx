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
  FiChevronDown,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { useEffect, useState, useRef } from "react";

const parseThinkingContent = (text: string) => {
  const match = text?.match(/^\*\*(.*?)\*\*\s*([\s\S]*)$/);
  if (match) {
    return { title: match[1], body: match[2] };
  }
  return { title: null, body: text };
};

// --- Helper: Typing Text Animation ---
const TypingStatus = ({ text }: { text: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-medium animate-pulse bg-linear-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
        {text || "Thinking"}
      </span>
      <div className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1 h-1 rounded-full bg-emerald-500"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// --- Helper: Thinking Process Dropdown (Gemini Style) ---
const ThinkingProcess = ({
  response,
  status,
  isDarkMode,
  isLive = false,
}: {
  response: string;
  status: string;
  isDarkMode: boolean;
  isLive?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { title, body } = parseThinkingContent(response);
  const displayTitle = title || status || "Thinking Process";

  return (
    <div className="w-full mb-3 max-w-full">
      <div
        className={`rounded-xl border overflow-hidden transition-all duration-300 ${
          isDarkMode
            ? "bg-[#1e1e1f] border-gray-800"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
            isDarkMode
              ? "hover:bg-white/5 text-gray-300"
              : "hover:bg-black/5 text-gray-700"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {isLive ? (
              <div className="relative">
                <HiSparkles className="text-emerald-500 text-lg animate-pulse" />
              </div>
            ) : (
              <HiSparkles
                className={`text-lg ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
              />
            )}

            <span
              className={`font-medium ${
                isLive
                  ? "bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                  : ""
              }`}
            >
              {displayTitle}
            </span>
          </div>

          <FiChevronDown
            className={`text-lg transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            } ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div
                className={`px-4 pb-4 pt-0 text-xs md:text-[13px] font-mono leading-relaxed whitespace-pre-wrap ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <div
                  className={`pl-3 border-l-2 py-1 ${
                    isDarkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  {body}
                  {isLive && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-1.5 h-3.5 bg-emerald-500 ml-1 align-middle rounded-sm"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleFeedback = (type: "liked" | "disliked") => {
    setFeedback((prev) => (prev === type ? "none" : type));
  };

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

  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
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
          className={`flex flex-col w-full ${
            isUser ? "items-end" : "items-start"
          }`}
        >
          <span className="text-sm font-medium mb-1 px-1 opacity-70">
            {message.sender === "varon" ? "Varon AI" : "You"}
          </span>

          {/* Render Saved Thinking Process (If exists on message) */}
          {!isUser && message.thinking && (
            <ThinkingProcess
              response={message.thinking.response}
              status={message.thinking.status}
              isDarkMode={isDarkMode}
              isLive={false}
            />
          )}

          <div
            className={`rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed relative group max-w-full ${
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
              transition={{ delay: 0.5, duration: 0.3 }}
              className="flex items-center gap-1 mt-2 ml-1 relative"
            >
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

              <button
                onClick={() => handleFeedback("liked")}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  feedback === "liked"
                    ? "text-emerald-500 bg-emerald-500/10"
                    : isDarkMode
                    ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                }`}
              >
                <FiThumbsUp className="text-sm" />
              </button>

              <button
                onClick={() => handleFeedback("disliked")}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  feedback === "disliked"
                    ? "text-red-500 bg-red-500/10"
                    : isDarkMode
                    ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                }`}
              >
                <FiThumbsDown className="text-sm" />
              </button>

              <button
                onClick={handleShare}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  isDarkMode
                    ? "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                }`}
              >
                <FiShare2 className="text-sm" />
              </button>

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
                        <button
                          onClick={() => setIsMenuOpen(false)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm transition-colors ${
                            isDarkMode
                              ? "hover:bg-gray-800 text-gray-200"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          <FiRefreshCw className="text-lg" /> Regenerate
                        </button>
                        <button
                          onClick={() => setIsMenuOpen(false)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm transition-colors text-red-500 ${
                            isDarkMode
                              ? "hover:bg-red-900/20"
                              : "hover:bg-red-50"
                          }`}
                        >
                          <FiFlag className="text-lg" /> Report Issue
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
  ThinkingResponse,
  ThinkingStatus,
}: {
  isTyping: boolean;
  isDarkMode: boolean;
  messages: any;
  messagesEndRef: any;
  inputMessage: string;
  handleSendMessage: any;
  setInputMessage: (message: string) => void;
  ThinkingResponse: string;
  ThinkingStatus: string;
}) => {
  const [inputHeight, setInputHeight] = useState<number>(52);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, ThinkingResponse, messagesEndRef]);

  // Logic to Auto-Resize Textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 180);
      textareaRef.current.style.height = `${newHeight}px`;
      setInputHeight(newHeight);
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
        isDarkMode ? "text-gray-100" : " text-gray-800"
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

          {/* Typing & Thinking Indicator (LIVE) */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start w-full mb-6"
            >
              <div className="flex gap-4 max-w-[85%] w-full">
                {/* Avatar */}
                <div className="shrink-0 mt-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isDarkMode
                        ? "bg-linear-to-r from-emerald-500 to-teal-500"
                        : "bg-linear-to-r from-emerald-400 to-teal-400"
                    }`}
                  >
                    <FaTeamspeak className="text-sm text-white" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 min-w-0">
                  {/* LIVE THINKING PROCESS */}
                  {(ThinkingResponse || ThinkingStatus) && (
                    <ThinkingProcess
                      response={ThinkingResponse}
                      status={ThinkingStatus}
                      isDarkMode={isDarkMode}
                      isLive={true}
                    />
                  )}

                  {/* Fallback Typing Dots (Only if no thinking data is coming through yet) */}
                  {!ThinkingResponse && !ThinkingStatus && (
                    <div className="flex items-center gap-3 mt-1">
                      <TypingStatus text="Thinking" />
                    </div>
                  )}
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
            <div
              className={`relative flex items-end w-full p-2 shadow-lg transition-all duration-300 border ${
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
                style={{ minHeight: "52px" }}
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!inputMessage.trim()}
                className={`absolute right-2 bottom-3 p-2 h-10 w-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
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
