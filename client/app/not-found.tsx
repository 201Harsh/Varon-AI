"use client";
import { motion } from "framer-motion";
import { FiHome, FiAlertTriangle, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "./theme/ThemeToogle";

const Varon404Page = () => {
  const { isDarkMode } = useTheme();  
  const router = useRouter();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-sans transition-colors duration-500 ${
        isDarkMode
          ? "bg-black text-white selection:bg-emerald-500/30"
          : "bg-white text-gray-900 selection:bg-emerald-500/20"
      }`}
    >
      {/* --- Background Ambient Effects --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse ${
            isDarkMode ? "bg-emerald-500/10" : "bg-emerald-500/5"
          }`}
        />
        <div
          className={`absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] animate-pulse delay-700 ${
            isDarkMode ? "bg-teal-500/10" : "bg-teal-500/5"
          }`}
        />

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-linears.vercel.app/noise.svg')] opacity-5"></div>
        <div
          className={`absolute inset-0 bg-[size:24px_24px] ${
            isDarkMode
              ? "bg-[linear-linear(to_right,#80808012_1px,transparent_1px),linear-linear(to_bottom,#80808012_1px,transparent_1px)]"
              : "bg-[linear-linear(to_right,#00000008_1px,transparent_1px),linear-linear(to_bottom,#00000008_1px,transparent_1px)]"
          }`}
        ></div>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Glitchy 404 Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative inline-block mb-8"
        >
          <h1
            className={`text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-transparent bg-clip-text select-none opacity-10 absolute top-0 left-0 w-full text-center transform scale-110 blur-sm ${
              isDarkMode
                ? "bg-linear-to-b from-gray-700 to-black"
                : "bg-linear-to-b from-gray-300 to-white"
            }`}
          >
            404
          </h1>
          <h1
            className={`text-[100px] md:text-[150px] font-black leading-none tracking-tighter text-transparent bg-clip-text drop-shadow-2xl ${
              isDarkMode
                ? "bg-linear-to-br from-emerald-400 via-teal-300 to-emerald-600 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                : "bg-linear-to-br from-emerald-600 via-teal-500 to-emerald-800"
            }`}
          >
            404
          </h1>

          {/* Scanning Line Animation */}
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className={`absolute left-0 right-0 h-[2px] shadow-[0_0_20px_rgba(52,211,153,0.8)] z-20 ${
              isDarkMode ? "bg-emerald-400/50" : "bg-emerald-600/30"
            }`}
          />
        </motion.div>

        {/* Status Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-mono text-xs md:text-sm mb-4 ${
              isDarkMode
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-red-500/20 bg-red-50 text-red-600"
            }`}
          >
            <FiAlertTriangle className="animate-pulse" />
            <span>ERROR: NAVIGATION_VECTOR_LOST</span>
          </div>

          <h2
            className={`text-3xl md:text-4xl font-bold font-mono bg-clip-text text-transparent ${
              isDarkMode
                ? "bg-linear-to-r from-white to-gray-400"
                : "bg-linear-to-r from-gray-900 to-gray-600"
            }`}
          >
            Page Not Found
          </h2>

          <p
            className={`text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-mono ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Varon AI initiated a full-spectrum scan of the neural network, but the requested coordinates returned a blank signal. The Page may have been archived, deleted, or never existed in this timeline.
          </p>

          {/* Animated AI Thinking Logs */}
          <div
            className={`rounded-xl p-4 max-w-md mx-auto mt-8 font-mono text-xs text-left overflow-hidden relative group border transition-colors ${
              isDarkMode
                ? "bg-[#111] border-gray-800"
                : "bg-white border-gray-200 shadow-lg"
            }`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-emerald-500 to-transparent opacity-20 group-hover:opacity-50 transition-opacity"></div>
            <div className={`space-y-2 ${isDarkMode ? "opacity-70" : "opacity-80"}`}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2"
              >
                <span className="text-emerald-500">➜</span>
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  Initializing PhantomScrape protocol...
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="flex items-center gap-2"
              >
                <span className="text-emerald-500">➜</span>
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  Scanning Page 7G... <span className="text-red-500">[FAILED]</span>
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.0 }}
                className="flex items-center gap-2"
              >
                <span className="text-emerald-500">➜</span>
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  Rerouting via HydraSearch...
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.0 }}
                className="flex items-center gap-2"
              >
                <span className="text-blue-500">ℹ</span>
                <span
                  className={`${
                    isDarkMode ? "text-emerald-300" : "text-emerald-700"
                  } typing-cursor`}
                >
                  Awaiting manual override.
                </span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-1.5 h-3 bg-emerald-500 inline-block align-middle"
                />
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-full font-bold text-sm md:text-base flex items-center gap-2 transition-all shadow-lg ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/20"
                    : "bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-500/20"
                }`}
              >
                <FiHome className="text-lg" />
                Return to Command Center
              </motion.button>
            </Link>

            <motion.button
              onClick={() => router.back()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-full border font-medium text-sm md:text-base flex items-center gap-2 transition-all backdrop-blur-sm ${
                isDarkMode
                  ? "border-gray-700 bg-black/50 hover:bg-gray-900 text-gray-300 hover:text-white"
                  : "border-gray-300 bg-white/50 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
            >
              <FiArrowLeft className="text-lg" />
              Back to Previous Page
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* --- Footer Decoration --- */}
      <div className="absolute bottom-10 left-0 right-0 text-center opacity-30">
        <div className="flex justify-center gap-4 mb-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-8 bg-emerald-500/50 rounded-full"
              animate={{ height: ["10px", "32px", "10px"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <p className={`text-[10px] font-mono tracking-widest uppercase ${isDarkMode ? "text-emerald-500/60" : "text-emerald-700/60"}`}>
          System Status: Operational // Neural Link Active
        </p>
      </div>
    </div>
  );
};

export default Varon404Page;