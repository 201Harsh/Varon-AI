import { FaRobot } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const LandingHeader = ({
  isDarkMode,
  toggleTheme,
  activeSection,
  scrollToSection,
  isMenuOpen,
  setIsMenuOpen,
}: any) => {
  return (
    <>
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
                animate={{ opacity: 1, height: "100%" }}
                exit={{ opacity: 0, height: 0 }}
                className={`md:hidden mt-4 min-h-screen space-y-4 pb-4 transition-colors duration-300 ${
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
    </>
  );
};

export default LandingHeader;
