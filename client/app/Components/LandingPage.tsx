"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiPlay,
  FiCode,
  FiSearch,
  FiMessageSquare,
  FiImage,
  FiGlobe,
  FiFileText,
  FiUsers,
  FiArrowRight,
  FiCheck,
  FiStar,
  FiCpu,
  FiSun,
  FiMoon,
  FiShield,
  FiZap,
  FiUsers as FiTeam,
  FiBarChart,
} from "react-icons/fi";
import { FaRobot, FaTeamspeak, FaRegLightbulb } from "react-icons/fa";

export default function VaronAILanding() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "how-it-works",
        "assistants",
        "why-varon",
        "architecture",
        "features",
        "use-cases",
        "cta",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 overflow-hidden ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          isDarkMode
            ? "bg-black/80 border-emerald-500/20"
            : "bg-white/80 border-emerald-500/30"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-500 to-teal-500"
                    : "bg-linear-to-r from-emerald-400 to-teal-400"
                }`}
              >
                <FaRobot className="text-xl" />
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

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {isDarkMode ? (
                  <FiSun className="text-xl" />
                ) : (
                  <FiMoon className="text-xl" />
                )}
              </motion.button>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {[
                  "how-it-works",
                  "assistants",
                  "why-varon",
                  "architecture",
                  "use-cases",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`transition-all duration-300 ${
                      activeSection === item
                        ? "text-emerald-500 font-semibold"
                        : isDarkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("cta")}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                      : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-lg hover:shadow-emerald-400/25"
                  }`}
                >
                  Get Started
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                ☰
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`md:hidden mt-4 space-y-4 pb-4 transition-colors duration-300 ${
                  isDarkMode ? "border-gray-800" : "border-gray-200"
                }`}
              >
                {[
                  "how-it-works",
                  "assistants",
                  "why-varon",
                  "architecture",
                  "use-cases",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`block w-full text-left py-2 transition-colors ${
                      isDarkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection("cta")}
                  className={`w-full py-2 rounded-full font-semibold transition-colors ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500"
                      : "bg-linear-to-r from-emerald-400 to-teal-400"
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isDarkMode
              ? "bg-linear-to-br from-emerald-500/5 to-teal-500/5"
              : "bg-linear-to-br from-emerald-500/10 to-teal-500/10"
          }`}
        ></div>

        <div className="container mx-auto px-6 relative z-10 mt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`w-20 h-20 mb-8 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-500 to-teal-500"
                    : "bg-linear-to-r from-emerald-400 to-teal-400"
                }`}
              >
                <FaTeamspeak className="text-3xl" />
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Meet{" "}
                <span
                  className={`transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                      : "bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                  }`}
                >
                  Varon AI
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`text-xl md:text-2xl mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                The{" "}
                <span className="font-semibold text-emerald-500">
                  boss-level AI
                </span>{" "}
                that leads your digital team of specialized assistants
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className={`text-lg mb-8 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                One intelligent manager coordinating multiple expert AIs to
                deliver perfect results every time. Stop settling for generic AI
                assistants.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 items-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("cta")}
                  className={`px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-2 ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:shadow-emerald-500/25"
                      : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-2xl hover:shadow-emerald-400/25"
                  }`}
                >
                  Try Varon AI Free <FiArrowRight />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("how-it-works")}
                  className={`border px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-2 ${
                    isDarkMode
                      ? "border-emerald-500/50 hover:bg-emerald-500/10"
                      : "border-emerald-500/30 hover:bg-emerald-500/10"
                  }`}
                >
                  <FiPlay /> See How It Works
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Animated Conversation Demo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div
                className={`relative rounded-3xl p-6 transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-900 border border-emerald-500/20"
                    : "bg-gray-50 border border-emerald-500/30"
                }`}
              >
                {/* Chat Container */}
                <div
                  className={`rounded-2xl p-4 mb-6 transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="space-y-4">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className={`max-w-[80%] rounded-2xl p-4 transition-colors duration-300 ${
                          isDarkMode ? "bg-emerald-500/20" : "bg-emerald-500/10"
                        }`}
                      >
                        <motion.div className="overflow-hidden">
                          <p className="text-sm">
                            Can you help me create a React component and find
                            best practices?
                          </p>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Varon Thinking */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="flex justify-start"
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl p-4 transition-colors duration-300 ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                              isDarkMode
                                ? "bg-linear-to-r from-emerald-500 to-teal-500"
                                : "bg-linear-to-r from-emerald-400 to-teal-400"
                            }`}
                          >
                            <FaTeamspeak className="text-xs" />
                          </div>
                          <span className="text-xs font-semibold">
                            Varon AI
                          </span>
                        </div>
                        <motion.div className="text-xs text-emerald-500">
                          Analyzing request... Delegating to specialists
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* AI Agents Activation */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                      className="grid grid-cols-3 gap-3 p-4 rounded-2xl border border-dashed border-emerald-500/30"
                    >
                      {[
                        {
                          icon: FiCode,
                          name: "Code AI",
                          color: "from-blue-500 to-cyan-500",
                          active: true,
                        },
                        {
                          icon: FiSearch,
                          name: "Search AI",
                          color: "from-purple-500 to-pink-500",
                          active: true,
                        },
                        {
                          icon: FiFileText,
                          name: "Docs AI",
                          color: "from-orange-500 to-red-500",
                          active: false,
                        },
                      ].map((agent, index) => (
                        <motion.div
                          key={agent.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2 + index * 0.2 }}
                          className="text-center"
                        >
                          <motion.div
                            animate={
                              agent.active
                                ? {
                                    scale: [1, 1.2, 1],
                                    boxShadow: [
                                      "0 0 0 0 rgba(16, 185, 129, 0)",
                                      "0 0 0 10px rgba(16, 185, 129, 0.1)",
                                      "0 0 0 0 rgba(16, 185, 129, 0)",
                                    ],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.5,
                            }}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 transition-colors duration-300 ${
                              agent.active
                                ? `bg-linear-to-r ${agent.color}`
                                : isDarkMode
                                ? "bg-gray-700"
                                : "bg-gray-300"
                            }`}
                          >
                            <agent.icon className="text-sm" />
                          </motion.div>
                          <span
                            className={`text-xs transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {agent.name}
                          </span>
                          {agent.active && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-emerald-500 rounded-full mx-auto mt-1"
                            />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Final Response */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2.5 }}
                      className="flex justify-start"
                    >
                      <div
                        className={`w-full rounded-2xl p-4 transition-colors duration-300 ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                              isDarkMode
                                ? "bg-linear-to-r from-emerald-500 to-teal-500"
                                : "bg-linear-to-r from-emerald-400 to-teal-400"
                            }`}
                          >
                            <FaTeamspeak className="text-xs" />
                          </div>
                          <span className="text-xs font-semibold">
                            Varon AI
                          </span>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 3 }}
                            className="flex items-center gap-1 ml-auto"
                          >
                            <span
                              className={`text-xs transition-colors duration-300 ${
                                isDarkMode
                                  ? "text-emerald-400"
                                  : "text-emerald-600"
                              }`}
                            >
                              Task Complete
                            </span>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                          </motion.div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 3.5 }}
                          className="space-y-2 text-xs"
                        >
                          <p>
                            ✅ <strong>Code AI</strong> created a reusable React
                            component
                          </p>
                          <p>
                            ✅ <strong>Search AI</strong> found best practices &
                            examples
                          </p>
                          <p>📁 Full documentation ready with examples</p>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 3.9, duration: 1 }}
                            className={`h-1 rounded-full bg-linear-to-r from-emerald-500 to-teal-500`}
                          />
                        </motion.div>

                        {/* File Download Component */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 4.5 }}
                          className={`mt-4 p-3 rounded-xl border transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-emerald-500/10 border-emerald-500/30"
                              : "bg-emerald-500/5 border-emerald-500/20"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  isDarkMode
                                    ? "bg-emerald-500/20"
                                    : "bg-emerald-500/10"
                                }`}
                              >
                                <FiFileText
                                  className={`text-lg ${
                                    isDarkMode
                                      ? "text-emerald-400"
                                      : "text-emerald-600"
                                  }`}
                                />
                              </div>
                              <div>
                                <p
                                  className={`font-semibold text-sm ${
                                    isDarkMode ? "text-white" : "text-gray-900"
                                  }`}
                                >
                                  ButtonComponent.jsx
                                </p>
                                <p
                                  className={`text-xs ${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  React component with best practices
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-300 ${
                                  isDarkMode
                                    ? "bg-emerald-500 hover:bg-emerald-600"
                                    : "bg-emerald-500 hover:bg-emerald-600 text-white"
                                }`}
                              >
                                Open
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors duration-300 ${
                                  isDarkMode
                                    ? "border-emerald-500/50 hover:bg-emerald-500/20"
                                    : "border-emerald-500/30 hover:bg-emerald-500/10"
                                }`}
                              >
                                Download
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-center"
          >
            <motion.button
              onClick={() => scrollToSection("how-it-works")}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`transition-colors duration-300 ${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <FiChevronDown className="text-3xl mx-auto" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className={`py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900/50" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How{" "}
              <span
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                    : "bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                }`}
              >
                Varon AI
              </span>{" "}
              Works
            </h2>
            <p
              className={`text-xl transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-3xl mx-auto`}
            >
              Think of Varon as your intelligent team manager who coordinates
              specialized AI experts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "You Talk to Varon",
                description:
                  "Simply ask Varon what you need - just like talking to a project manager",
                icon: FaTeamspeak,
              },
              {
                step: "02",
                title: "Varon Understands & Delegates",
                description:
                  "Varon analyzes your request and assigns it to the perfect specialist AI",
                icon: FaRegLightbulb,
              },
              {
                step: "03",
                title: "Expert AI Handles Task",
                description:
                  "The specialized assistant completes the task with expert precision",
                icon: FiCpu,
              },
              {
                step: "04",
                title: "Perfect Results Delivered",
                description:
                  "Varon reviews and delivers clean, accurate results ready to use",
                icon: FiCheck,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`rounded-2xl p-6 border transition-all duration-300 group ${
                  isDarkMode
                    ? "bg-gray-800/50 border-emerald-500/20 hover:border-emerald-500/40"
                    : "bg-white border-emerald-500/30 hover:border-emerald-500/50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500"
                      : "bg-linear-to-r from-emerald-400 to-teal-400"
                  }`}
                >
                  <item.icon className="text-xl" />
                </div>
                <div
                  className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p
                  className={`transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistants Section */}
      <section id="assistants" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Your{" "}
              <span
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                    : "bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                }`}
              >
                AI Dream Team
              </span>
            </h2>
            <p
              className={`text-xl transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-3xl mx-auto`}
            >
              Each specialist is trained to excel in one specific area, ensuring
              top-quality results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FiSearch,
                title: "Search AI",
                description:
                  "Expert at finding precise information online with incredible accuracy",
                features: ["Web Search", "Data Analysis", "Fact Checking"],
              },
              {
                icon: FiCode,
                title: "Coding AI",
                description:
                  "Specialized in writing, debugging, and optimizing code across all languages",
                features: ["Code Generation", "Debugging", "Optimization"],
              },
              {
                icon: FiImage,
                title: "Design AI",
                description:
                  "Creative expert for visuals, UI/UX ideas, and design concepts",
                features: ["UI/UX Design", "Visual Concepts", "Prototyping"],
              },
              {
                icon: FiMessageSquare,
                title: "Messaging AI",
                description:
                  "Professional communication for emails, WhatsApp, Instagram, and more",
                features: ["Email Writing", "Social Media", "CRM Integration"],
              },
              {
                icon: FiGlobe,
                title: "Scraper AI",
                description:
                  "Data extraction specialist gathering information from any website",
                features: [
                  "Web Scraping",
                  "Data Processing",
                  "API Integration",
                ],
              },
              {
                icon: FiFileText,
                title: "Docs AI",
                description:
                  "Document expert for summaries, reports, and professional writing",
                features: ["Documentation", "Reports", "Summaries"],
              },
            ].map((assistant, index) => (
              <motion.div
                key={assistant.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`rounded-2xl p-6 border transition-all duration-300 group ${
                  isDarkMode
                    ? "bg-gray-800/50 border-gray-700 hover:border-emerald-500/50"
                    : "bg-white border-gray-200 hover:border-emerald-500/50"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500"
                      : "bg-linear-to-r from-emerald-400 to-teal-400"
                  }`}
                >
                  <assistant.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {assistant.title}
                </h3>
                <p
                  className={`mb-4 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {assistant.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {assistant.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2 py-1 rounded-full transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-emerald-500/10 text-emerald-600"
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Varon Section */}
      <section
        id="why-varon"
        className={`py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900/50" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why{" "}
              <span
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                    : "bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                }`}
              >
                Varon AI
              </span>{" "}
              is Revolutionary
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className={`rounded-2xl p-8 border transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 border-red-500/20"
                    : "bg-red-50 border-red-500/30"
                }`}
              >
                <h3 className="text-2xl font-bold mb-6 text-red-500">
                  Traditional AI Problems
                </h3>
                <div className="space-y-4">
                  {[
                    "❌ One AI trying to do everything",
                    "❌ Gets confused with complex tasks",
                    "❌ Higher chance of errors and hallucinations",
                    "❌ Limited expertise across domains",
                    "❌ Inconsistent quality output",
                    "❌ No specialized knowledge depth",
                  ].map((problem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 text-gray-300"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span
                        className={`transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {problem}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className={`rounded-2xl p-8 border transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30"
                    : "bg-linear-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/20"
                }`}
              >
                <h3 className="text-2xl font-bold mb-6 text-emerald-500">
                  Varon AI Advantages
                </h3>
                <div className="space-y-4">
                  {[
                    "✅ Boss AI coordinates specialized experts",
                    "✅ Each task handled by domain specialist",
                    "✅ Higher accuracy and reliability",
                    "✅ Consistent, professional quality",
                    "✅ Human-like team coordination",
                    "✅ Deep specialized knowledge in each area",
                  ].map((advantage, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span
                        className={`transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {advantage}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div
              className={`rounded-2xl p-8 border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800/30 border-emerald-500/20"
                  : "bg-white border-emerald-500/30"
              }`}
            >
              <h3 className="text-2xl font-bold mb-4 text-emerald-500">
                The Perfect Formula
              </h3>
              <p className="text-3xl font-bold bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Varon AI = One Boss AI + Many Expert Assistant AIs
              </p>
              <p
                className={`text-xl mt-4 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                They work together just like a real-world professional team
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Intelligent{" "}
              <span
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                    : "bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                }`}
              >
                Architecture
              </span>
            </h2>
            <p
              className={`text-xl transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              } max-w-3xl mx-auto`}
            >
              How Varon coordinates multiple AI specialists seamlessly
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: FiTeam,
                title: "Team Coordination",
                description:
                  "Varon acts as the central brain that understands context and delegates tasks intelligently",
                features: [
                  "Context Awareness",
                  "Task Routing",
                  "Priority Management",
                ],
              },
              {
                icon: FiZap,
                title: "Real-time Processing",
                description:
                  "Simultaneous task execution across multiple specialists for faster results",
                features: [
                  "Parallel Processing",
                  "Load Balancing",
                  "Real-time Updates",
                ],
              },
              {
                icon: FiShield,
                title: "Quality Assurance",
                description:
                  "Every output is verified and refined before delivery to ensure perfection",
                features: [
                  "Quality Checks",
                  "Error Detection",
                  "Result Validation",
                ],
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`rounded-2xl p-6 border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 border-emerald-500/20 hover:border-emerald-500/40"
                    : "bg-white border-emerald-500/30 hover:border-emerald-500/50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500"
                      : "bg-linear-to-r from-emerald-400 to-teal-400"
                  }`}
                >
                  <item.icon className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p
                  className={`mb-4 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.description}
                </p>
                <div className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span
                        className={`transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section
        id="use-cases"
        className={`py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900/50" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Real World{" "}
              <span
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                    : "bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                }`}
              >
                Use Cases
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: FiUsers,
                title: "Content Creation",
                description:
                  "Create comprehensive content with research, writing, and design specialists",
                scenario:
                  "Blog posts with research, images, and SEO optimization",
              },
              {
                icon: FiCode,
                title: "Software Development",
                description:
                  "Build applications with coding, documentation, and testing specialists",
                scenario: "Full-stack apps with docs and deployment scripts",
              },
              {
                icon: FiBarChart,
                title: "Business Intelligence",
                description:
                  "Analyze data with research, visualization, and reporting specialists",
                scenario: "Market analysis with charts and executive summaries",
              },
              {
                icon: FiMessageSquare,
                title: "Customer Support",
                description:
                  "Handle queries with communication, research, and documentation specialists",
                scenario: "Complete customer issue resolution with follow-ups",
              },
              {
                icon: FiFileText,
                title: "Academic Research",
                description:
                  "Conduct research with search, analysis, and writing specialists",
                scenario: "Research papers with citations and analysis",
              },
              {
                icon: FiGlobe,
                title: "Digital Marketing",
                description:
                  "Run campaigns with content, design, and analytics specialists",
                scenario:
                  "Complete marketing campaigns with performance tracking",
              },
            ].map((usecase, index) => (
              <motion.div
                key={usecase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-6 border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 border-emerald-500/20 hover:border-emerald-500/40"
                    : "bg-white border-emerald-500/30 hover:border-emerald-500/50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500"
                      : "bg-linear-to-r from-emerald-400 to-teal-400"
                  }`}
                >
                  <usecase.icon className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{usecase.title}</h3>
                <p
                  className={`mb-4 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {usecase.description}
                </p>
                <div
                  className={`text-sm p-3 rounded-lg transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-emerald-500/5 text-emerald-600"
                  }`}
                >
                  💡 {usecase.scenario}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className={`py-20 transition-colors duration-300 ${
          isDarkMode
            ? "bg-linear-to-br from-emerald-900/20 to-teal-900/20"
            : "bg-linear-to-br from-emerald-500/10 to-teal-500/10"
        }`}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Lead Your{" "}
              <span
                className={`transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                    : "bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                }`}
              >
                AI Dream Team
              </span>
              ?
            </h2>

            <p
              className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Stop settling for generic AI assistants. Get specialized expertise
              coordinated by an intelligent manager.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-2 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-2xl hover:shadow-emerald-500/25"
                    : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-2xl hover:shadow-emerald-400/25"
                }`}
              >
                Start Free Trial <FiArrowRight />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`border px-8 py-4 rounded-full font-semibold text-lg transition-all ${
                  isDarkMode
                    ? "border-emerald-500/50 hover:bg-emerald-500/10"
                    : "border-emerald-500/30 hover:bg-emerald-500/10"
                }`}
              >
                Schedule Demo
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={`mt-12 rounded-2xl p-8 border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800/30 border-emerald-500/20"
                  : "bg-white/50 border-emerald-500/30"
              }`}
            >
              <h3 className="text-2xl font-bold mb-6 text-emerald-500">
                What You Get
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
                {[
                  "✓ One intelligent AI manager",
                  "✓ 6+ specialized AI assistants",
                  "✓ Higher accuracy & reliability",
                  "✓ Natural conversation interface",
                  "✓ Cross-domain expertise",
                  "✓ Professional quality results",
                  "✓ Real-time team coordination",
                  "✓ Continuous improvement",
                  "✓ Enterprise-grade security",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <FiCheck className="text-emerald-500" />
                    <span
                      className={`transition-colors duration-300 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t py-12 transition-colors duration-300 ${
          isDarkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-500 to-teal-500"
                    : "bg-linear-to-r from-emerald-400 to-teal-400"
                }`}
              >
                <FaRobot />
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
            </div>

            <div
              className={`text-center md:text-right transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <p>The boss-level AI that coordinates your digital dream team</p>
              <p className="text-sm mt-2">
                © {new Date().getFullYear()} Varon AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
