import { motion } from "framer-motion";
import { FiArrowRight, FiSun, FiMoon } from "react-icons/fi";
import Image from "next/image";
const VaronHeader = ({
  isConnected,
  isConnecting,
  simulateConnection,
  toggleTheme,
  isDarkMode,
}: {
  isConnected: boolean;
  isConnecting: boolean;
  isDarkMode: boolean;
  simulateConnection: () => void;
  toggleTheme: () => void;
}) => {
  return (
    <header
      className={`border-b transition-colors duration-300 fixed z-50 top-0 left-0 right-0 ${
        isDarkMode
          ? "bg-gray-900 border-emerald-500/20"
          : "bg-white border-emerald-500/30"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                isDarkMode
                  ? "bg-linear-to-r from-emerald-950 via-teal-950 to-black/30"
                  : "bg-linear-to-r from-black to-black"
              }`}
            >
              <Image
                width={100}
                height={100}
                src="/img/logo.png"
                alt="Varon AI"
                className="w-6 h-6"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Varon AI</h1>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? "bg-emerald-500" : "bg-gray-500"
                  }`}
                />
                <span
                  className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "bg-gray-800 text-yellow-400"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </motion.button>

            {!isConnected && !isConnecting && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={simulateConnection}
                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                    : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-lg hover:shadow-emerald-400/25"
                }`}
              >
                Connect to AI <FiArrowRight />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default VaronHeader;
