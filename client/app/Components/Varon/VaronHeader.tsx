import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiSun,
  FiMoon,
  FiPower,
  FiUser,
  FiSettings,
  FiCpu,
  FiCreditCard,
  FiHelpCircle,
} from "react-icons/fi";
import Image from "next/image";

interface VaronHeaderProps {
  isConnected: boolean;
  isConnecting: boolean;
  isDarkMode: boolean;
  simulateConnection: () => void;
  disconnect: () => void;
  toggleTheme: () => void;
  userData: any;
}

const VaronHeader = ({
  isConnected,
  isConnecting,
  simulateConnection,
  disconnect,
  toggleTheme,
  isDarkMode,
  userData,
}: VaronHeaderProps) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { icon: FiCpu, label: "Customize Varon AI" },
    { icon: FiSettings, label: "Settings" },
    { icon: FiCreditCard, label: "Subscription" },
    { icon: FiHelpCircle, label: "Help & Support" },
  ];

  return (
    <header
      className={`border-b transition-all duration-300 fixed z-50 top-0 left-0 right-0 backdrop-blur-md ${
        isDarkMode
          ? "bg-black/20 border-emerald-500/10 supports-backdrop-filter:bg-black/30"
          : "bg-white/80 border-emerald-500/20 supports-backdrop-filter:bg-white/60"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* LOGO SECTION */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 shadow-lg ${
                isDarkMode
                  ? "bg-linear-to-br from-gray-800 to-black border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <Image
                width={24}
                height={24}
                src="/img/logo.png"
                alt="Varon AI"
                className="w-6 h-6 object-contain"
              />
            </div>
            <div>
              <h1
                className={`text-xl font-bold tracking-tight ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Varon AI
              </h1>
              <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  {isConnected && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isConnected ? "bg-emerald-500" : "bg-gray-400"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {isConnected ? "System Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex gap-3 items-center justify-center">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-colors border cursor-pointer ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700 text-yellow-400 hover:bg-gray-700"
                  : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {isDarkMode ? (
                <FiSun className="text-lg" />
              ) : (
                <FiMoon className="text-lg" />
              )}
            </motion.button>

            {/* Connection States */}
            {!isConnected && !isConnecting ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={simulateConnection}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all flex items-center gap-2 shadow-lg cursor-pointer ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-900/20 hover:shadow-emerald-500/20"
                    : "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-200 hover:shadow-emerald-300"
                }`}
              >
                Connect <FiArrowRight />
              </motion.button>
            ) : isConnected ? (
              <div
                className="flex items-center gap-3 relative"
                ref={accountRef}
              >
                {/* Disconnect Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={disconnect}
                  className={`hidden sm:flex px-4 py-2.5 rounded-full font-medium text-sm transition-all items-center gap-2 border cursor-pointer ${
                    isDarkMode
                      ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                      : "border-red-200 text-red-600 hover:bg-red-50"
                  }`}
                >
                  <FiPower /> Disconnect
                </motion.button>

                {/* Account Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-colors ${
                    isAccountOpen
                      ? "border-emerald-500"
                      : isDarkMode
                      ? "border-gray-700"
                      : "border-gray-200"
                  }`}
                >
                  {/* Placeholder Avatar */}
                  <div
                    className={`w-full h-full flex items-center justify-center ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  >
                    <FiUser
                      className={isDarkMode ? "text-white" : "text-gray-700"}
                    />
                  </div>
                </motion.button>

                {/* Account Popup Animation */}
                <AnimatePresence>
                  {isAccountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95, x: 20 }}
                      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-14 right-0 w-64 rounded-2xl shadow-2xl border backdrop-blur-2xl overflow-hidden ${
                        isDarkMode
                          ? "bg-gray-900 border-gray-700"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="p-4 border-b border-gray-500/10">
                        <p
                          className={`text-sm font-semibold ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {userData?.name || "Varon User"}
                        </p>
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {userData?.email || "N/A"}
                        </p>
                      </div>

                      <div className="p-2">
                        {menuItems.map((item, index) => (
                          <button
                            key={index}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer ${
                              isDarkMode
                                ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            <item.icon className="text-lg opacity-70" />
                            {item.label}
                          </button>
                        ))}
                        <button
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm relative transition-colors cursor-pointer ${
                            isDarkMode
                              ? "bg-red-800 text-gray-300 hover:bg-red-600 hover:text-white"
                              : "bg-red-300 text-gray-700 hover:bg-red-500 hover:text-gray-950"
                          }`}
                        >
                          Logout{" "}
                          <FiPower className="text-lg absolute right-5" />
                        </button>
                      </div>

                      <div className="p-2 border-t border-gray-500/10 sm:hidden">
                        <button
                          onClick={disconnect}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-red-500 hover:bg-red-500/10 cursor-pointer`}
                        >
                          <FiPower className="text-lg" />
                          Disconnect
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default VaronHeader;
