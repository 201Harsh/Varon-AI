import { useTheme } from "@/app/theme/ThemeToogle";
import {
  FaRobot,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaDiscord,
  FaRegEnvelope,
} from "react-icons/fa";
import { FiArrowUp, FiGlobe, FiShield, FiHeart } from "react-icons/fi";

const LandingFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { isDarkMode } = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer
        className={`border-t transition-colors duration-300 ${
          isDarkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"
        }`}
      >
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500"
                      : "bg-linear-to-r from-emerald-400 to-teal-400"
                  }`}
                >
                  <FaRobot className="text-xl" />
                </div>
                <div>
                  <span
                    className={`text-2xl font-bold transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                        : "bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                    }`}
                  >
                    Varon AI
                  </span>
                  <p
                    className={`text-sm mt-1 transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Boss-level AI Coordination
                  </p>
                </div>
              </div>

              <p
                className={`mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                The intelligent manager that leads your digital team of
                specialized AI assistants. Perfect results, every time.
              </p>

              <div className="flex space-x-4">
                {[
                  { icon: FaTwitter, href: "#", label: "Twitter" },
                  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
                  { icon: FaGithub, href: "#", label: "GitHub" },
                  { icon: FaDiscord, href: "#", label: "Discord" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400"
                        : "bg-gray-100 hover:bg-emerald-500/10 text-gray-600 hover:text-emerald-600"
                    }`}
                    aria-label={social.label}
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3
                className={`font-semibold text-lg mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Product
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Features", href: "#features" },
                  { name: "How It Works", href: "#how-it-works" },
                  { name: "AI Assistants", href: "#assistants" },
                  { name: "Use Cases", href: "#use-cases" },
                  { name: "Pricing", href: "#pricing" },
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`transition-colors duration-300 hover:text-emerald-500 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className={`font-semibold text-lg mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Resources
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Documentation", href: "#" },
                  { name: "API Reference", href: "#" },
                  { name: "Help Center", href: "#" },
                  { name: "Community", href: "#" },
                  { name: "Blog", href: "#" },
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`transition-colors duration-300 hover:text-emerald-500 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className={`font-semibold text-lg mb-6 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Company
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "About Us", href: "#" },
                  { name: "Careers", href: "#" },
                  { name: "Contact", href: "#" },
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Service", href: "#" },
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`transition-colors duration-300 hover:text-emerald-500 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`mt-12 pt-8 border-t transition-colors duration-300 ${
              isDarkMode ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3
                  className={`font-semibold text-lg mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Stay Updated
                </h3>
                <p
                  className={`transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Get the latest news and updates about Varon AI and AI
                  technology.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`px-4 py-3 rounded-lg border transition-colors duration-300 flex-1 min-w-[250px] ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500"
                  }`}
                />
                <button
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isDarkMode
                      ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                      : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-lg hover:shadow-emerald-400/25 text-white"
                  }`}
                >
                  <FaRegEnvelope className="text-lg" />
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`border-t py-6 transition-colors duration-300 ${
            isDarkMode
              ? "border-gray-800 bg-gray-900/50"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
                <div
                  className={`transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  © {currentYear} Varon AI. All rights reserved.
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href="#"
                    className={`transition-colors duration-300 hover:text-emerald-500 flex items-center gap-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <FiShield className="text-xs" />
                    Privacy
                  </a>
                  <a
                    href="#"
                    className={`transition-colors duration-300 hover:text-emerald-500 flex items-center gap-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <FiGlobe className="text-xs" />
                    Terms
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div
                  className={`flex items-center gap-1 text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Made with <FiHeart className="text-red-500" /> by{" "}
                  <a href="https://instagram.com/201Harshs">Harsh Pandey</a>
                </div>

                <button
                  onClick={scrollToTop}
                  className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400"
                      : "bg-gray-100 hover:bg-emerald-500/10 text-gray-600 hover:text-emerald-600"
                  }`}
                  aria-label="Scroll to top"
                >
                  <FiArrowUp className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingFooter;
