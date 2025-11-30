"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiSun, FiMoon, FiPower, FiUser } from "react-icons/fi";
import Image from "next/image";
import UserMenu from "./UserMenu"; // Adjust the import path as needed

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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleDisconnect = () => {
    disconnect();
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header
        className={`border-b transition-all duration-300 fixed z-40 top-0 left-0 right-0 backdrop-blur-md ${
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
                  {/* Disconnect Button - Desktop Only */}
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

                  {/* User Avatar Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUserMenuToggle}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                      isUserMenuOpen
                        ? "border-emerald-500 shadow-lg shadow-emerald-500/25"
                        : isDarkMode
                        ? "border-gray-600 hover:border-gray-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div
                      className={`w-full h-full flex items-center justify-center transition-colors ${
                        isDarkMode
                          ? "bg-gray-800 hover:bg-gray-700"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      <FiUser
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                      />
                    </div>
                  </motion.button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* User Menu Component */}
      <UserMenu
        isOpen={isUserMenuOpen}
        onClose={() => setIsUserMenuOpen(false)}
        isDarkMode={isDarkMode}
        userData={userData}
        onDisconnect={handleDisconnect}
        toggleTheme={toggleTheme}
      />
    </>
  );
};

export default VaronHeader;
