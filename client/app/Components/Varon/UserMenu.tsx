"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiUser,
  FiSettings,
  FiCpu,
  FiCreditCard,
  FiHelpCircle,
  FiPower,
  FiChevronRight,
} from "react-icons/fi";
import { PopupModal } from "./Menupopup";
import AxiosProxyInstance from "@/config/AxiosProxyInstance";
import { toast, Zoom } from "react-toastify";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  userData: any;
  onDisconnect: () => void;
  position?: {
    top: number;
    right: number;
  };
  toggleTheme: () => void;
}

const UserMenu = ({
  isOpen,
  onClose,
  isDarkMode,
  userData,
  onDisconnect,
  toggleTheme,
  position = { top: 56, right: 0 },
}: UserMenuProps) => {
  // State to track which popup is active
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const router = useRouter();

  const menuItems = [
    {
      icon: FiCpu,
      label: "Customize Varon AI",
      description: "Configure AI assistants and preferences",
      action: "customize",
    },
    {
      icon: FiSettings,
      label: "Settings",
      description: "Account and application settings",
      action: "settings",
    },
    {
      icon: FiCreditCard,
      label: "Subscription",
      description: "Manage your plan and billing",
      action: "subscription",
    },
    {
      icon: FiHelpCircle,
      label: "Help & Support",
      description: "Get help and documentation",
      action: "help",
    },
  ];

  const handleMenuAction = (action: string) => {
    setActivePopup(action);
    onClose();
  };

  const handleLogout = async () => {
    try {
      const res = await AxiosProxyInstance.post("/api/logout");

      if (res.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isDarkMode ? "dark" : "light",
        transition: Zoom,
      });
    } finally {
      onClose();
    }
  };

  const handleDisconnect = () => {
    onDisconnect();
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for the dropdown menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-transparent" // Transparent backdrop to catch clicks outside
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                top: `${position.top}px`,
                right: `${position.right}px`,
              }}
              className={`fixed z-100 w-80 rounded-2xl shadow-2xl border backdrop-blur-2xl mr-4 md:mr-6 ${
                isDarkMode
                  ? "bg-gray-900/95 border-gray-700/50 shadow-black/50"
                  : "bg-white/95 border-gray-200/50 shadow-xl"
              }`}
            >
              {/* User Info Section */}
              <div className="p-4 border-b border-gray-500/10">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <FiUser
                      className={`text-xl ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold truncate ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {userData?.name || "Varon User"}
                    </p>
                    <p
                      className={`text-xs truncate ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {userData?.email || "user@varon.ai"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMenuAction(item.action)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-colors group cursor-pointer ${
                      isDarkMode
                        ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isDarkMode
                          ? "bg-gray-800 group-hover:bg-emerald-500/20"
                          : "bg-gray-100 group-hover:bg-emerald-500/10"
                      }`}
                    >
                      <item.icon
                        className={`text-lg transition-colors ${
                          isDarkMode
                            ? "text-gray-400 group-hover:text-emerald-400"
                            : "text-gray-500 group-hover:text-emerald-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{item.label}</div>
                      <div
                        className={`text-xs transition-colors ${
                          isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {item.description}
                      </div>
                    </div>
                    <FiChevronRight
                      className={`text-lg opacity-0 group-hover:opacity-100 transition-all duration-200 ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="p-3 border-t border-gray-500/10 space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDisconnect}
                  className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isDarkMode
                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300"
                      : "bg-red-500/10 text-red-600 hover:bg-red-500/20 hover:text-red-700"
                  }`}
                >
                  <FiPower className="text-base" />
                  Disconnect AI
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  <FiPower className="text-base" />
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activePopup && (
          <PopupModal
            type={activePopup}
            onClose={() => setActivePopup(null)}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default UserMenu;
