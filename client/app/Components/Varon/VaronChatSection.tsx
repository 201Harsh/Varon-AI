import { motion, AnimatePresence } from "framer-motion";
import { FaTeamspeak } from "react-icons/fa";
import { FiSend, FiUser } from "react-icons/fi";
import { useEffect } from "react";

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
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, messagesEndRef]);

  return (
    <div
      className={`h-full relative flex flex-col transition-colors duration-300 ${
        isDarkMode ? "bg-black text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Centered Container for Messages (ChatGPT Style) */}
        <div className="max-w-3xl mx-auto w-full px-4 md:px-6 py-6 pb-40">
          <AnimatePresence mode="popLayout">
            {messages.map((message: any) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
                className={`flex w-full mb-6 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-4 max-w-[95%] md:max-w-[85%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
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

                  {/* Message Bubble/Content */}
                  <div
                    className={`flex flex-col ${
                      message.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    {/* Name Label */}
                    <span className="text-xs font-medium opacity-50 mb-1 px-1">
                      {message.sender === "varon" ? "Varon AI" : "You"}
                    </span>

                    <div
                      className={`rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed shadow-xs ${
                        message.sender === "user"
                          ? isDarkMode
                            ? "bg-gray-800 text-white"
                            : "bg-gray-100 text-gray-900"
                          : "bg-transparent px-0 py-0 shadow-none" // AI text blends with background like ChatGPT
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.text}</div>

                      {/* Specialists Badge */}
                      {message.specialists && (
                        <div className="mt-4 pt-3 border-t border-gray-500/20 w-full">
                          <p className="text-xs text-gray-500 mb-2">
                            Specialists involved:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {message.specialists.map(
                              (specialist: any, index: number) => (
                                <div
                                  key={index}
                                  className={`px-2 py-1 rounded-md text-xs bg-linear-to-r ${specialist.color} text-white flex items-center gap-1.5`}
                                >
                                  <specialist.icon className="text-[10px]" />
                                  {specialist.name}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
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

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 pt-10 pb-6 px-4 md:px-6 transition-colors duration-300 ${
          isDarkMode
            ? "bg-linear-to-t from-black via-black to-transparent"
            : "bg-linear-to-t from-white via-white to-transparent"
        }`}
      >
        <div className="max-w-3xl mx-auto w-full">
          <form onSubmit={handleSendMessage} className="relative group">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Message Varon AI..."
              className={`w-full pl-5 pr-14 py-4 outline-none rounded-[26px] shadow-lg transition-all duration-300 border ${
                isDarkMode
                  ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500/50"
                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-400"
              }`}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!inputMessage.trim()}
              className={`absolute right-2 top-2 p-2 rounded-full transition-all flex items-center justify-center ${
                inputMessage.trim()
                  ? isDarkMode
                    ? "bg-emerald-500 text-white hover:bg-emerald-400"
                    : "bg-emerald-500 text-white hover:bg-emerald-600"
                  : isDarkMode
                  ? "bg-transparent text-gray-600"
                  : "bg-transparent text-gray-300"
              }`}
            >
              <FiSend
                className={`text-xl ${!inputMessage.trim() && "opacity-50"}`}
              />
            </motion.button>
          </form>

          {/* Disclaimer Text */}
          <div className="mt-3 text-center">
            <p
              className={`text-[11px] md:text-xs font-normal ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Varon AI can make mistakes. Please check important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaronChatSection;
