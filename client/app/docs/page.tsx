"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaSearch,
  FaCode,
  FaPalette,
  FaFileAlt,
  FaShieldAlt,
  FaBriefcase,
  FaNetworkWired,
  FaCog,
} from "react-icons/fa";
import {
  FiMenu,
  FiX,
  FiArrowRight,
  FiBook,
  FiCode,
  FiMessageSquare,
  FiBarChart,
  FiZap,
  FiUsers,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { useTheme } from "../theme/ThemeToogle";
import LandingHeader from "../Components/Landing-Comps/LandingHeader";

export default function DocsPage() {
  const { isDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const aiAssistants = [
    {
      category: "Development & Engineering",
      icon: FaCode,
      color: "from-blue-500 to-cyan-500",
      assistants: [
        {
          name: "Code Architect AI",
          description:
            "Designs system architecture and creates technical specifications",
          capabilities: [
            "System Design",
            "Architecture Planning",
            "Technical Documentation",
          ],
        },
        {
          name: "Frontend Specialist AI",
          description:
            "Expert in React, Vue, Angular, and modern frontend frameworks",
          capabilities: [
            "UI Development",
            "Component Architecture",
            "Performance Optimization",
          ],
        },
        {
          name: "Backend Engineer AI",
          description: "Specializes in server-side development and API design",
          capabilities: [
            "API Development",
            "Database Design",
            "Server Optimization",
          ],
        },
        {
          name: "DevOps Automation AI",
          description:
            "Automates deployment, CI/CD pipelines, and infrastructure",
          capabilities: [
            "CI/CD Pipelines",
            "Infrastructure as Code",
            "Monitoring Setup",
          ],
        },
        {
          name: "Security Auditor AI",
          description: "Identifies vulnerabilities and ensures code security",
          capabilities: [
            "Security Scanning",
            "Vulnerability Assessment",
            "Compliance Checking",
          ],
        },
        {
          name: "Mobile Developer AI",
          description: "Creates cross-platform mobile applications",
          capabilities: [
            "iOS/Android Development",
            "React Native",
            "Flutter",
            "Mobile UI/UX",
          ],
        },
      ],
    },
    {
      category: "Design & Creative",
      icon: FaPalette,
      color: "from-purple-500 to-pink-500",
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
        },
        {
          name: "Audio Engineer AI",
          description: "Produces and masters audio content",
          capabilities: [
            "Audio Editing",
            "Sound Design",
            "Music Production",
            "Podcast Mastering",
          ],
        },
      ],
    },
    {
      category: "Content & Communication",
      icon: FaFileAlt,
      color: "from-green-500 to-emerald-500",
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
        },
        {
          name: "SEO Specialist AI",
          description: "Optimizes content for search engines",
          capabilities: [
            "Keyword Research",
            "On-page SEO",
            "Backlink Analysis",
            "Ranking Tracking",
          ],
        },
      ],
    },
    {
      category: "Research & Analysis",
      icon: FaSearch,
      color: "from-orange-500 to-red-500",
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
        },
      ],
    },
    {
      category: "Specialized Domains",
      icon: FaBriefcase,
      color: "from-indigo-500 to-purple-500",
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
        },
        {
          name: "E-commerce Specialist AI",
          description: "Optimizes online store operations and marketing",
          capabilities: [
            "Product Listing",
            "Inventory Management",
            "Pricing Strategy",
            "Customer Analytics",
          ],
        },
        {
          name: "Real Estate Analyst AI",
          description: "Assists with property analysis and market research",
          capabilities: [
            "Property Valuation",
            "Market Analysis",
            "Investment Opportunities",
            "Legal Compliance",
          ],
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
        },
        {
          name: "Game Developer AI",
          description: "Assists with game design and development",
          capabilities: [
            "Game Design",
            "Level Design",
            "Character Development",
            "Game Mechanics",
          ],
        },
      ],
    },
    {
      category: "Infrastructure & Operations",
      icon: FaNetworkWired,
      color: "from-gray-500 to-blue-500",
      assistants: [
        {
          name: "Cloud Architect AI",
          description: "Designs and optimizes cloud infrastructure",
          capabilities: [
            "Cloud Migration",
            "Infrastructure Design",
            "Cost Optimization",
            "Security Architecture",
          ],
        },
        {
          name: "Database Administrator AI",
          description: "Manages and optimizes database systems",
          capabilities: [
            "Database Design",
            "Query Optimization",
            "Backup Strategies",
            "Performance Tuning",
          ],
        },
        {
          name: "Network Security AI",
          description: "Secures network infrastructure and data",
          capabilities: [
            "Network Monitoring",
            "Threat Detection",
            "Security Policies",
            "Incident Response",
          ],
        },
        {
          name: "System Administrator AI",
          description: "Manages IT infrastructure and operations",
          capabilities: [
            "System Monitoring",
            "Automation Scripts",
            "User Management",
            "Disaster Recovery",
          ],
        },
      ],
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <LandingHeader />

      <div className="container mx-auto px-4 sm:px-6 py-8 mt-14">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div
            className={`lg:w-80 shrink-0 rounded-2xl p-6 border transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <nav className="space-y-2">
              <h3
                className={`font-semibold text-lg mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Documentation
              </h3>

              {[
                { id: "overview", label: "Overview", icon: FiBook },
                {
                  id: "architecture",
                  label: "System Architecture",
                  icon: FaNetworkWired,
                },
                { id: "assistants", label: "AI Assistants", icon: FaRobot },
                {
                  id: "coordination",
                  label: "Coordination Engine",
                  icon: FaCog,
                },
                { id: "api", label: "API Reference", icon: FiCode },
                { id: "examples", label: "Use Cases", icon: FiBarChart },
                { id: "faq", label: "FAQ", icon: FiMessageSquare },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="text-lg" />
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Quick Stats */}
            <div
              className={`mt-8 p-4 rounded-lg border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-700/50 border-gray-600"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <h4
                className={`font-semibold mb-3 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                System Stats
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    AI Assistants
                  </span>
                  <span className="font-semibold text-emerald-500">25+</span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Domains Covered
                  </span>
                  <span className="font-semibold text-emerald-500">15+</span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Response Time
                  </span>
                  <span className="font-semibold text-emerald-500">&lt;2s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Section */}
            <section id="overview" className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Varon AI: The Intelligent Coordination Platform
                </h2>

                <div
                  className={`rounded-2xl p-8 border transition-colors duration-300 mb-8 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <p
                    className={`text-lg mb-6 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Varon AI represents the next evolution in artificial
                    intelligence - a sophisticated coordination platform that
                    manages a diverse team of specialized AI assistants, each an
                    expert in their respective domain.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {[
                      {
                        icon: FiUsers,
                        title: "Team Coordination",
                        description:
                          "Intelligent task delegation to the most qualified specialist",
                      },
                      {
                        icon: FiZap,
                        title: "Real-time Processing",
                        description:
                          "Simultaneous execution across multiple AI assistants",
                      },
                      {
                        icon: FaShieldAlt,
                        title: "Quality Assurance",
                        description:
                          "Multi-layer verification and refinement process",
                      },
                    ].map((feature, index) => (
                      <div key={index} className="text-center">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-emerald-500/20"
                              : "bg-emerald-500/10"
                          }`}
                        >
                          <feature.icon className="text-2xl text-emerald-500" />
                        </div>
                        <h4
                          className={`font-semibold mb-2 transition-colors duration-300 ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {feature.title}
                        </h4>
                        <p
                          className={`text-sm transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>

            {/* AI Assistants Section */}
            <section id="assistants" className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className={`text-3xl font-bold transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    AI Assistant Ecosystem
                  </h2>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-emerald-500/10 text-emerald-600"
                    }`}
                  >
                    25+ Specialized Assistants
                  </div>
                </div>

                <p
                  className={`text-lg mb-8 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Varon AI coordinates a comprehensive team of specialized
                  assistants, each trained to excel in specific domains. Here's
                  our complete roster:
                </p>

                {/* AI Assistants Grid */}
                <div className="space-y-6">
                  {aiAssistants.map((category, categoryIndex) => (
                    <div
                      key={categoryIndex}
                      className={`rounded-2xl border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      {/* Category Header */}
                      <button
                        onClick={() => toggleCategory(category.category)}
                        className={`w-full p-6 text-left transition-colors duration-300 ${
                          isDarkMode
                            ? "hover:bg-gray-700/50"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl bg-linear-to-r ${category.color} flex items-center justify-center`}
                            >
                              <category.icon className="text-xl text-white" />
                            </div>
                            <div>
                              <h3
                                className={`text-xl font-semibold transition-colors duration-300 ${
                                  isDarkMode ? "text-white" : "text-gray-800"
                                }`}
                              >
                                {category.category}
                              </h3>
                              <p
                                className={`text-sm transition-colors duration-300 ${
                                  isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {category.assistants.length} specialized
                                assistants
                              </p>
                            </div>
                          </div>
                          {expandedCategory === category.category ? (
                            <FiChevronUp className="text-xl text-gray-400" />
                          ) : (
                            <FiChevronDown className="text-xl text-gray-400" />
                          )}
                        </div>
                      </button>

                      {/* Expandable Content */}
                      {expandedCategory === category.category && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t p-6"
                        >
                          <div className="grid md:grid-cols-2 gap-6">
                            {category.assistants.map(
                              (assistant, assistantIndex) => (
                                <div
                                  key={assistantIndex}
                                  className={`p-4 rounded-lg border transition-colors duration-300 ${
                                    isDarkMode
                                      ? "bg-gray-700/50 border-gray-600"
                                      : "bg-gray-50 border-gray-200"
                                  }`}
                                >
                                  <h4
                                    className={`font-semibold mb-2 transition-colors duration-300 ${
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
                                  <div className="flex flex-wrap gap-1">
                                    {assistant.capabilities.map(
                                      (capability, capIndex) => (
                                        <span
                                          key={capIndex}
                                          className={`px-2 py-1 rounded text-xs transition-colors duration-300 ${
                                            isDarkMode
                                              ? "bg-emerald-500/20 text-emerald-400"
                                              : "bg-emerald-500/10 text-emerald-600"
                                          }`}
                                        >
                                          {capability}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Coordination Engine Section */}
            <section id="coordination" className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2
                  className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Intelligent Coordination Engine
                </h2>

                <div
                  className={`rounded-2xl p-8 border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3
                        className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        How Varon Coordinates
                      </h3>
                      <div className="space-y-4">
                        {[
                          "Analyzes request complexity and requirements",
                          "Identifies the most qualified AI assistants",
                          "Distributes sub-tasks for parallel processing",
                          "Monitors progress and manages dependencies",
                          "Integrates and refines all outputs",
                          "Delivers cohesive, polished results",
                        ].map((step, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                              <FiCheck className="text-white text-sm" />
                            </div>
                            <span
                              className={`transition-colors duration-300 ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        Key Features
                      </h3>
                      <div className="space-y-3">
                        {[
                          {
                            feature: "Context Preservation",
                            description:
                              "Maintains context across all AI interactions",
                          },
                          {
                            feature: "Load Balancing",
                            description:
                              "Distributes tasks efficiently across available assistants",
                          },
                          {
                            feature: "Quality Control",
                            description:
                              "Multi-stage verification process for all outputs",
                          },
                          {
                            feature: "Continuous Learning",
                            description:
                              "Improves coordination based on performance data",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border transition-colors duration-300 ${
                              isDarkMode
                                ? "bg-gray-700/50 border-gray-600"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="font-semibold text-emerald-500 mb-1">
                              {item.feature}
                            </div>
                            <div
                              className={`text-sm transition-colors duration-300 ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {item.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`rounded-2xl p-8 border text-center transition-colors duration-300 ${
                isDarkMode
                  ? "bg-linear-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20"
                  : "bg-linear-to-r from-emerald-500/5 to-teal-500/5 border-emerald-500/20"
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Ready to Experience Intelligent AI Coordination?
              </h3>
              <p
                className={`mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Join thousands of users who are transforming their workflows
                with Varon AI's team of specialized assistants.
              </p>
              <button
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 mx-auto ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                    : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-lg hover:shadow-emerald-400/25 text-white"
                }`}
              >
                Get Started <FiArrowRight />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
