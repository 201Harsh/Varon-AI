import { motion } from "framer-motion";
import { FiArrowRight, FiActivity } from "react-icons/fi";
import Image from "next/image";

const VaronConnectionSection = ({
  isDarkMode,
  simulateConnection,
}: {
  isDarkMode: boolean;
  simulateConnection: () => void;
}) => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden p-10">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* LOGO SECTION with Pulse Effect */}
        <div className="relative w-40 h-40 mx-auto mb-8 group">
          <div
            className={`absolute inset-0 rounded-3xl blur-xl opacity-40 transition-all duration-500 ${
              isDarkMode ? "bg-emerald-500" : "bg-emerald-400"
            } group-hover:opacity-60 group-hover:scale-110`}
          />
          <div
            className={`relative w-full h-full rounded-3xl flex items-center justify-center transition-colors duration-300 backdrop-blur-sm border ${
              isDarkMode
                ? "bg-black/50 border-emerald-500/30"
                : "bg-black/25 border-emerald-500/40"
            }`}
          >
            <Image
              width={120}
              height={120}
              src="/img/logo.png"
              alt="Varon AI Logo"
              priority
              className="w-[80%] h-[80%] object-contain drop-shadow-lg"
            />
          </div>
          {/* Status Dot */}
          <div className="absolute -top-2 -right-2">
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-white dark:border-gray-900"></span>
            </span>
          </div>
        </div>

        {/* HEADINGS */}
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Welcome to{" "}
          <span
            className={`bg-clip-text text-transparent bg-linear-to-r ${
              isDarkMode
                ? "from-emerald-400 via-teal-400 to-green-400"
                : "from-emerald-600 via-teal-600 to-green-600"
            }`}
          >
            Varon AI
          </span>
        </h2>

        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Your intelligent central coordinator. Connect now to initialize the
          neural network of specialist assistants.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={simulateConnection}
          className={`group relative inline-flex items-center gap-4 px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl overflow-hidden cursor-pointer ${
            isDarkMode
              ? "bg-gray-900 text-white shadow-emerald-900/20 hover:shadow-emerald-500/30 ring-1 ring-emerald-500/50 hover:ring-emerald-400"
              : "bg-white text-gray-900 shadow-emerald-200/50 hover:shadow-emerald-400/30 ring-1 ring-emerald-200 hover:ring-emerald-400"
          }`}
        >
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-linear-to-r ${
              isDarkMode
                ? "from-emerald-400 to-cyan-400"
                : "from-emerald-500 to-cyan-500"
            }`}
          />

          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span>Connect to Varon AI</span>
          </div>

          <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default VaronConnectionSection;
