import { motion } from "framer-motion";
import { FaTeamspeak } from "react-icons/fa";
import { FiZap, FiArrowRight } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

const VaronConnectionSection = ({
  isDarkMode,
  simulateConnection,
}: {
  isDarkMode: boolean;
  simulateConnection: () => void;
}) => {
  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8"
      >
        <div
          className={`w-32 h-32 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
            isDarkMode
              ? "bg-linear-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
              : "bg-linear-to-r from-emerald-500/15 to-teal-500/10 border border-emerald-500/30"
          }`}
        >
          <Image
            width={100}
            height={100}
            src="/img/logo.png"
            alt="logo"
            priority
            className="w-full h-full pointer-events-none"
          />
        </div>
        <h2 className="text-3xl font-bold mb-4">
          Welcome to{" "}
          <span
            className={`transition-colors duration-300 ${
              isDarkMode
                ? "bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                : "bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
            }`}
          >
            Varon AI
          </span>
        </h2>
        <p
          className={`text-lg mb-8 transition-colors duration-300 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Your intelligent AI coordinator that manages multiple specialist
          assistants
        </p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={simulateConnection}
        className={`px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-3 mx-auto ${
          isDarkMode
            ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-xl hover:shadow-emerald-500/25"
            : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-xl hover:shadow-emerald-400/25"
        }`}
      >
        Connect to Varon AI <FiArrowRight />
      </motion.button>

      <div
        className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 transition-colors duration-300 ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {[
          {
            icon: FaTeamspeak,
            title: "AI Coordination",
            description: "Intelligent task delegation to specialist AIs",
          },
          {
            icon: FiZap,
            title: "Real-time Processing",
            description: "Simultaneous execution across multiple experts",
          },
          {
            icon: FaCheckCircle,
            title: "Quality Assurance",
            description: "Verified results from coordinated AI teamwork",
          },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`p-6 rounded-xl border transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-800/50 border-emerald-500/20"
                : "bg-white border-emerald-500/30"
            }`}
          >
            <feature.icon className="text-2xl text-emerald-500 mb-3" />
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VaronConnectionSection;
