"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FiLogIn, FiKey, FiArrowRight, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../theme/ThemeToogle";
import Link from "next/link";

export default function LoginPage() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Separate function for email/password login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Fake API call simulation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Email login attempted:", {
      email: formData.email,
      password: formData.password,
    });

    // Fake authentication logic
    if (formData.email && formData.password) {
      console.log("Login successful!");
      alert("Welcome back to Varon AI!");
      // Here you would typically redirect to dashboard
    } else {
      alert("Please fill in all fields");
    }

    setIsLoading(false);
  };

  // Separate function for Google authentication
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);

    // Fake Google auth simulation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Google authentication initiated");
    // Here you would typically redirect to Google OAuth
    alert("Google authentication would be implemented here.");

    setGoogleLoading(false);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="w-full max-w-md">
        {/* Theme Toggle Button */}
        <div className="absolute right-20 top-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
          >
            {isDarkMode ? (
              <FiSun className="text-lg" />
            ) : (
              <FiMoon className="text-lg" />
            )}
          </motion.button>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p
            className={`mt-2 transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Sign in to your Varon AI account
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={`rounded-2xl p-8 border transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200 shadow-xl"
          }`}
        >
          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className={`block text-sm font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => console.log("Forgot password clicked")}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isDarkMode
                      ? "text-emerald-400 hover:text-emerald-300"
                      : "text-emerald-600 hover:text-emerald-500"
                  }`}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <FaLock
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-300 hover:bg-gray-600"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-lg" />
                  ) : (
                    <FaEye className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className={`w-4 h-4 rounded transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-emerald-500 focus:ring-emerald-500/20"
                    : "bg-white border-gray-300 text-emerald-500 focus:ring-emerald-500/20"
                }`}
              />
              <label
                htmlFor="remember"
                className={`ml-2 text-sm transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Sign In Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              } ${
                isDarkMode
                  ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                  : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-lg hover:shadow-emerald-400/25 text-white"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <FiLogIn className="text-xl" />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div
              className={`flex-1 h-px transition-colors duration-300 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            ></div>
            <span
              className={`px-4 text-sm transition-colors duration-300 ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              or continue with
            </span>
            <div
              className={`flex-1 h-px transition-colors duration-300 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            ></div>
          </div>

          {/* Google Auth Button */}
          <motion.button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            whileHover={{ scale: googleLoading ? 1 : 1.02 }}
            whileTap={{ scale: googleLoading ? 1 : 0.98 }}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 border ${
              googleLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            } ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 hover:bg-gray-600 text-white"
                : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
            }`}
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continue with Google
          </motion.button>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`text-center mt-6 transition-colors duration-300 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <p className="text-sm">
            Don't have an account?{" "}
            <Link href="/register">
              <button
                onClick={() => console.log("Navigate to register")}
                className="text-emerald-500 cursor-pointer hover:text-emerald-400 font-medium inline-flex items-center gap-1"
              >
                Create Account <FiArrowRight className="text-xs" />
              </button>
            </Link>
          </p>
        </motion.div>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={`text-center mt-4 transition-colors duration-300 ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-sm">
            <FiKey className="text-xs" />
            <span>Secure authentication with encrypted data</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
