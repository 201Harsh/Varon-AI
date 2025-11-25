"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaTeamspeak,
  FaRegLightbulb,
  FaCode,
  FaPython,
  FaReact,
  FaNodeJs,
  FaBrain,
  FaGitAlt,
  FaServer,
} from "react-icons/fa";
import {
  FiUsers,
  FiZap,
  FiShield,
  FiBarChart,
  FiCpu,
  FiCheck,
  FiAward,
  FiBook,
  FiCoffee,
} from "react-icons/fi";
import {
  SiNextdotjs,
  SiTensorflow,
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiTypescript,
  SiOpenai,
  SiDocker,
  SiAmazonwebservices,
} from "react-icons/si";
import LandingHeader from "../Components/Landing-Comps/LandingHeader";
import { useTheme } from "../theme/ThemeToogle";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("mission");

  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header className="relative py-20 overflow-hidden">
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10"
              : "bg-gradient-to-r from-emerald-500/5 to-teal-500/5"
          }`}
        ></div>

        <LandingHeader />

        {/* Theme Toggle */}
        <div className="container mx-auto px-6 relative z-10 mt-12 ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              About Varon AI
            </h1>
            <p
              className={`text-xl md:text-2xl mb-8 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              The Future of Intelligent Task Management and AI Coordination
            </p>
            <p
              className={`text-lg max-w-3xl mx-auto transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Varon AI represents a paradigm shift in artificial intelligence -
              moving beyond single-purpose AI assistants to create a coordinated
              ecosystem of specialized intelligence working in harmony.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: "mission", label: "Our Mission", icon: FaRegLightbulb },
            { id: "architecture", label: "Architecture", icon: FiCpu },
            { id: "technology", label: "Technology", icon: FaCode },
            { id: "developer", label: "Developer", icon: FiUsers },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <tab.icon className="text-lg" />
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-6 pb-20">
        {/* Mission Section */}
        {activeTab === "mission" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Redefining AI Assistance
                </h2>
                <p
                  className={`text-lg mb-6 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Traditional AI systems operate as single entities trying to
                  handle everything. This often leads to mediocre results,
                  confusion, and limited expertise across domains.
                </p>
                <p
                  className={`text-lg mb-8 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Varon AI changes this paradigm by introducing a{" "}
                  <span className="font-semibold text-emerald-500">
                    boss-level coordination system
                  </span>
                  where one intelligent manager (Varon) delegates tasks to
                  specialized AI assistants, each trained to excel in specific
                  domains.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-emerald-500">
                    <FiCheck className="text-xl" />
                    <span className="font-semibold">
                      Intelligent Coordination
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-500">
                    <FiCheck className="text-xl" />
                    <span className="font-semibold">Specialized Expertise</span>
                  </div>
                </div>
              </div>
              <div
                className={`rounded-2xl p-8 border transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <h3
                  className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  The Varon Difference
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: FaTeamspeak,
                      title: "One Conversation Interface",
                      description:
                        "You only talk to Varon - no need to learn multiple AI systems",
                    },
                    {
                      icon: FiZap,
                      title: "Smart Task Delegation",
                      description:
                        "Varon automatically routes tasks to the most qualified specialist",
                    },
                    {
                      icon: FiShield,
                      title: "Quality Assurance",
                      description:
                        "Every output is verified and refined before delivery",
                    },
                    {
                      icon: FiBarChart,
                      title: "Continuous Learning",
                      description:
                        "The system improves coordination and expertise over time",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                          isDarkMode ? "bg-emerald-500/20" : "bg-emerald-500/10"
                        }`}
                      >
                        <feature.icon className="text-xl text-emerald-500" />
                      </div>
                      <div>
                        <h4
                          className={`font-semibold mb-1 transition-colors duration-300 ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {feature.title}
                        </h4>
                        <p
                          className={`transition-colors duration-300 ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Problem Solution Section */}
            <div
              className={`rounded-2xl p-8 md:p-12 border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20"
                  : "bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border-emerald-500/20"
              }`}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3
                    className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    The Problem We Solve
                  </h3>
                  <div className="space-y-4">
                    {[
                      "❌ Single AI systems overwhelmed by complex tasks",
                      "❌ Limited domain expertise in general AI assistants",
                      "❌ Inconsistent quality across different types of requests",
                      "❌ No intelligent coordination between specialized AIs",
                      "❌ Users need to learn multiple AI interfaces",
                    ].map((problem, index) => (
                      <p
                        key={index}
                        className={`flex items-start gap-3 transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {problem}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <h3
                    className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Our Solution
                  </h3>
                  <div className="space-y-4">
                    {[
                      "✅ Varon coordinates multiple specialized AI assistants",
                      "✅ Each assistant masters one specific domain",
                      "✅ Consistent, professional-quality outputs",
                      "✅ Intelligent task routing and coordination",
                      "✅ Single, natural conversation interface",
                    ].map((solution, index) => (
                      <p
                        key={index}
                        className={`flex items-start gap-3 transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {solution}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Architecture Section */}
        {activeTab === "architecture" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2
                className={`text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Intelligent System Architecture
              </h2>
              <p
                className={`text-lg max-w-3xl mx-auto transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Varon AI's architecture is designed for optimal coordination,
                efficiency, and scalability. Here's how our intelligent system
                works:
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  step: "01",
                  title: "Input Processing",
                  description:
                    "Varon analyzes user requests using advanced NLP to understand intent, context, and requirements.",
                  features: [
                    "Natural Language Understanding",
                    "Context Analysis",
                    "Intent Classification",
                  ],
                },
                {
                  step: "02",
                  title: "Task Delegation",
                  description:
                    "Intelligent routing system assigns tasks to the most qualified specialist AI based on domain expertise.",
                  features: [
                    "Expertise Matching",
                    "Load Balancing",
                    "Priority Management",
                  ],
                },
                {
                  step: "03",
                  title: "Quality Control",
                  description:
                    "All outputs are verified, refined, and integrated before delivery to ensure perfection.",
                  features: [
                    "Quality Verification",
                    "Error Detection",
                    "Result Integration",
                  ],
                },
              ].map((stage, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-6 border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4">
                    {stage.step}
                  </div>
                  <h3
                    className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {stage.title}
                  </h3>
                  <p
                    className={`mb-4 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {stage.description}
                  </p>
                  <div className="space-y-2">
                    {stage.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
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
                </div>
              ))}
            </div>

            {/* AI Team Structure */}
            <div
              className={`rounded-2xl p-8 border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-8 text-center transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                The AI Dream Team Structure
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    role: "Varon (Manager)",
                    description:
                      "Central coordinator that understands context and delegates tasks",
                    responsibilities: [
                      "Request Analysis",
                      "Task Delegation",
                      "Quality Control",
                    ],
                  },
                  {
                    role: "Specialist AIs",
                    description:
                      "Domain experts handling specific types of tasks",
                    responsibilities: [
                      "Task Execution",
                      "Domain Expertise",
                      "Result Generation",
                    ],
                  },
                  {
                    role: "Integration Layer",
                    description:
                      "Combines and refines outputs from multiple specialists",
                    responsibilities: [
                      "Output Integration",
                      "Formatting",
                      "Final Delivery",
                    ],
                  },
                ].map((role, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FaRobot className="text-2xl text-white" />
                    </div>
                    <h4
                      className={`font-bold text-lg mb-2 transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {role.role}
                    </h4>
                    <p
                      className={`text-sm mb-4 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {role.description}
                    </p>
                    <div className="space-y-1">
                      {role.responsibilities.map((resp, idx) => (
                        <div
                          key={idx}
                          className={`text-xs transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          • {resp}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Technology Section */}
        {activeTab === "technology" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2
                className={`text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Technology Stack
              </h2>
              <p
                className={`text-lg max-w-3xl mx-auto transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Built with cutting-edge technologies to ensure performance,
                scalability, and reliability
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                {
                  category: "Frontend & UI",
                  technologies: [
                    {
                      name: "Next.js 14",
                      icon: SiNextdotjs,
                      color: "text-black dark:text-white",
                    },
                    { name: "React 18", icon: FaReact, color: "text-blue-500" },
                    {
                      name: "TypeScript",
                      icon: SiTypescript,
                      color: "text-blue-600",
                    },
                    {
                      name: "Tailwind CSS",
                      icon: SiTailwindcss,
                      color: "text-cyan-500",
                    },
                    {
                      name: "Framer Motion",
                      icon: FiZap,
                      color: "text-purple-500",
                    },
                  ],
                },
                {
                  category: "Backend & AI",
                  technologies: [
                    {
                      name: "Node.js",
                      icon: FaNodeJs,
                      color: "text-green-600",
                    },
                    { name: "Python", icon: FaPython, color: "text-blue-500" },
                    {
                      name: "TensorFlow",
                      icon: SiTensorflow,
                      color: "text-orange-500",
                    },
                    {
                      name: "OpenAI API",
                      icon: SiOpenai,
                      color: "text-green-500",
                    },
                    {
                      name: "Express.js",
                      icon: SiExpress,
                      color: "text-gray-600",
                    },
                  ],
                },
                {
                  category: "Database & Infrastructure",
                  technologies: [
                    {
                      name: "MongoDB",
                      icon: SiMongodb,
                      color: "text-green-500",
                    },
                    {
                      name: "AWS",
                      icon: SiAmazonwebservices,
                      color: "text-orange-500",
                    },
                    { name: "Docker", icon: SiDocker, color: "text-blue-500" },
                    { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
                    {
                      name: "REST APIs",
                      icon: FaServer,
                      color: "text-green-600",
                    },
                  ],
                },
              ].map((stack, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-6 border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h3
                    className={`text-xl font-bold mb-6 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {stack.category}
                  </h3>
                  <div className="space-y-4">
                    {stack.technologies.map((tech, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <tech.icon className={`text-2xl ${tech.color}`} />
                        <span
                          className={`font-medium transition-colors duration-300 ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Features */}
            <div
              className={`rounded-2xl p-8 border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20"
                  : "bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border-emerald-500/20"
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-8 text-center transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Technical Innovations
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4
                    className={`font-bold text-lg mb-4 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    AI Coordination Engine
                  </h4>
                  <ul
                    className={`space-y-3 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <li className="flex items-start gap-2">
                      <FiCheck className="text-emerald-500 mt-1 flex-shrink-0" />
                      <span>
                        Intelligent task routing based on AI capabilities
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="text-emerald-500 mt-1 flex-shrink-0" />
                      <span>
                        Real-time performance monitoring and load balancing
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="text-emerald-500 mt-1 flex-shrink-0" />
                      <span>
                        Context preservation across multiple AI interactions
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4
                    className={`font-bold text-lg mb-4 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    System Architecture
                  </h4>
                  <ul
                    className={`space-y-3 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <li className="flex items-start gap-2">
                      <FiCheck className="text-emerald-500 mt-1 flex-shrink-0" />
                      <span>
                        Microservices-based architecture for scalability
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="text-emerald-500 mt-1 flex-shrink-0" />
                      <span>Real-time communication between AI components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="text-emerald-500 mt-1 flex-shrink-0" />
                      <span>
                        Secure API gateway for all external communications
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Developer Section */}
        {activeTab === "developer" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2
                className={`text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Meet the Developer
              </h2>
              <p
                className={`text-lg transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                The visionary behind Varon AI - Combining technical expertise
                with innovative AI solutions
              </p>
            </div>

            <div
              className={`rounded-2xl p-8 border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Developer Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">H</span>
                  </div>
                </div>

                {/* Developer Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3
                    className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Harsh
                  </h3>
                  <p className="text-lg text-emerald-500 mb-4">
                    Full Stack AI Developer
                  </p>
                  <p
                    className={`mb-6 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Passionate developer with expertise in modern web
                    technologies, artificial intelligence, and creating
                    innovative solutions that bridge the gap between complex
                    technology and user-friendly experiences.
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-emerald-500/10 text-emerald-600"
                      }`}
                    >
                      <FiAward className="inline mr-1" /> 5+ Years Experience
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-blue-500/10 text-blue-600"
                      }`}
                    >
                      <FiBook className="inline mr-1" /> Continuous Learner
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-purple-500/10 text-purple-600"
                      }`}
                    >
                      <FiCoffee className="inline mr-1" /> AI Enthusiast
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div
                className={`rounded-2xl p-6 border transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <h4
                  className={`text-xl font-bold mb-6 flex items-center gap-2 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  <FaCode className="text-emerald-500" />
                  Technical Expertise
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      category: "Frontend",
                      skills: "React, Next.js, TypeScript, Tailwind CSS",
                    },
                    {
                      category: "Backend",
                      skills: "Node.js, Express, Python, REST APIs",
                    },
                    {
                      category: "Mobile",
                      skills: "React Native, Cross-platform Development",
                    },
                    {
                      category: "Database",
                      skills: "MongoDB, PostgreSQL, Firebase",
                    },
                    {
                      category: "AI/ML",
                      skills: "TensorFlow, OpenAI APIs, Machine Learning",
                    },
                    { category: "DevOps", skills: "AWS, Docker, CI/CD, Git" },
                  ].map((skill, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start"
                    >
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {skill.category}
                      </span>
                      <span
                        className={`text-right text-sm transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {skill.skills}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`rounded-2xl p-6 border transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <h4
                  className={`text-xl font-bold mb-6 flex items-center gap-2 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  <FaBrain className="text-emerald-500" />
                  AI & Innovation Focus
                </h4>
                <div className="space-y-4">
                  {[
                    "AI-Powered Application Development",
                    "Machine Learning Integration",
                    "Natural Language Processing",
                    "Intelligent System Design",
                    "Real-time AI Coordination",
                    "Scalable AI Architecture",
                  ].map((focus, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                      <span
                        className={`transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {focus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Philosophy */}
            <div
              className={`rounded-2xl p-8 border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20"
                  : "bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border-emerald-500/20"
              }`}
            >
              <h4
                className={`text-2xl font-bold mb-6 text-center transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Development Philosophy
              </h4>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {[
                  {
                    icon: FiZap,
                    title: "Innovation First",
                    description:
                      "Pushing boundaries with cutting-edge technology and creative solutions",
                  },
                  {
                    icon: FiUsers,
                    title: "User-Centric",
                    description:
                      "Building products that solve real problems with exceptional user experiences",
                  },
                  {
                    icon: FiShield,
                    title: "Quality Focus",
                    description:
                      "Emphasizing clean code, robust architecture, and reliable performance",
                  },
                ].map((principle, index) => (
                  <div
                    key={index}
                    className={`rounded-xl p-6 border transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <principle.icon className="text-3xl text-emerald-500 mx-auto mb-4" />
                    <h5
                      className={`font-bold text-lg mb-2 transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {principle.title}
                    </h5>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
