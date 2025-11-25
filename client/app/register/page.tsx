"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaArrowLeft,
  FaCheck,
  FaRobot,
} from "react-icons/fa";
import { FiEye, FiEyeOff, FiMail, FiKey, FiUserCheck } from "react-icons/fi";
import { useTheme } from "../theme/ThemeToogle";
import Link from "next/link";

export default function RegisterPage() {
  const { isDarkMode } = useTheme();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  // Separate function for credentials submission
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Fake API call simulation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Credentials submitted:", formData);
    setIsLoading(false);
    setStep("otp");

    // In real app, this would trigger OTP sending to email
    console.log("OTP sent to:", formData.email);
  };

  // Separate function for OTP verification
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Fake API call simulation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const enteredOtp = otp.join("");
    console.log("OTP submitted:", enteredOtp);

    // Fake OTP verification
    if (enteredOtp === "123456") {
      // Hardcoded for demo
      console.log("OTP verified successfully!");
      // Here you would typically redirect to dashboard
      alert("Registration successful! Welcome to Varon AI.");
    } else {
      alert("Invalid OTP. Please try again.");
    }

    setIsLoading(false);
  };

  // Separate function for Google authentication
  const handleGoogleAuth = async () => {
    setIsLoading(true);

    // Fake Google auth simulation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Google authentication initiated");
    // Here you would typically redirect to Google OAuth
    alert("Google authentication would be implemented here.");

    setIsLoading(false);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedNumbers = pastedData.replace(/\D/g, "").slice(0, 6);

    const newOtp = [...otp];
    pastedNumbers.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Join Varon AI
          </h1>
          <p
            className={`mt-2 transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Create your account and start coordinating AI assistants
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
          <AnimatePresence mode="wait">
            {/* Credentials Step */}
            {step === "credentials" && (
              <motion.div
                key="credentials"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleCredentialsSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                          isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

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
                    <label
                      className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <FaLock
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                          isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <input
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
                        placeholder="Create a password"
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                          isDarkMode
                            ? "text-gray-400 hover:text-gray-300"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {showPassword ? (
                          <FiEyeOff className="text-xl" />
                        ) : (
                          <FiEye className="text-xl" />
                        )}
                      </button>
                    </div>
                    <p
                      className={`text-xs mt-1 transition-colors duration-300 ${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Minimum 6 characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    } ${
                      isDarkMode
                        ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                        : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-lg hover:shadow-emerald-400/25 text-white"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <FiUserCheck className="text-xl" />
                        Create Account
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
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3 border ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  } ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 hover:bg-gray-600 text-white"
                      : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaGoogle
                      className={`text-xl ${
                        isDarkMode ? "text-red-400" : "text-red-500"
                      }`}
                    />
                  )}
                  Continue with Google
                </motion.button>
              </motion.div>
            )}

            {/* OTP Step */}
            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Back Button */}
                <button
                  onClick={() => setStep("credentials")}
                  className={`flex items-center gap-2 mb-6 transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <FaArrowLeft className="text-sm" />
                  Back to credentials
                </button>

                <div className="text-center mb-2">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300 ${
                      isDarkMode ? "bg-emerald-500/20" : "bg-emerald-500/10"
                    }`}
                  >
                    <FiMail className="text-xl text-emerald-500" />
                  </div>
                  <h2
                    className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Verify Your Email
                  </h2>
                  <p
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    We sent a 6-digit code to
                    <br />
                    <span className="font-semibold text-emerald-500">
                      {formData.email}
                    </span>
                  </p>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-6 mt-6">
                  {/* OTP Inputs */}
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <motion.input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onPaste={handleOtpPaste}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={`w-12 h-12 text-center text-lg font-semibold rounded-lg border transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            : "bg-white border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        }`}
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>

                  <p
                    className={`text-center text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Can't find the code? Check your spam folder or{" "}
                    <button
                      type="button"
                      className="text-emerald-500 hover:text-emerald-400 font-medium"
                      onClick={() =>
                        console.log("Resend OTP to:", formData.email)
                      }
                    >
                      resend
                    </button>
                  </p>

                  {/* Demo OTP Hint */}
                  <div
                    className={`text-center text-xs p-3 rounded-lg transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-emerald-500/5 text-emerald-600"
                    }`}
                  >
                    💡 Demo: Use <strong>123456</strong> as OTP
                  </div>

                  {/* Verify Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading || otp.some((digit) => digit === "")}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                      isLoading || otp.some((digit) => digit === "")
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                    } ${
                      isDarkMode
                        ? "bg-linear-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/25"
                        : "bg-linear-to-r from-emerald-400 to-teal-400 hover:shadow-lg hover:shadow-emerald-400/25 text-white"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <FaCheck className="text-xl" />
                        Verify & Complete
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Links */}
          <div
            className={`text-center mt-6 pt-6 border-t transition-colors duration-300 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <p
              className={`text-sm transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Already have an account?{" "}
              <Link href="/login">
              <button
                onClick={() => console.log("Navigate to login")}
                className="text-emerald-500 hover:text-emerald-400 font-medium"
              >
                Log In
              </button>
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`text-center mt-6 transition-colors duration-300 ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-sm">
            <FiKey className="text-xs" />
            <span>Your data is securely encrypted and protected</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
