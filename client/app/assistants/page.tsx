"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaCode,
  FaPalette,
  FaFileAlt,
  FaBriefcase,
  FaNetworkWired,
  FaLightbulb,
  FaCog,
  FaBrain,
  FaTasks,
  FaArrowRight,
  FaCheck,
  FaUsers,
  FaLayerGroup,
  FaShieldAlt,
  FaCheckCircle,
  FaUserCheck,
} from "react-icons/fa";
import {
  FiZap,
  FiStar,
  FiChevronDown,
  FiChevronUp,
  FiPlay,
  FiPause,
} from "react-icons/fi";
import { useTheme } from "../theme/ThemeToogle";
import LandingHeader from "../Components/Landing-Comps/LandingHeader";

export default function AIAssistantsPage() {
  const { isDarkMode } = useTheme();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isProcessPlaying, setIsProcessPlaying] = useState<boolean>(false);
  const [currentProcessStep, setCurrentProcessStep] = useState<number>(0);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const toggleProcess = () => {
    if (isProcessPlaying) {
      setIsProcessPlaying(false);
    } else {
      setIsProcessPlaying(true);
      const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      let current = 0;
      const interval = setInterval(() => {
        if (current < steps.length) {
          setCurrentProcessStep(steps[current]);
          current++;
        } else {
          clearInterval(interval);
          setIsProcessPlaying(false);
          setCurrentProcessStep(0);
        }
      }, 1300);
    }
  };

  const aiAssistants = [
    {
      category: "Development & Engineering",
      icon: FaCode,
      color: "from-blue-500 to-cyan-500",
      description: "Specialized AIs for software development tasks",
      assistants: [
        {
          name: "Code Architect AI",
          description:
            "Designs system architecture and creates technical specifications",
          capabilities: [
            "System Design",
            "Architecture Planning",
            "Technical Documentation",
            "Scalability Analysis",
          ],
          expertise: "Senior System Architect",
          responseTime: "2-3 minutes",
        },
        {
          name: "Frontend Specialist AI",
          description:
            "Expert in React, Vue, Angular, and modern frontend frameworks",
          capabilities: [
            "UI Development",
            "Component Architecture",
            "Performance Optimization",
            "Responsive Design",
          ],
          expertise: "Lead Frontend Developer",
          responseTime: "1-2 minutes",
        },
        {
          name: "Backend Engineer AI",
          description: "Specializes in server-side development and API design",
          capabilities: [
            "API Development",
            "Database Design",
            "Server Optimization",
            "Microservices",
          ],
          expertise: "Backend Architect",
          responseTime: "2-4 minutes",
        },
        {
          name: "DevOps Automation AI",
          description:
            "Automates deployment, CI/CD pipelines, and infrastructure",
          capabilities: [
            "CI/CD Pipelines",
            "Infrastructure as Code",
            "Monitoring Setup",
            "Cloud Deployment",
          ],
          expertise: "DevOps Engineer",
          responseTime: "3-5 minutes",
        },
        {
          name: "Security Auditor AI",
          description: "Identifies vulnerabilities and ensures code security",
          capabilities: [
            "Security Scanning",
            "Vulnerability Assessment",
            "Compliance Checking",
            "Penetration Testing",
          ],
          expertise: "Security Specialist",
          responseTime: "4-6 minutes",
        },
      ],
    },
    {
      category: "Design & Creative",
      icon: FaPalette,
      color: "from-purple-500 to-pink-500",
      description: "Creative professionals for visual and multimedia content",
      assistants: [
        {
          name: "UI/UX Designer AI",
          description: "Creates intuitive user interfaces and experiences",
          capabilities: [
            "Wireframing",
            "Prototyping",
            "User Research",
            "Design Systems",
          ],
          expertise: "Senior UX Designer",
          responseTime: "2-3 minutes",
        },
        {
          name: "Graphic Designer AI",
          description: "Produces visual assets and branding materials",
          capabilities: [
            "Logo Design",
            "Brand Identity",
            "Marketing Materials",
            "Illustrations",
          ],
          expertise: "Creative Director",
          responseTime: "3-5 minutes",
        },
        {
          name: "Video Editor AI",
          description: "Edits and produces professional video content",
          capabilities: [
            "Video Editing",
            "Motion Graphics",
            "Color Grading",
            "Audio Mixing",
          ],
          expertise: "Video Producer",
          responseTime: "5-10 minutes",
        },
        {
          name: "3D Modeling AI",
          description: "Creates 3D models and animations",
          capabilities: [
            "3D Modeling",
            "Animation",
            "Rendering",
            "VR/AR Content",
          ],
          expertise: "3D Artist",
          responseTime: "8-15 minutes",
        },
      ],
    },
    {
      category: "Content & Communication",
      icon: FaFileAlt,
      color: "from-green-500 to-emerald-500",
      description: "Content creators and communication specialists",
      assistants: [
        {
          name: "Content Strategist AI",
          description: "Develops content strategies and editorial calendars",
          capabilities: [
            "Content Planning",
            "SEO Strategy",
            "Audience Analysis",
            "Trend Research",
          ],
          expertise: "Content Director",
          responseTime: "2-4 minutes",
        },
        {
          name: "Technical Writer AI",
          description: "Creates comprehensive technical documentation",
          capabilities: [
            "API Documentation",
            "User Manuals",
            "Technical Guides",
            "Knowledge Bases",
          ],
          expertise: "Technical Writer",
          responseTime: "3-5 minutes",
        },
        {
          name: "Social Media Manager AI",
          description: "Manages and optimizes social media presence",
          capabilities: [
            "Content Scheduling",
            "Audience Engagement",
            "Analytics",
            "Campaign Management",
          ],
          expertise: "Social Media Expert",
          responseTime: "1-2 minutes",
        },
        {
          name: "Email Marketing AI",
          description: "Creates and optimizes email campaigns",
          capabilities: [
            "Email Copywriting",
            "A/B Testing",
            "Automation Flows",
            "Performance Tracking",
          ],
          expertise: "Email Marketing Specialist",
          responseTime: "2-3 minutes",
        },
      ],
    },
    {
      category: "Research & Analysis",
      icon: FaSearch,
      color: "from-orange-500 to-red-500",
      description: "Analytical minds for data and research tasks",
      assistants: [
        {
          name: "Market Research AI",
          description: "Analyzes market trends and competitor strategies",
          capabilities: [
            "Competitive Analysis",
            "Market Sizing",
            "Trend Forecasting",
            "Consumer Insights",
          ],
          expertise: "Market Analyst",
          responseTime: "4-7 minutes",
        },
        {
          name: "Data Scientist AI",
          description: "Performs advanced data analysis and modeling",
          capabilities: [
            "Statistical Analysis",
            "Machine Learning",
            "Predictive Modeling",
            "Data Visualization",
          ],
          expertise: "Data Scientist",
          responseTime: "5-10 minutes",
        },
        {
          name: "Academic Research AI",
          description: "Assists with academic papers and research",
          capabilities: [
            "Literature Review",
            "Citation Management",
            "Research Methodology",
            "Paper Writing",
          ],
          expertise: "Research Assistant",
          responseTime: "3-6 minutes",
        },
        {
          name: "Business Intelligence AI",
          description: "Transforms data into business insights",
          capabilities: [
            "Dashboard Creation",
            "KPI Tracking",
            "Report Generation",
            "Strategic Insights",
          ],
          expertise: "BI Analyst",
          responseTime: "4-8 minutes",
        },
      ],
    },
    {
      category: "Specialized Domains",
      icon: FaBriefcase,
      color: "from-indigo-500 to-purple-500",
      description: "Domain experts for industry-specific tasks",
      assistants: [
        {
          name: "Healthcare Assistant AI",
          description: "Supports medical research and healthcare operations",
          capabilities: [
            "Medical Research",
            "Patient Education",
            "Healthcare Analytics",
            "Clinical Documentation",
          ],
          expertise: "Medical Researcher",
          responseTime: "5-10 minutes",
        },
        {
          name: "Financial Analyst AI",
          description: "Provides financial analysis and investment insights",
          capabilities: [
            "Financial Modeling",
            "Investment Analysis",
            "Risk Assessment",
            "Portfolio Management",
          ],
          expertise: "Financial Analyst",
          responseTime: "4-8 minutes",
        },
        {
          name: "Legal Research AI",
          description: "Assists with legal documentation and research",
          capabilities: [
            "Case Law Research",
            "Contract Analysis",
            "Legal Writing",
            "Compliance Checking",
          ],
          expertise: "Legal Researcher",
          responseTime: "6-12 minutes",
        },
        {
          name: "Education Tutor AI",
          description: "Provides personalized learning and tutoring",
          capabilities: [
            "Curriculum Design",
            "Personalized Learning",
            "Assessment Creation",
            "Progress Tracking",
          ],
          expertise: "Educational Specialist",
          responseTime: "2-4 minutes",
        },
      ],
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Request Intake",
      description:
        "Varon receives request and checks if it needs specialist AI.",
      icon: FaUserCheck,
      duration: "2.08s",
    },
    {
      step: 2,
      title: "Intent Analysis",
      description:
        "Deep NLP analysis to capture context, priority, and constraints.",
      icon: FaSearch,
      duration: "3.7s",
    },
    {
      step: 3,
      title: "Task Breakdown",
      description: "Request broken into structured micro-steps for execution.",
      icon: FaTasks,
      duration: "4.2s",
    },
    {
      step: 4,
      title: "Specialist Matching",
      description:
        "Selects ideal assistants based on expertise and availability.",
      icon: FaBrain,
      duration: "5.5s",
    },
    {
      step: 5,
      title: "Parallel Execution",
      description: "Assistants work simultaneously, reducing completion time.",
      icon: FaNetworkWired,
      duration: "7.8s",
    },
    {
      step: 6,
      title: "Quality Monitoring",
      description: "Varon supervises work and manages dependencies.",
      icon: FaCog,
      duration: "1.9s",
    },
    {
      step: 7,
      title: "Smart Integration",
      description: "Outputs merged and transformed into a single solution.",
      icon: FaLayerGroup,
      duration: "1.4s",
    },
    {
      step: 8,
      title: "Final Validation",
      description: "Accuracy and consistency double-check before delivery.",
      icon: FaShieldAlt,
      duration: "0.9s",
    },
    {
      step: 9,
      title: "Delivery",
      description: "Final result delivered with optional follow-up actions.",
      icon: FaCheckCircle,
      duration: "2.7s",
    },
  ];

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <header className="relative py-12 md:py-20 overflow-hidden">
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isDarkMode
              ? "bg-linear-to-r from-emerald-500/10 to-teal-500/10"
              : "bg-linear-to-r from-emerald-500/5 to-teal-500/5"
          }`}
        ></div>

        <LandingHeader />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 mt-8 md:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent font-mono wrap-break-word">
              The Varon AI Syndicate
            </h1>
            <p
              className={`text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              20+ Specialized AI Assistants Coordinated by Varon
            </p>
            <p
              className={`text-base sm:text-lg max-w-3xl mx-auto transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Meet your complete team of AI specialists, each trained to excel
              in specific domains. Varon intelligently coordinates them to
              deliver comprehensive solutions.
            </p>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 pb-20 mt-8">
        <section className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`rounded-2xl p-4 sm:p-6 md:p-8 border transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <h2
                  className={`text-2xl sm:text-3xl font-bold mb-2 md:mb-4 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  How Varon Thinks
                </h2>
                <p
                  className={`text-base sm:text-lg transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Watch Varon's intelligent coordination process
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleProcess}
                className={`w-full md:w-auto px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                    : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-lg hover:shadow-emerald-400/25 text-white"
                }`}
              >
                {isProcessPlaying ? (
                  <FiPause className="text-xl" />
                ) : (
                  <FiPlay className="text-xl" />
                )}
                {isProcessPlaying ? "Pause Demo" : "Start Demo"}
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity:
                      isProcessPlaying && currentProcessStep >= index ? 1 : 0.7,
                    scale:
                      isProcessPlaying && currentProcessStep === index
                        ? 1.05
                        : 1,
                    y:
                      isProcessPlaying && currentProcessStep === index ? -5 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-500 ${
                    isProcessPlaying && currentProcessStep >= index
                      ? "border-emerald-500 bg-emerald-500/10"
                      : isDarkMode
                      ? "border-gray-600 bg-gray-700/50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-colors duration-300 shrink-0 ${
                        isProcessPlaying && currentProcessStep >= index
                          ? "bg-emerald-500 text-white"
                          : isDarkMode
                          ? "bg-gray-600 text-gray-400"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      <step.icon className="text-lg sm:text-xl" />
                    </div>
                    <div>
                      <div
                        className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                          isProcessPlaying && currentProcessStep >= index
                            ? "text-emerald-400"
                            : isDarkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        Step {step.step}
                      </div>
                      <div
                        className={`font-semibold text-sm sm:text-base transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {step.title}
                      </div>
                    </div>
                  </div>
                  <p
                    className={`text-sm transition-colors duration-300 line-clamp-3 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {step.description}
                  </p>
                  <div
                    className={`text-xs mt-3 transition-colors duration-300 ${
                      isProcessPlaying && currentProcessStep >= index
                        ? "text-emerald-400"
                        : isDarkMode
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    ⏱️ {step.duration}
                  </div>
                </motion.div>
              ))}
            </div>

            <div
              className={`mt-8 p-4 sm:p-6 rounded-xl border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-700/50 border-gray-600"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <h3
                className={`text-lg sm:text-xl font-semibold mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Intelligent Task Assignment Logic
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-semibold mb-3 text-emerald-500`}>
                    Factors Considered:
                  </h4>
                  <ul
                    className={`space-y-2 text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>Domain expertise and specialization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>Current workload and availability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>Task complexity and estimated time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>Quality and performance history</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 text-emerald-500`}>
                    Coordination Benefits:
                  </h4>
                  <ul
                    className={`space-y-2 text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <li className="flex items-start gap-2">
                      <FiZap className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>Parallel processing for faster results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiStar className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>Expert-level quality in each domain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaUsers className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>Seamless collaboration between specialists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaLightbulb className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>Continuous learning and improvement</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2
                  className={`text-2xl sm:text-3xl font-bold mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Meet Your AI Team
                </h2>
                <p
                  className={`text-base sm:text-lg transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  20+ specialized assistants across 5 major domains
                </p>
              </div>
              <div
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 self-start sm:self-center ${
                  isDarkMode
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-emerald-500/10 text-emerald-600"
                }`}
              >
                Total: 20 Assistants
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {aiAssistants.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className={`rounded-2xl border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => toggleCategory(category.category)}
                    className={`w-full p-4 sm:p-6 md:p-8 text-left transition-colors duration-300 ${
                      isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-linear-to-r ${category.color} flex items-center justify-center`}
                        >
                          <category.icon className="text-xl sm:text-2xl text-white" />
                        </div>
                        <div className="text-left">
                          <h3
                            className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 transition-colors duration-300 ${
                              isDarkMode ? "text-white" : "text-gray-800"
                            }`}
                          >
                            {category.category}
                          </h3>
                          <p
                            className={`text-xs sm:text-sm md:text-base hidden sm:block transition-colors duration-300 ${
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {category.description}
                          </p>
                        </div>
                      </div>

                      <p
                        className={`text-xs sm:hidden w-full transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {category.description}
                      </p>

                      <div className="flex items-center justify-between w-full sm:w-auto gap-4 mt-2 sm:mt-0">
                        <div
                          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {category.assistants.length} Assistants
                        </div>
                        {expandedCategory === category.category ? (
                          <FiChevronUp className="text-xl sm:text-2xl text-gray-400" />
                        ) : (
                          <FiChevronDown className="text-xl sm:text-2xl text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedCategory === category.category && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t"
                      >
                        <div className="p-4 sm:p-6 md:p-8">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                            {category.assistants.map(
                              (assistant, assistantIndex) => (
                                <motion.div
                                  key={assistantIndex}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: assistantIndex * 0.1 }}
                                  className={`p-4 sm:p-6 rounded-xl border transition-colors duration-300 ${
                                    isDarkMode
                                      ? "bg-gray-700/50 border-gray-600"
                                      : "bg-gray-50 border-gray-200"
                                  }`}
                                >
                                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2 sm:gap-4">
                                    <div>
                                      <h4
                                        className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2 transition-colors duration-300 ${
                                          isDarkMode
                                            ? "text-white"
                                            : "text-gray-800"
                                        }`}
                                      >
                                        {assistant.name}
                                      </h4>
                                      <p
                                        className={`text-sm mb-3 transition-colors duration-300 ${
                                          isDarkMode
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                        }`}
                                      >
                                        {assistant.description}
                                      </p>
                                    </div>
                                    <div
                                      className={`self-start px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                                        isDarkMode
                                          ? "bg-emerald-500/20 text-emerald-400"
                                          : "bg-emerald-500/10 text-emerald-600"
                                      }`}
                                    >
                                      {assistant.responseTime}
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <div>
                                      <div
                                        className={`text-sm font-medium mb-1 transition-colors duration-300 ${
                                          isDarkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        Expertise Level
                                      </div>
                                      <div
                                        className={`text-sm font-semibold text-emerald-500`}
                                      >
                                        {assistant.expertise}
                                      </div>
                                    </div>

                                    <div>
                                      <div
                                        className={`text-sm font-medium mb-2 transition-colors duration-300 ${
                                          isDarkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        Key Capabilities
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        {assistant.capabilities.map(
                                          (capability, capIndex) => (
                                            <span
                                              key={capIndex}
                                              className={`px-2 sm:px-3 py-1 rounded-full text-xs transition-colors duration-300 ${
                                                isDarkMode
                                                  ? "bg-gray-600 text-gray-300"
                                                  : "bg-gray-200 text-gray-700"
                                              }`}
                                            >
                                              {capability}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`mt-16 sm:mt-20 rounded-2xl p-6 sm:p-12 border text-center transition-colors duration-300 ${
            isDarkMode
              ? "bg-linear-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20"
              : "bg-linear-to-r from-emerald-500/5 to-teal-500/5 border-emerald-500/20"
          }`}
        >
          <h3
            className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Ready to Deploy Your AI Dream Team?
          </h3>
          <p
            className={`text-base sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto transition-colors duration-300 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Experience the power of coordinated AI assistance. Let Varon manage
            your specialized team for perfect results every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                isDarkMode
                  ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                  : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-lg hover:shadow-emerald-400/25 text-white"
              }`}
            >
              Start Free Trial <FaArrowRight />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full sm:w-auto px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border ${
                isDarkMode
                  ? "border-emerald-500/50 hover:bg-emerald-500/10"
                  : "border-emerald-500/30 hover:bg-emerald-500/10"
              }`}
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
