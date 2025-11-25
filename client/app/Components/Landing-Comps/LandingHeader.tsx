import { FaRobot } from "react-icons/fa";
import { FiSun, FiMoon, FiX, FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "@/app/theme/ThemeToogle"; // Ensure this path is correct
import Image from "next/image";

const LandingHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection] = useState("hero");
  const { toggleTheme, isDarkMode } = useTheme();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const navLinks = [
    { item: "Home", link: "/" },
    { item: "About us", link: "/about" },
    { item: "Contact", link: "/contact" },
    { item: "Documentation", link: "/docs" },
    { item: "AI Assistants", link: "/assistants" },
  ];

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-40 backdrop-blur-xl p-4 border-b transition-colors duration-300 ${
          isDarkMode
            ? "border-emerald-500/20 bg-gray-900/60"
            : "border-emerald-500/30 bg-white/60"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-950 via-teal-950 to-black/30"
                      : "bg-linear-to-r from-black to-black"
                  }`}
                >
                  <Image
                    width={100}
                    height={100}
                    src="/img/logo.png"
                    alt="logo"
                    priority
                  />
                </div>
                <span
                  className={`text-xl font-bold transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                      : "bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                  }`}
                >
                  Varon AI
                </span>
              </motion.div>
            </Link>

            {/* Desktop Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle (Visible on Desktop) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`hidden lg:block p-2 rounded-lg transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {isDarkMode ? (
                  <FiSun className="text-xl" />
                ) : (
                  <FiMoon className="text-xl" />
                )}
              </motion.button>

              {/* Desktop Menu Links */}
              <div className="hidden lg:flex items-center space-x-8 whitespace-nowrap">
                {navLinks.map(({ item, link }, index) => (
                  <Link
                    href={link}
                    key={index}
                    className={`transition-all duration-300 ${
                      activeSection === item
                        ? "text-emerald-500 font-semibold"
                        : isDarkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item}
                  </Link>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full font-semibold transition-all text-white ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                      : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-lg hover:shadow-emerald-400/25"
                  }`}
                >
                  Get Started
                </motion.button>
              </div>

              {/* Mobile Menu Toggle Button (Visible only when menu is closed) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-800 text-yellow-400"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {isDarkMode ? <FiSun /> : <FiMoon />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
                onClick={() => setIsMenuOpen(true)}
              >
                <FiMenu className="text-xl" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay & Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* 1. Backdrop (Blur + Overlay) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* 2. The Drawer (80% Width, Right Aligned) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 bottom-0 z-50 w-[80%] lg:hidden shadow-2xl flex flex-col ${
                isDarkMode
                  ? "bg-gray-900 border-l border-gray-800"
                  : "bg-white border-l border-gray-200"
              }`}
            >
              {/* Drawer Header */}
              <div className="p-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                <span
                  className={`text-lg font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Menu
                </span>

                {/* Close Button / Theme Toggle Group */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? "bg-gray-800 text-yellow-400"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isDarkMode ? <FiSun /> : <FiMoon />}
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMenuOpen(false)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        : "bg-red-100 text-red-500 hover:bg-red-200"
                    }`}
                  >
                    <FiX className="text-xl" />
                  </motion.button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                {navLinks.map(({ item, link }, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={link}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block w-full py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                        activeSection === item
                          ? "text-emerald-500 bg-emerald-500/10"
                          : isDarkMode
                          ? "text-gray-300 hover:text-white hover:bg-gray-800"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Get Started Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6"
                >
                  <button
                    className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-transform active:scale-95 ${
                      isDarkMode
                        ? "bg-linear-to-r from-emerald-600 to-teal-600"
                        : "bg-linear-to-r from-emerald-400 to-teal-400"
                    }`}
                  >
                    Get Started
                  </button>
                </motion.div>
              </div>

              {/* Drawer Footer (Optional) */}
              <div className="p-6 text-center border-t border-gray-100 dark:border-gray-800">
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  © {new Date().getFullYear()} Varon AI Inc.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingHeader;
