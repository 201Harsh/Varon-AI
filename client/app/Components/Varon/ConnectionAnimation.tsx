import { motion } from "framer-motion";
import { FaTeamspeak } from "react-icons/fa";

const ConnectionAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative mb-8"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`w-24 h-24 rounded-full flex items-center justify-center ${
            isDarkMode
              ? "bg-linear-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
              : "bg-linear-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
          }`}
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaTeamspeak className="text-3xl text-emerald-500" />
          </motion.div>
        </motion.div>

        {/* Orbiting dots */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${
              isDarkMode ? "bg-emerald-400" : "bg-emerald-500"
            }`}
            animate={{
              x: [0, 40 * Math.cos((i * 2 * Math.PI) / 3), 0],
              y: [0, 40 * Math.sin((i * 2 * Math.PI) / 3), 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <h3 className="text-xl font-semibold mb-2 text-emerald-500">
          Connecting to Varon AI Network...
        </h3>
        <p
          className={`transition-colors duration-300 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Initializing specialist AI coordination system
        </p>
      </motion.div>

      <motion.div
        className="mt-6 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full ${
              isDarkMode ? "bg-emerald-400" : "bg-emerald-500"
            }`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ConnectionAnimation;
