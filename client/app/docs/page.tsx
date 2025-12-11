"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaCode,
  FaPalette,
  FaShieldAlt,
  FaNetworkWired,
  FaCog,
  FaGithub,
  FaTerminal,
  FaLayerGroup,
  FaMicrochip,
} from "react-icons/fa";
import {
  FiMenu,
  FiX,
  FiBook,
  FiBarChart,
  FiZap,
  FiUsers,
  FiChevronDown,
  FiChevronUp,
  FiCpu,
  FiGlobe,
} from "react-icons/fi";
import { useTheme } from "../theme/ThemeToogle";
import LandingHeader from "../Components/Landing-Comps/LandingHeader";

export default function DocsPage() {
  const { isDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "Development & Engineering"
  );

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const aiAssistants = [
    {
      category: "Development & Engineering",
      icon: FaCode,
      color: "from-blue-600 to-cyan-500",
      assistants: [
        {
          name: "Cobra AI",
          description: "Web Coding Engineer & Full Stack Specialist",
          capabilities: [
            "React/Next.js",
            "Tailwind CSS",
            "Component Logic",
            "Frontend Architecture",
          ],
        },
        {
          name: "BlackReplit",
          description: "Backend Systems Engineer",
          capabilities: [
            "Node.js/Express",
            "API Architecture",
            "Server Optimization",
            "Microservices",
          ],
        },
        {
          name: "ViperStack",
          description: "Python Systems Engineer",
          capabilities: [
            "Python Scripting",
            "Django/FastAPI",
            "System Automation",
            "Data Pipelines",
          ],
        },
        {
          name: "ArcStrike Unit",
          description: "Mobile App Developer",
          capabilities: [
            "React Native",
            "iOS/Android deployment",
            "Mobile UI/UX",
            "Native Modules",
          ],
        },
        {
          name: "FluxAudit",
          description: "Code Security Auditor",
          capabilities: [
            "Vulnerability Scan",
            "Dependency Check",
            "Auth Security",
            "Penetration Testing",
          ],
        },
      ],
    },
    {
      category: "Data & Research Intelligence",
      icon: FaSearch,
      color: "from-orange-500 to-red-500",
      assistants: [
        {
          name: "HydraSearch",
          description: "Deep Research AI & Insight Synthesis",
          capabilities: [
            "Real-time Indexing",
            "Source Verification",
            "Data Synthesis",
            "Trend Analysis",
          ],
        },
        {
          name: "PhantomScrape",
          description: "Advanced Web Scraper",
          capabilities: [
            "DOM Parsing",
            "Headless Browsing",
            "Data Extraction",
            "Anti-bot Evasion",
          ],
        },
        {
          name: "IronQuery",
          description: "Database Expert",
          capabilities: [
            "SQL/NoSQL",
            "Schema Design",
            "Query Optimization",
            "Data Migration",
          ],
        },
        {
          name: "ViperCart",
          description: "Amazon Product Finder",
          capabilities: [
            "E-commerce Analysis",
            "Price Tracking",
            "Product Comparison",
            "Review Sentiment",
          ],
        },
      ],
    },
    {
      category: "Creative & Media",
      icon: FaPalette,
      color: "from-purple-500 to-pink-500",
      assistants: [
        {
          name: "AetherVision",
          description: "Image Generation & Visual Intelligence",
          capabilities: [
            "Flux Generation",
            "Image Editing",
            "Visual Analysis",
            "Style Transfer",
          ],
        },
        {
          name: "SonicWave",
          description: "Audio Generation & TTS",
          capabilities: [
            "Text-to-Speech",
            "Audio Synthesis",
            "Voice Cloning",
            "Sound Effects",
          ],
        },
      ],
    },
    {
      category: "Operations & Orchestration",
      icon: FaNetworkWired,
      color: "from-green-500 to-emerald-500",
      assistants: [
        {
          name: "NovaFlow",
          description: "Project Architect & Planner",
          capabilities: [
            "Task Decomposition",
            "Workflow Planning",
            "Resource Allocation",
            "Milestone Tracking",
          ],
        },
        {
          name: "Chronos",
          description: "Real-time Weather & Time Agent",
          capabilities: [
            "Global Time Sync",
            "Weather Forecasting",
            "Location Services",
            "Event Scheduling",
          ],
        },
        {
          name: "Blackfire Nexus",
          description: "AI/ML Specialist",
          capabilities: [
            "Model Fine-tuning",
            "Tensor Ops",
            "Neural Architecture",
            "Data Preprocessing",
          ],
        },
        {
          name: "ScriptForge",
          description: "Document Automation AI",
          capabilities: [
            "Report Generation",
            "Contract Analysis",
            "Template Automation",
            "Format Conversion",
          ],
        },
      ],
    },
  ];

  const sidebarLinks = [
    { id: "overview", label: "About Varon AI", icon: FiBook },
    { id: "cognitive", label: "Cognitive System", icon: FaMicrochip },
    { id: "assistants", label: "Specialist Team", icon: FiUsers },
    { id: "architecture", label: "Architecture", icon: FaNetworkWired },
    { id: "installation", label: "Installation", icon: FaTerminal },
    { id: "roadmap", label: "Roadmap", icon: FiBarChart },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <LandingHeader />

      <div className="container mx-auto px-4 sm:px-6 py-8 pt-28">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`w-full p-4 rounded-xl flex items-center justify-between border ${
                isDarkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <span className="font-semibold">Menu</span>
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          <aside
            className={`lg:w-72 shrink-0 ${
              isMobileMenuOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div
              className={`sticky top-28 rounded-2xl p-6 border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-900/80 border-gray-800 backdrop-blur-xl"
                  : "bg-white/80 border-gray-200 backdrop-blur-xl"
              }`}
            >
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <FiBook className="text-emerald-500" /> Documentation
              </h3>
              <nav className="space-y-1">
                {sidebarLinks.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isDarkMode
                        ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="text-lg" />
                    {item.label}
                  </a>
                ))}
              </nav>

              <div
                className={`mt-8 p-4 rounded-xl border ${
                  isDarkMode
                    ? "bg-gray-800/50 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-500">
                    SYSTEM OPERATIONAL
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Version</span>
                    <span className={isDarkMode ? "text-white" : "text-black"}>
                      v2.4.0 (Beta)
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Agents Online</span>
                    <span className={isDarkMode ? "text-white" : "text-black"}>
                      15 Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <section id="overview" className="mb-16 scroll-mt-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-wrap gap-2 mb-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      isDarkMode
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-blue-50 text-blue-600 border-blue-200"
                    }`}
                  >
                    MIT License
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      isDarkMode
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        : "bg-purple-50 text-purple-600 border-purple-200"
                    }`}
                  >
                    Multi-Agent System
                  </span>
                </div>

                <h1
                  className={`text-4xl md:text-5xl font-bold mb-6 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Varon AI{" "}
                  <span className="text-emerald-500">Intelligence Engine</span>
                </h1>

                <p
                  className={`text-xl leading-relaxed mb-8 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Varon AI is a next-generation{" "}
                  <strong className="text-emerald-500">
                    Unified Multi-Agent AI Ecosystem
                  </strong>
                  , engineered inside the Vortex Intelligence Labs (VIL) by
                  Harsh Pandey. It is a high-precision cognitive operating
                  system capable of coding, research, scraping, and automation.
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                  <a
                    href="https://varonai.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                  >
                    <FiGlobe /> View Live Demo
                  </a>
                  <a
                    href="https://github.com/201Harsh/Varon-AI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border transition-colors ${
                      isDarkMode
                        ? "border-gray-700 hover:bg-gray-800 text-white"
                        : "border-gray-300 hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    <FaGithub /> GitHub Repository
                  </a>
                </div>

                <div
                  className={`p-6 rounded-xl border-l-4 border-emerald-500 ${
                    isDarkMode ? "bg-gray-900" : "bg-white shadow-xs"
                  }`}
                >
                  <p className="italic text-lg">
                    "Varon isn’t just an AI. It is a high-precision cognitive
                    operating system built for real-world execution. Give
                    real-world power to artificial intelligence."
                  </p>
                </div>
              </motion.div>
            </section>

            <section id="cognitive" className="mb-16 scroll-mt-28">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <FaMicrochip className="text-emerald-500" />
                Cognitive System Framework
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "V-JAXX Engine",
                    desc: "Varon Joint Accelerated eXecution Xenocode Engine. The neural computation core powering reasoning and load balancing.",
                    icon: FiCpu,
                  },
                  {
                    title: "V-Core Compute Pods",
                    desc: "Dedicated ultra-bandwidth compute clusters. Each internal agent gets its own compute lane for parallel execution.",
                    icon: FaLayerGroup,
                  },
                  {
                    title: "V-Flux Matrix",
                    desc: "Connects every specialized assistant into a unified cognitive stream allowing seamless agent-to-agent communication.",
                    icon: FaNetworkWired,
                  },
                  {
                    title: "V-Path Commanding",
                    desc: "The intelligence protocol: Understand intent → Route to expert → Decompose task → Validate output.",
                    icon: FaCog,
                  },
                  {
                    title: "Transformer-X",
                    desc: "Multi-modal reasoning system featuring cross-modal token fusion and Mixture of Modular Experts (MoX).",
                    icon: FiZap,
                  },
                  {
                    title: "V-Check Kernel",
                    desc: "Integrity validation system that checks accuracy and consistency to protect against hallucinations.",
                    icon: FaShieldAlt,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl border transition-all duration-300 hover:border-emerald-500/50 ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-800"
                        : "bg-white border-gray-200 hover:shadow-md"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                      <item.icon className="text-2xl text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section id="assistants" className="mb-16 scroll-mt-28">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Specialist AI Team</h2>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    isDarkMode
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  15+ Agents Active
                </span>
              </div>

              <div className="space-y-4">
                {aiAssistants.map((category) => (
                  <div
                    key={category.category}
                    className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-800"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => toggleCategory(category.category)}
                      className={`w-full p-6 flex items-center justify-between text-left transition-colors ${
                        isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg bg-linear-to-br ${category.color} flex items-center justify-center shadow-lg`}
                        >
                          <category.icon className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">
                            {category.category}
                          </h3>
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {category.assistants.length} Specialized Agents
                          </p>
                        </div>
                      </div>
                      {expandedCategory === category.category ? (
                        <FiChevronUp className="text-gray-400 text-xl" />
                      ) : (
                        <FiChevronDown className="text-gray-400 text-xl" />
                      )}
                    </button>

                    {expandedCategory === category.category && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={`border-t ${
                          isDarkMode ? "border-gray-800" : "border-gray-100"
                        }`}
                      >
                        <div className="p-6 grid gap-4 md:grid-cols-2">
                          {category.assistants.map((agent, idx) => (
                            <div
                              key={idx}
                              className={`p-4 rounded-xl border ${
                                isDarkMode
                                  ? "bg-gray-950/50 border-gray-800"
                                  : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-emerald-500">
                                  {agent.name}
                                </h4>
                              </div>
                              <p
                                className={`text-sm mb-3 ${
                                  isDarkMode ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {agent.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {agent.capabilities.map((cap, cIdx) => (
                                  <span
                                    key={cIdx}
                                    className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-sm ${
                                      isDarkMode
                                        ? "bg-gray-800 text-gray-400"
                                        : "bg-gray-200 text-gray-600"
                                    }`}
                                  >
                                    {cap}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section id="architecture" className="mb-16 scroll-mt-28">
              <h2 className="text-3xl font-bold mb-6">System Architecture</h2>
              <div
                className={`overflow-hidden rounded-2xl border ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead
                      className={`${
                        isDarkMode ? "bg-gray-800" : "bg-gray-50"
                      } text-xs uppercase font-semibold`}
                    >
                      <tr>
                        <th className="p-4">Layer</th>
                        <th className="p-4">Technology / Component</th>
                      </tr>
                    </thead>
                    <tbody
                      className={`divide-y ${
                        isDarkMode ? "divide-gray-800" : "divide-gray-200"
                      }`}
                    >
                      <tr>
                        <td className="p-4 font-medium">Frontend</td>
                        <td className="p-4 opacity-80">
                          Next.js 15+, Tailwind CSS, Framer Motion
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">Backend</td>
                        <td className="p-4 opacity-80">
                          Node.js, Express.js, Next.js API Routes
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">Database</td>
                        <td className="p-4 opacity-80">
                          MongoDB (Memory, Logs, Agent States)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">AI Engine</td>
                        <td className="p-4 opacity-80">
                          Gemini API + Custom Multi-Agent Runtime
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">Protocol</td>
                        <td className="p-4 opacity-80">
                          MCP (Model Context Protocol)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">Execution</td>
                        <td className="p-4 opacity-80">
                          V-Serve Streaming Engine
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section id="installation" className="mb-16 scroll-mt-28">
              <h2 className="text-3xl font-bold mb-6">Installation & Setup</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Prerequisites</h3>
                  <ul className="list-disc pl-5 space-y-1 opacity-80">
                    <li>Node.js 18+</li>
                    <li>MongoDB Instance</li>
                    <li>Gemini API Key</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Clone & Install
                  </h3>
                  <div
                    className={`rounded-xl p-4 font-mono text-sm overflow-x-auto ${
                      isDarkMode
                        ? "bg-black border border-gray-800 text-green-400"
                        : "bg-gray-900 text-green-400"
                    }`}
                  >
                    <div className="flex gap-2 mb-2 opacity-50">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <p>git clone https://github.com/201Harsh/RAVX-OS</p>
                    <p>cd varon-ai</p>
                    <p>npm install</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Environment</h3>
                  <div
                    className={`rounded-xl p-4 font-mono text-sm overflow-x-auto border ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-800"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <p className="text-blue-500"># .env.local</p>
                    <p>MONGODB_URI=your_mongodb_string</p>
                    <p>GEMINI_API_KEY=your_key</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="roadmap" className="mb-20 scroll-mt-28">
              <h2 className="text-3xl font-bold mb-6">Future Roadmap</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    status: "In Development",
                    task: "Multi-Agent Collaboration Mode",
                    color: "bg-yellow-500",
                  },
                  {
                    status: "In Development",
                    task: "Full Voice Mode Integration",
                    color: "bg-yellow-500",
                  },
                  {
                    status: "Concept",
                    task: "Native Desktop Client",
                    color: "bg-purple-500",
                  },
                  {
                    status: "Planned",
                    task: "External Plugin System",
                    color: "bg-blue-500",
                  },
                  {
                    status: "Coming Soon",
                    task: "Autonomous Task Mode",
                    color: "bg-emerald-500",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-4 rounded-xl border ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-800"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full shrink-0 ${item.color}`}
                    ></span>
                    <div>
                      <h4 className="font-medium">{item.task}</h4>
                      <p className="text-xs opacity-60">{item.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <footer
              className={`border-t pt-8 pb-4 text-center ${
                isDarkMode ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <div className="flex justify-center gap-6 mb-6">
                <a
                  href="https://github.com/201Harsh"
                  className="opacity-70 hover:opacity-100 hover:text-emerald-500 transition-all"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="opacity-70 hover:opacity-100 hover:text-emerald-500 transition-all"
                >
                  <FiGlobe className="text-2xl" />
                </a>
              </div>
              <p className="opacity-60 text-sm">
                © {new Date().getFullYear()} Harsh Pandey • Vortex Intelligence
                Labs
              </p>
              <p className="opacity-40 text-xs mt-2">
                MIT License • Built with ❤️ by 201Harsh
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
