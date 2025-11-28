import { motion } from "framer-motion";
import Image from "next/image";
import { FaTeamspeak, FaBrain } from "react-icons/fa";
import { FiCpu, FiZap, FiShield } from "react-icons/fi";

const ConnectionAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const floatingOrbs = [
    {
      icon: FiCpu,
      delay: 0,
      size: "w-6 h-6",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FiZap,
      delay: 0.2,
      size: "w-5 h-5",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FaBrain,
      delay: 0.4,
      size: "w-7 h-7",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: FiShield,
      delay: 0.6,
      size: "w-6 h-6",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const connectionSteps = [
    "Authenticating with AI network...",
    "Initializing neural processors...",
    "Synchronizing specialist modules...",
    "Establishing secure connection...",
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 h-[calc(100vh-80px)]">
      {/* Main Orb with Holographic Effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative mb-12"
      >
        {/* Outer Glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-linear-to-r from-emerald-400/30 to-teal-400/30 blur-xl"
        />

        {/* Main Orb Container */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 0 0 rgba(16, 185, 129, 0.1)",
              "0 0 0 20px rgba(16, 185, 129, 0.1)",
              "0 0 0 40px rgba(16, 185, 129, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className={`relative w-32 h-32 rounded-full flex items-center justify-center ${
            isDarkMode
              ? "bg-linear-to-br from-black via-emerald-900/50 to-teal-900/50 border border-emerald-500/40"
              : "bg-linear-to-br from-white via-emerald-50 to-teal-50 border border-emerald-400/60"
          } backdrop-blur-sm`}
        >
          {/* Animated Grid Pattern */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(45, 212, 191, 0.4) 0%, transparent 50%),
                conic-gradient(from 0deg, transparent 0deg 90deg, rgba(16, 185, 129, 0.1) 90deg 180deg, transparent 180deg 270deg, rgba(45, 212, 191, 0.1) 270deg)
              `,
            }}
          />

          {/* Central Icon with Pulse */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10 p-2"
          >
            <Image
              width={100}
              height={100}
              src="/img/logo.png"
              alt="Varon AI"
              className="w-full h-full"
            />
          </motion.div>

          {/* Inner Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-emerald-400/30 border-dashed"
          />
        </motion.div>

        {/* Floating Specialist Orbs */}
        {floatingOrbs.map((orb, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 + orb.delay, type: "spring" }}
            className={`absolute ${orb.size} rounded-full bg-linear-to-r ${orb.color} flex items-center justify-center shadow-lg`}
            style={{
              top: `${Math.sin((index * Math.PI) / 2) * 80 + 50}%`,
              left: `${Math.cos((index * Math.PI) / 2) * 80 + 50}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: orb.delay,
              }}
            >
              <orb.icon className="text-white text-xs" />
            </motion.div>

            {/* Connection Lines */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2 + orb.delay, duration: 0.8 }}
              className="absolute w-20 h-0.5 bg-linear-to-r from-transparent via-emerald-400/50 to-transparent origin-left"
              style={{
                transform: `rotate(${(index * 360) / floatingOrbs.length}deg)`,
                left: "100%",
              }}
            />
          </motion.div>
        ))}

        {/* Pulsing Rings */}
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: ring * 1,
              ease: "easeOut",
            }}
            className={`absolute inset-0 rounded-full border-2 ${
              isDarkMode ? "border-emerald-400/20" : "border-emerald-400/30"
            }`}
          />
        ))}
      </motion.div>

      {/* Animated Connection Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-4"
      >
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-2xl font-bold bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
        >
          Initializing Varon AI Matrix
        </motion.h3>

        <div className="space-y-2">
          {connectionSteps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.3 }}
              className="flex items-center justify-center gap-3"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  backgroundColor: ["#10b981", "#34d399", "#10b981"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
                className="w-2 h-2 rounded-full"
              />
              <motion.p
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {step}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "300px" }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className={`mt-8 h-1 rounded-full ${
          isDarkMode ? "bg-gray-700" : "bg-gray-200"
        } overflow-hidden`}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.8, duration: 2.5, ease: "easeInOut" }}
          className="h-full bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 origin-left"
        />
      </motion.div>

      {/* Network Activity Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-8 flex gap-1"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`w-1 h-6 rounded-full ${
              isDarkMode ? "bg-emerald-400" : "bg-emerald-500"
            }`}
            animate={{
              scaleY: [1, 2, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Status Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="mt-6 text-center"
      >
        <motion.p
          animate={{
            backgroundPosition: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="text-sm font-semibold bg-linear-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent bg-size-[200%_auto]"
        >
          • SYNCING WITH VARON AI •
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ConnectionAnimation;
