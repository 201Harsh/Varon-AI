"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  FiCpu,
  FiShield,
  FiZap,
  FiUsers as FiTeam,
  FiBarChart,
  FiArrowUpRight,
} from "react-icons/fi";
import { FaTeamspeak, FaRegLightbulb } from "react-icons/fa";
import LandingFooter from "./Landing-Comps/LandingFooter";
import LandingHeader from "./Landing-Comps/LandingHeader";
import { useTheme } from "../theme/ThemeToogle";

export default function VaronAILanding() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Navigation */}
      <LandingHeader />

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32"
      >
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isDarkMode
              ? "bg-linear-to-br from-emerald-500/5 to-teal-500/5"
              : "bg-linear-to-br from-emerald-500/10 to-teal-500/10"
          }`}
        ></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`w-16 h-16 sm:w-20 sm:h-20 mb-6 mx-auto lg:mx-0 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-500 to-teal-500"
                    : "bg-linear-to-r from-emerald-400 to-teal-400"
                }`}
              >
                <FaTeamspeak className="text-2xl sm:text-3xl" />
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
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
                className={`text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                The{" "}
                <span className="font-semibold text-emerald-500">
                  boss-level AI
                </span>{" "}
                that leads your digital team
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className={`text-base sm:text-lg mb-6 sm:mb-8 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                One intelligent manager coordinating multiple expert AIs to
                deliver perfect results every time.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all flex items-center gap-2 w-full sm:w-auto justify-center ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-xl hover:shadow-emerald-500/25"
                      : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-xl hover:shadow-emerald-400/25"
                  }`}
                >
                  Try Varon AI Free <FiArrowRight />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`border px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all flex items-center gap-2 w-full sm:w-auto justify-center ${
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
              transition={{ duration: 0.4, delay: 1 }}
              className="relative"
            >
              <div
                className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-900 border border-emerald-500/20"
                    : "bg-gray-50 border border-emerald-500/30"
                }`}
              >
                {/* Chat Container */}
                <div
                  className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 2 }}
                        className={`max-w-[85%] rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-colors duration-300 ${
                          isDarkMode ? "bg-emerald-500/20" : "bg-emerald-500/10"
                        }`}
                      >
                        <p className="text-xs sm:text-sm">
                          Can you help me create a React component and find best
                          practices?
                        </p>
                      </motion.div>
                    </div>

                    {/* Varon Thinking */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3, duration: 0.5 }}
                      className="flex justify-start"
                    >
                      <div
                        className={`max-w-[85%] rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-colors duration-300 ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                          <div
                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
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
                        <p className="text-xs text-emerald-500">
                          Analyzing request... Delegating to specialists
                        </p>
                      </div>
                    </motion.div>

                    {/* AI Agents Activation */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 4, duration: 0.5 }}
                      className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-dashed border-emerald-500/30"
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
                          transition={{ delay: 5 + index * 0.2, duration: 0.4 }}
                          className="text-center"
                        >
                          <motion.div
                            animate={
                              agent.active
                                ? {
                                    scale: [1, 1.2, 1],
                                    boxShadow: [
                                      "0 0 0 0 rgba(16, 185, 129, 0)",
                                      "0 0 0 8px rgba(16, 185, 129, 0.1)",
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
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-1 sm:mb-2 transition-colors duration-300 ${
                              agent.active
                                ? `bg-linear-to-r ${agent.color}`
                                : isDarkMode
                                ? "bg-gray-700"
                                : "bg-gray-300"
                            }`}
                          >
                            <agent.icon className="text-xs sm:text-sm" />
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
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full mx-auto mt-1"
                            />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Final Response */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 6, duration: 0.8 }}
                      className="flex justify-start"
                    >
                      <div
                        className={`w-full rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-colors duration-300 ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div
                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
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
                            transition={{ delay: 6.5, duration: 1 }}
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
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full" />
                          </motion.div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 6.5, duration: 0.8 }}
                          className="space-y-1.5 sm:space-y-2 text-xs"
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
                            transition={{ delay: 7, duration: 1 }}
                            className={`h-1 rounded-full bg-linear-to-r from-emerald-500 to-teal-500`}
                          />
                        </motion.div>

                        {/* File Download Component */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 8.5, duration: 0.8 }}
                          className={`mt-3 p-2 sm:p-3 rounded-lg sm:rounded-xl border transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-emerald-500/10 border-emerald-500/30"
                              : "bg-emerald-500/5 border-emerald-500/20"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div
                                className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg ${
                                  isDarkMode
                                    ? "bg-emerald-500/20"
                                    : "bg-emerald-500/10"
                                }`}
                              >
                                <FiFileText
                                  className={`text-base sm:text-lg ${
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
                            <div className="flex gap-1.5 sm:gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg text-xs font-medium transition-colors duration-300 flex items-center gap-1 ${
                                  isDarkMode
                                    ? "bg-emerald-500 hover:bg-emerald-600"
                                    : "bg-emerald-500 hover:bg-emerald-600 text-white"
                                }`}
                              >
                                Open <FiArrowUpRight className="text-xs" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg text-xs font-medium border transition-colors duration-300 ${
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
            transition={{ delay: 1.5 }}
            className="mt-8 sm:mt-12 text-center"
          >
            <motion.button
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className={`transition-colors duration-300 ${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <FiChevronDown className="text-2xl sm:text-3xl mx-auto" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section - Improved UI */}
      <section
        id="how-it-works"
        className={`py-16 sm:py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-black" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
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
              className={`text-lg sm:text-xl transition-colors duration-300 max-w-2xl lg:max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Think of Varon as your intelligent team manager who coordinates
              specialized AI experts
            </p>
          </motion.div>

          {/* Improved Steps Layout */}
          <div className="max-w-6xl mx-auto">
            {/* Vertical Timeline for Mobile, Horizontal for Desktop */}
            <div className="relative">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-emerald-500/20 to-teal-500/20 transform -translate-y-1/2"></div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
                {[
                  {
                    step: "01",
                    title: "You Talk to Varon",
                    description:
                      "Simply ask Varon what you need - just like talking to a project manager",
                    icon: FaTeamspeak,
                    color: "from-emerald-500 to-teal-500",
                  },
                  {
                    step: "02",
                    title: "Varon Understands & Delegates",
                    description:
                      "Varon analyzes your request and assigns it to the perfect specialist AI",
                    icon: FaRegLightbulb,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    step: "03",
                    title: "Expert AI Handles Task",
                    description:
                      "The specialized assistant completes the task with expert precision",
                    icon: FiCpu,
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    step: "04",
                    title: "Perfect Results Delivered",
                    description:
                      "Varon reviews and delivers clean, accurate results ready to use",
                    icon: FiCheck,
                    color: "from-green-500 to-emerald-500",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`relative rounded-2xl p-6 sm:p-8 border transition-all duration-300 group ${
                      isDarkMode
                        ? "bg-gray-800/50 border-emerald-500/20 hover:border-emerald-500/40"
                        : "bg-white border-emerald-500/30 hover:border-emerald-500/50"
                    }`}
                  >
                    {/* Step Number */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform bg-linear-to-r ${item.color}`}
                    >
                      <item.icon className="text-xl sm:text-2xl text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm sm:text-base transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item.description}
                    </p>

                    {/* Arrow for Desktop */}
                    {index < 3 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-emerald-500">
                        <FiArrowRight className="text-xl" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visual Process Flow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className={`mt-12 sm:mt-16 rounded-2xl p-6 sm:p-8 border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800/30 border-emerald-500/20"
                  : "bg-white border-emerald-500/30"
              }`}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-emerald-500">
                The Complete Workflow
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
                {[
                  {
                    number: "1",
                    label: "User Request",
                    color: "bg-emerald-500",
                  },
                  {
                    number: "2",
                    label: "Varon Analysis",
                    color: "bg-blue-500",
                  },
                  {
                    number: "3",
                    label: "AI Team Work",
                    color: "bg-purple-500",
                  },
                  {
                    number: "4",
                    label: "Perfect Output",
                    color: "bg-green-500",
                  },
                ].map((step, index) => (
                  <div key={step.number} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${step.color} flex items-center justify-center text-white font-bold text-lg sm:text-xl mb-2`}
                    >
                      {step.number}
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Assistants Section */}
      <section id="assistants" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
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
              className={`text-lg sm:text-xl transition-colors duration-300 max-w-2xl lg:max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Each specialist is trained to excel in one specific area, ensuring
              top-quality results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
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
                whileHover={{ scale: 1.02, y: -5 }}
                className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300 group ${
                  isDarkMode
                    ? "bg-gray-800/50 border-gray-700 hover:border-emerald-500/50"
                    : "bg-white border-gray-200 hover:border-emerald-500/50"
                }`}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500"
                      : "bg-linear-to-r from-emerald-400 to-teal-400"
                  }`}
                >
                  <assistant.icon className="text-xl sm:text-2xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  {assistant.title}
                </h3>
                <p
                  className={`mb-3 sm:mb-4 text-sm sm:text-base transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {assistant.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
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
        className={`py-16 sm:py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900/50" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className={`rounded-xl sm:rounded-2xl p-6 sm:p-8 border transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 border-red-500/20"
                    : "bg-red-50 border-red-500/30"
                }`}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-red-500">
                  Traditional AI Problems
                </h3>
                <div className="space-y-3 sm:space-y-4">
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
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                      <span
                        className={`text-sm sm:text-base transition-colors duration-300 ${
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className={`rounded-xl sm:rounded-2xl p-6 sm:p-8 border transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30"
                    : "bg-linear-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/20"
                }`}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-emerald-500">
                  Varon AI Advantages
                </h3>
                <div className="space-y-3 sm:space-y-4">
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
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0"></div>
                      <span
                        className={`text-sm sm:text-base transition-colors duration-300 ${
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
            className="mt-12 sm:mt-16 text-center"
          >
            <div
              className={`rounded-xl sm:rounded-2xl p-6 sm:p-8 border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800/30 border-emerald-500/20"
                  : "bg-white border-emerald-500/30"
              }`}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-emerald-500">
                The Perfect Formula
              </h3>
              <p className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Varon AI = One Boss AI + Many Expert Assistant AIs
              </p>
              <p
                className={`text-lg sm:text-xl mt-3 sm:mt-4 transition-colors duration-300 ${
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
      <section id="architecture" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
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
              className={`text-lg sm:text-xl transition-colors duration-300 max-w-2xl lg:max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              How Varon coordinates multiple AI specialists seamlessly
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
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
                className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 border-emerald-500/20 hover:border-emerald-500/40"
                    : "bg-white border-emerald-500/30 hover:border-emerald-500/50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500"
                      : "bg-linear-to-r from-emerald-400 to-teal-400"
                  }`}
                >
                  <item.icon className="text-xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <p
                  className={`mb-3 sm:mb-4 text-sm sm:text-base transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.description}
                </p>
                <div className="space-y-1.5 sm:space-y-2">
                  {item.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></div>
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
        className={`py-16 sm:py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-black" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
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
                className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 border-emerald-500/20 hover:border-emerald-500/40"
                    : "bg-white border-emerald-500/30 hover:border-emerald-500/50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500"
                      : "bg-linear-to-r from-emerald-400 to-teal-400"
                  }`}
                >
                  <usecase.icon className="text-xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  {usecase.title}
                </h3>
                <p
                  className={`mb-3 sm:mb-4 text-sm sm:text-base transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {usecase.description}
                </p>
                <div
                  className={`text-xs sm:text-sm p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
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
        className={`py-16 sm:py-20 transition-colors duration-300 ${
          isDarkMode
            ? "bg-linear-to-br from-emerald-900/20 to-teal-900/20"
            : "bg-linear-to-br from-emerald-500/10 to-teal-500/10"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
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
              className={`text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl mx-auto transition-colors duration-300 ${
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
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all flex items-center gap-2 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-xl hover:shadow-emerald-500/25"
                    : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-xl hover:shadow-emerald-400/25"
                }`}
              >
                Start Free Trial <FiArrowRight />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`border px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all ${
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
              className={`mt-8 sm:mt-12 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800/30 border-emerald-500/20"
                  : "bg-white/50 border-emerald-500/30"
              }`}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-emerald-500">
                What You Get
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 text-left max-w-4xl mx-auto">
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
                    <FiCheck className="text-emerald-500 shrink-0" />
                    <span
                      className={`text-sm sm:text-base transition-colors duration-300 ${
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
      <LandingFooter />
    </div>
  );
}
