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
  FiDownload,
} from "react-icons/fi";
import { HiSparkles, HiWrenchScrewdriver } from "react-icons/hi2";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const parseThinkingContent = (text: any) => {
  const safeText = typeof text === "string" ? text : "";
  if (!safeText) return { title: null, body: "" };

  const match = safeText.match(/^\s*\*\*(.*?)\*\*\s*([\s\S]*)$/);

  if (match) {
    return { title: match[1].trim(), body: match[2].trim() };
  }

  return { title: null, body: safeText };
};

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

const CodeBlock = ({
  language,
  value,
  isDarkMode,
}: {
  language: string;
  value: string;
  isDarkMode: boolean;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([value], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code-snippet.${language || "txt"}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="relative w-full max-w-[85vw] md:max-w-full my-4 rounded-xl overflow-hidden border border-gray-700 bg-[#1e1e1f] shadow-lg">
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-700">
        <span className="text-xs font-mono text-gray-300 lowercase">
          {language || "code"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            {isCopied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
            {isCopied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
          >
            <FiDownload />
            Download
          </button>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
            background: "transparent",
            fontSize: "0.8rem",
            lineHeight: "1.5",
          }}
          wrapLines={false}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: "1.5em",
            paddingRight: "1em",
            color: "#6e7681",
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const ToolInvocation = ({
  tools,
  isDarkMode,
}: {
  tools: string[];
  isDarkMode: boolean;
}) => {
  if (!tools || tools.length === 0) return null;

  return (
    <div className="w-full mb-2 max-w-[95%] md:max-w-[85%]">
      {tools.map((tool, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 text-xs font-mono py-2 px-3 rounded-lg mb-1 border ${
            isDarkMode
              ? "bg-blue-900/10 border-blue-800 text-blue-300"
              : "bg-blue-50 border-blue-100 text-blue-600"
          }`}
        >
          <HiWrenchScrewdriver className="text-sm" />
          <span>{tool.replace("Calling Tool:", "Using tool:")}</span>
          <span className="ml-auto text-[10px] opacity-60">Completed</span>
        </motion.div>
      ))}
    </div>
  );
};

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
  const [isOpen, setIsOpen] = useState(isLive);
  const { title, body } = parseThinkingContent(response);
  const displayTitle = title || status || "Thinking Process";

  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLive && isOpen && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [response, isLive, isOpen]);

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
          title="Show Varon Thinking"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors cursor-pointer ${
            isDarkMode
              ? "hover:bg-white/5 text-gray-300"
              : "hover:bg-black/5 text-gray-700"
          }`}
        >
          <div className="flex items-center gap-2.5 overflow-hidden whitespace-nowrap">
            {isLive ? (
              <div className="relative shrink-0">
                <HiSparkles className="text-emerald-500 text-lg animate-pulse" />
              </div>
            ) : (
              <HiSparkles
                className={`text-lg shrink-0 ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
              />
            )}

            <span className="text-emerald-500 ">Varon Thoughts —</span>

            <span
              className={`font-medium truncate ${
                isLive
                  ? "bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                  : ""
              }`}
            >
              {displayTitle}
            </span>
          </div>

          <FiChevronDown
            className={`text-lg shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            } ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div
                ref={bodyRef}
                className={`px-4 pb-4 pt-0 text-xs md:text-[13px] font-mono leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto custom-scrollbar ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <div
                  className={`pl-3 border-l-2 py-1 ${
                    isDarkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  <span className="text-emerald-400 font-bold block mb-1">
                    # {displayTitle}
                  </span>
                  {body || (
                    <span className="opacity-50 italic">
                      Initializing thinking process...
                    </span>
                  )}
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

const MessageItem = ({
  message,
  isDarkMode,
  isLastMessage,
  isTyping,
}: {
  message: any;
  isDarkMode: boolean;
  isLastMessage: boolean;
  isTyping: boolean;
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
        <div className="shrink-0 mt-1 ml-2">
          {message.sender === "varon" ? (
            <>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDarkMode ? "bg-black" : "bg-gray-900"
                }`}
              >
                <Image
                  width={100}
                  height={100}
                  src="/img/logo.png"
                  alt="Varon AI"
                  className="w-full h-full object-contain"
                />
              </div>
            </>
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

        <div
          className={`flex flex-col w-full min-w-0 ${
            isUser ? "items-end" : "items-start"
          }`}
        >
          <span className="text-sm ml-2 font-medium mb-1 px-1 opacity-70">
            {message.sender === "varon" ? "" : "You"}
          </span>

          {!isUser && message.tools && (
            <ToolInvocation tools={message.tools} isDarkMode={isDarkMode} />
          )}

          {!isUser && message.thinking && (
            <ThinkingProcess
              response={message.thinking.response}
              status={message.thinking.status}
              isDarkMode={isDarkMode}
              isLive={false}
            />
          )}

          <div
            className={`rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed relative group max-w-full overflow-hidden ${
              isUser
                ? isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-900"
                : "bg-transparent px-0 py-0 shadow-none"
            }`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  const codeString = String(children).replace(/\n$/, "");

                  if (!inline && match) {
                    return (
                      <CodeBlock
                        language={match[1]}
                        value={codeString}
                        isDarkMode={isDarkMode}
                      />
                    );
                  }
                  return (
                    <code
                      className={`${
                        isDarkMode
                          ? "bg-gray-800 text-emerald-300 border-gray-700"
                          : "bg-gray-200 text-emerald-700 border-gray-300"
                      } px-1.5 py-0.5 rounded text-sm font-mono border wrap-break-word`}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                // Headings
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold mb-4 mt-6 border-b pb-2 border-gray-500/20">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-bold mb-3 mt-5">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-bold mb-2 mt-4">{children}</h3>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-emerald-500 dark:text-emerald-400">
                    {children}
                  </strong>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400 hover:underline transition-colors cursor-pointer break-all"
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-5 mb-4 space-y-1 marker:text-gray-500">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-5 mb-4 space-y-1 marker:text-gray-500">
                    {children}
                  </ol>
                ),
                p: ({ children }) => (
                  <p className="mb-4 last:mb-0 wrap-break-word">{children}</p>
                ),
                blockquote: ({ children }) => (
                  <blockquote
                    className={`border-l-4 pl-4 py-1 mb-4 italic ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-800/50"
                        : "border-gray-300 bg-gray-50"
                    }`}
                  >
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-4 border rounded-lg border-gray-700 block max-w-full">
                    <table className="min-w-full divide-y divide-gray-700">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className={isDarkMode ? "bg-gray-800" : "bg-gray-100"}>
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2 whitespace-nowrap text-sm border-t border-gray-700/50">
                    {children}
                  </td>
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>

            {!isUser && isLastMessage && isTyping && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-5 bg-emerald-500 align-sub ml-1"
              />
            )}
          </div>

          {!isUser && !isTyping && (
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
  ThinkingTools,
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
  ThinkingTools?: string[];
}) => {
  const [inputHeight, setInputHeight] = useState<number>(52);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, ThinkingResponse, ThinkingTools, messagesEndRef]);

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
      <div className="flex-1 overflow-y-auto scrollbar-small">
        <div className="max-w-3xl mx-auto w-full px-4 md:px-6 py-6 pb-40">
          <AnimatePresence mode="popLayout">
            {messages.map((message: any, index: number) => (
              <MessageItem
                key={message.id}
                message={message}
                isDarkMode={isDarkMode}
                isLastMessage={index === messages.length - 1}
                isTyping={isTyping}
              />
            ))}
          </AnimatePresence>

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

                <div className="flex flex-col flex-1 min-w-0">
                  {ThinkingTools && ThinkingTools.length > 0 && (
                    <ToolInvocation
                      tools={ThinkingTools}
                      isDarkMode={isDarkMode}
                    />
                  )}

                  {(ThinkingResponse || ThinkingStatus) && (
                    <ThinkingProcess
                      response={ThinkingResponse}
                      status={ThinkingStatus}
                      isDarkMode={isDarkMode}
                      isLive={true}
                    />
                  )}

                  {!ThinkingResponse &&
                    !ThinkingStatus &&
                    !ThinkingTools?.length && (
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
