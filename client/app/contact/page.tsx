"use client";

import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaPaperPlane,
  FaRobot,
} from "react-icons/fa";
import {
  FiUser,
  FiMail,
  FiMessageSquare,
  FiSend,
  FiClock,
  FiGlobe,
} from "react-icons/fi";
import { useTheme } from "../theme/ThemeToogle";
import LandingHeader from "../Components/Landing-Comps/LandingHeader";
import LandingFooter from "../Components/Landing-Comps/LandingFooter";

export default function ContactPage() {
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
              ? "bg-linear-to-r from-emerald-500/10 to-teal-500/10"
              : "bg-linear-to-r from-emerald-500/5 to-teal-500/5"
          }`}
        ></div>

        <LandingHeader />

        <div className="container mx-auto px-6 relative z-10 mt-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p
              className={`text-xl md:text-2xl mb-8 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Let's discuss how Varon AI can transform your workflow
            </p>
            <p
              className={`text-lg max-w-3xl mx-auto transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Have questions about Varon AI? Interested in partnership
              opportunities? We'd love to hear from you and explore how our
              intelligent AI coordination system can benefit your projects.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Contact Content */}
      <div className="container mx-auto px-6 pb-20 mt-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`rounded-2xl p-8 border transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h2
              className={`text-2xl md:text-3xl font-bold mb-6 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Send us a Message
            </h2>
            <p
              className={`mb-8 transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <FiUser
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <input
                      type="text"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      }`}
                      placeholder="Enter your first name"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <FiUser
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <input
                      type="text"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      }`}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <FiMail
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <input
                    type="email"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Subject
                </label>
                <div className="relative">
                  <FiMessageSquare
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <input
                    type="text"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    }`}
                    placeholder="What's this about?"
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Message
                </label>
                <textarea
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  }`}
                  placeholder="Tell us about your project or inquiry..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                    : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-lg hover:shadow-emerald-400/25 text-white"
                }`}
              >
                <FiSend className="text-xl" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
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
                Contact Information
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: FaEnvelope,
                    title: "Email Us",
                    content: "hello@varonai.com",
                    description: "Send us an email anytime",
                    link: "mailto:hello@varonai.com",
                  },
                  {
                    icon: FaPhone,
                    title: "Call Us",
                    content: "+1 (555) 123-4567",
                    description: "Mon to Fri, 9am to 6pm",
                    link: "tel:+15551234567",
                  },
                  {
                    icon: FaMapMarkerAlt,
                    title: "Visit Us",
                    content: "San Francisco, CA",
                    description: "Let's meet in person",
                    link: "#",
                  },
                  {
                    icon: FiGlobe,
                    title: "Website",
                    content: "www.varonai.com",
                    description: "Visit our main website",
                    link: "https://www.varonai.com",
                  },
                ].map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.link}
                    whileHover={{ x: 5 }}
                    className={`flex items-start gap-4 p-4 rounded-xl transition-colors duration-300 group ${
                      isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30"
                          : "bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500/20"
                      }`}
                    >
                      <contact.icon className="text-xl" />
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-semibold mb-1 transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {contact.title}
                      </h4>
                      <p
                        className={`font-medium mb-1 transition-colors duration-300 ${
                          isDarkMode ? "text-emerald-400" : "text-emerald-600"
                        }`}
                      >
                        {contact.content}
                      </p>
                      <p
                        className={`text-sm transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {contact.description}
                      </p>
                    </div>
                    <FaPaperPlane
                      className={`text-lg transition-colors duration-300 ${
                        isDarkMode
                          ? "text-gray-500 group-hover:text-emerald-400"
                          : "text-gray-400 group-hover:text-emerald-500"
                      }`}
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div
              className={`rounded-2xl p-8 border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-linear-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20"
                  : "bg-linear-to-r from-emerald-500/5 to-teal-500/5 border-emerald-500/20"
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDarkMode ? "bg-emerald-500/20" : "bg-emerald-500/10"
                  }`}
                >
                  <FiClock className="text-xl text-emerald-500" />
                </div>
                <div>
                  <h4
                    className={`font-bold text-lg transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Quick Response Time
                  </h4>
                  <p
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    We typically reply within 2-4 hours
                  </p>
                </div>
              </div>
              <div
                className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Our team is dedicated to providing prompt and helpful responses
                to all inquiries. For urgent matters, please call us directly.
              </div>
            </div>

            {/* Social Links */}
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
                Follow Us
              </h3>
              <p
                className={`mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Stay updated with the latest news and announcements from Varon
                AI.
              </p>
              <div className="flex gap-4">
                {[
                  {
                    icon: FaTwitter,
                    href: "#",
                    label: "Twitter",
                    color: "hover:bg-blue-500/20 hover:text-blue-400",
                  },
                  {
                    icon: FaLinkedin,
                    href: "#",
                    label: "LinkedIn",
                    color: "hover:bg-blue-600/20 hover:text-blue-500",
                  },
                  {
                    icon: FaGithub,
                    href: "#",
                    label: "GitHub",
                    color: "hover:bg-gray-500/20 hover:text-gray-400",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isDarkMode
                        ? `bg-gray-700 text-gray-400 ${social.color}`
                        : `bg-gray-100 text-gray-600 ${social.color.replace(
                            "hover:text-",
                            "hover:text-"
                          )}`
                    }`}
                    aria-label={social.label}
                  >
                    <social.icon className="text-xl" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Frequently Asked Questions
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Quick answers to common questions about Varon AI
            </p>
          </div>

          <div
            className={`rounded-2xl p-8 border transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question:
                    "How does Varon AI coordinate multiple AI assistants?",
                  answer:
                    "Varon acts as an intelligent manager that analyzes your request and delegates tasks to specialized AI assistants based on their domain expertise.",
                },
                {
                  question:
                    "What makes Varon AI different from other AI tools?",
                  answer:
                    "Unlike single AI systems, Varon coordinates a team of specialized AIs, ensuring each task is handled by the most qualified expert for superior results.",
                },
                {
                  question:
                    "Can I integrate Varon AI with my existing workflow?",
                  answer:
                    "Yes, Varon AI offers API integration and can be customized to work with your current tools and processes seamlessly.",
                },
                {
                  question: "What kind of support do you provide?",
                  answer:
                    "We offer comprehensive support including documentation, API references, and direct technical support for all our clients.",
                },
              ].map((faq, index) => (
                <div key={index} className="space-y-3">
                  <h4
                    className={`font-semibold text-lg transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {faq.question}
                  </h4>
                  <p
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <LandingFooter />
    </div>
  );
}
