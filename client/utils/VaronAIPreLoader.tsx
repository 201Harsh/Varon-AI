"use client";

import { useTheme } from "@/app/theme/ThemeToogle";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const VaronPreLoader = ({
  onLoadingComplete,
}: {
  onLoadingComplete: () => void;
}) => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const progress = useMotionValue(0);
  const scale = useTransform(progress, [0, 100], [0.8, 1]);
  const opacity = useTransform(progress, [0, 100], [0.5, 1]);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    let mounted = true;

    const startAnimation = () => {
      if (!mounted) return;

      // Smooth progress animation
      animate(progress, 100, {
        duration: 2.5,
        ease: [0.25, 0.1, 0.25, 1], // Smooth ease-out
        onUpdate: (latest) => {
          if (!mounted) return;
        },
        onComplete: () => {
          if (!mounted) return;

          // Fade out and complete
          setIsVisible(false);
          setTimeout(() => {
            if (mounted) {
              onLoadingComplete();
            }
          }, 500);
        },
      });
    };

    // Start animation after mount
    const timer = setTimeout(startAnimation, 100);

    return () => {
      mounted = false;
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [progress, onLoadingComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isDarkMode
          ? "bg-linear-to-br from-gray-900 via-black to-gray-900"
          : "bg-linear-to-br from-white via-gray-50 to-white"
      }`}
    >
      <div className="relative">
        {/* Main Logo Container */}
        <motion.div style={{ scale, opacity }} className="relative">
          {/* Outer Glow - Optimized with CSS only */}
          <div
            className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-1000 ${
              isDarkMode
                ? "bg-linear-to-r from-emerald-500/20 to-teal-500/20"
                : "bg-linear-to-r from-emerald-400/30 to-teal-400/30"
            }`}
          />

          {/* Main Orb */}
          <div
            className={`relative w-20 h-20 rounded-full border-2 backdrop-blur-sm ${
              isDarkMode
                ? "bg-linear-to-br from-gray-800 to-gray-900 border-emerald-500/40"
                : "bg-linear-to-br from-white to-gray-100 border-emerald-400/60"
            } shadow-2xl flex items-center justify-center`}
          >
            {/* Animated SVG Logo - More performant than icon library */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              className="transition-colors duration-300"
            >
              <defs>
                <linearGradient
                  id="logolinear"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
              </defs>
              <motion.path
                d="M16 4 L20 8 L28 4 L24 12 L32 16 L24 20 L28 28 L20 24 L16 32 L12 24 L4 28 L8 20 L0 16 L8 12 L4 4 L12 8 Z"
                fill="url(#logolinear)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: 1,
                  rotate: [0, 360],
                }}
                transition={{
                  pathLength: { duration: 1.5, ease: "easeInOut" },
                  rotate: { duration: 4, ease: "linear", repeat: Infinity },
                  opacity: { duration: 1 },
                }}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Pulsing Dot */}
            <motion.div
              className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                isDarkMode ? "bg-emerald-400" : "bg-emerald-500"
              }`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Progress Indicator - Simple and efficient */}
        <div className="mt-8 text-center space-y-4">
          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <motion.h3
              className={`text-lg font-semibold transition-colors duration-300 ${
                isDarkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Varon AI
            </motion.h3>
            <motion.p
              className={`text-sm transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Initializing intelligence matrix...
            </motion.p>
          </motion.div>

          {/* Simple Progress Bar */}
          <div
            className={`w-48 h-1 rounded-full overflow-hidden mx-auto ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <motion.div
              className={`h-full ${
                isDarkMode
                  ? "bg-linear-to-r from-emerald-400 to-teal-400"
                  : "bg-linear-to-r from-emerald-500 to-teal-500"
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 2.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ originX: 0 }}
            />
          </div>

          {/* Minimal Loading Dots */}
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  isDarkMode ? "bg-emerald-400" : "bg-emerald-500"
                }`}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                  y: [0, -2, 0],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  },
                }}
              />
            ))}
          </div>
        </div>

        {/* Subtle Background Elements - CSS only for performance */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            isDarkMode
              ? "bg-[radial-linear(ellipse_at_center,var(--tw-linear-stops))] from-emerald-500/5 via-transparent to-transparent"
              : "bg-[radial-linear(ellipse_at_center,var(--tw-linear-stops))] from-emerald-400/10 via-transparent to-transparent"
          }`}
        />
      </div>
    </motion.div>
  );
};

export default VaronPreLoader;
