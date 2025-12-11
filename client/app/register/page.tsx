"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowLeft,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiKey,
  FiUserCheck,
  FiSun,
  FiMoon,
  FiX,
} from "react-icons/fi";
import { useTheme } from "../theme/ThemeToogle";
import Link from "next/link";
import AxiosInstance from "@/config/AxiosInstance";
import AxiosProxyInstance from "@/config/AxiosProxyInstance";
import { useRouter } from "next/navigation";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  otp?: string;
  general?: string;
}
interface FormMessages {
  name?: string;
  email?: string;
  password?: string;
  otp?: string;
  general?: string;
}

interface OTPErrors {
  invalid?: boolean;
  expired?: boolean;
  attempts?: boolean;
}

export default function RegisterPage() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [messages, setMessages] = useState<FormMessages>({});
  const [otpErrors, setOtpErrors] = useState<OTPErrors>({});
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 3;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = (): boolean => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setErrors((prev) => ({ ...prev, otp: "Please enter all 6 digits" }));
      return false;
    }

    if (!/^\d{6}$/.test(enteredOtp)) {
      setErrors((prev) => ({ ...prev, otp: "OTP must contain only numbers" }));
      return false;
    }

    setErrors((prev) => ({ ...prev, otp: undefined }));
    return true;
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await AxiosInstance.post("/users/register", formData);

      if (res.status === 201) {
        setStep("otp");
        setShowOtpPopup(true);
        setMessages({
          general:
            res.data.message || "Verification code has already been sent.",
        });
      }

      if (res.status === 202) {
        setStep("otp");
        setMessages({
          general: res.data.error || "Verification code has already been sent.",
        });
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setErrors({
          general: error.response?.data?.error || "Please Login!!",
        });
        router.push("/login");
        return;
      }

      setErrors({
        general:
          error.response?.data?.error ||
          "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateOTP()) {
      return;
    }

    setIsLoading(true);
    setOtpErrors({});
    setErrors({});
    setMessages({});

    try {
      const enteredOtp = otp.join("");

      const res = await AxiosProxyInstance.post("/api/verify", {
        email: formData.email,
        otp: enteredOtp,
      });

      if (res.status === 200) {
        console.log(res.data);
        setShowOtpPopup(false);
        setMessages({
          general: res.data?.message || "OTP verified successfully.",
        });
        router.push("/varon");
      }
    } catch (error: any) {
      console.log(error.response.status);
      if (error.response.status === 400) {
        setErrors({
          otp:
            error.response?.data?.error ||
            "Failed to verify OTP. Please try again.",
        });
        return;
      }
      setErrors({
        general:
          error.response?.data?.error ||
          "Failed to verify OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setErrors({ general: "Google authentication failed. Please try again." });
    } catch (error) {
      setErrors({ general: "Google authentication failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: undefined }));
    }
    if (otpErrors.invalid) {
      setOtpErrors({});
    }

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

    if (errors.otp) {
      setErrors((prev) => ({ ...prev, otp: undefined }));
    }
    setOtpErrors({});
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const resendOTP = () => {
    setOtp(["", "", "", "", "", ""]);
    setErrors((prev) => ({ ...prev, otp: undefined }));
    setOtpErrors({});
    console.log("Resending OTP to:", formData.email);
    alert("New OTP sent to your email!");
  };

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (field === "otp") {
      setOtpErrors({});
    }
    setMessages((prev) => ({ ...prev, [field]: undefined }));
    if (field === "otp") {
      setOtpErrors({});
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="w-full max-w-md">
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
          className="text-center mb-4"
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
          {messages.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg border flex items-start gap-3 ${
                isDarkMode
                  ? "bg-emerald-500/10 border-green-500/20 text-emerald-400"
                  : "bg-emerald-50 border-green-200 text-emerald-600"
              }`}
            >
              <FaCheck className="text-lg mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">{messages.general}</p>
              </div>
              <button
                onClick={() => clearError("general")}
                className={`p-1 rounded transition-colors ${
                  isDarkMode
                    ? "hover:bg-emerald-500/20"
                    : "hover:bg-emerald-100"
                }`}
              >
                <FiX className="text-sm" />
              </button>
            </motion.div>
          )}

          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg border flex items-start gap-3 ${
                isDarkMode
                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              <FaExclamationTriangle className="text-lg mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">{errors.general}</p>
              </div>
              <button
                onClick={() => clearError("general")}
                className={`p-1 rounded transition-colors ${
                  isDarkMode ? "hover:bg-red-500/20" : "hover:bg-red-100"
                }`}
              >
                <FiX className="text-sm" />
              </button>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
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
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) clearError("name");
                        }}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                          errors.name
                            ? isDarkMode
                              ? "border-red-500 bg-red-500/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                              : "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-xs mt-1 flex items-center gap-1"
                      >
                        <FaExclamationTriangle className="text-xs" />
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

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
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) clearError("email");
                        }}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                          errors.email
                            ? isDarkMode
                              ? "border-red-500 bg-red-500/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                              : "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-xs mt-1 flex items-center gap-1"
                      >
                        <FaExclamationTriangle className="text-xs" />
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

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
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          });
                          if (errors.password) clearError("password");
                        }}
                        className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-colors duration-300 ${
                          errors.password
                            ? isDarkMode
                              ? "border-red-500 bg-red-500/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                              : "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        }`}
                        placeholder="Create a password"
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
                    <div className="flex justify-between items-center mt-1">
                      <p
                        className={`text-xs transition-colors duration-300 ${
                          isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        Minimum 6 characters
                      </p>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-xs flex items-center gap-1"
                        >
                          <FaExclamationTriangle className="text-xs" />
                          {errors.password}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                      isLoading
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-pointer"
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
                    isLoading
                      ? "opacity-70 cursor-not-allowed"
                      : "cursor-pointer"
                  } ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 hover:bg-gray-600 text-white"
                      : "border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {isLoading ? (
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
                  onClick={() => {
                    setStep("credentials");
                    setErrors({});
                    setOtpErrors({});
                    setMessages({});
                  }}
                  className={`flex items-center gap-2 mb-6 transition-colors duration-300 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <FaArrowLeft className="text-sm" />
                  Change Credentials
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
                          errors.otp || otpErrors.invalid
                            ? isDarkMode
                              ? "border-red-500 bg-red-500/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                              : "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                            : isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            : "bg-white border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                        }`}
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>

                  {/* OTP Error Display */}
                  {errors.otp && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`p-3 rounded-lg border flex items-start gap-3 ${
                        isDarkMode
                          ? "bg-red-500/10 border-red-500/20 text-red-400"
                          : "bg-red-50 border-red-200 text-red-600"
                      }`}
                    >
                      <FaExclamationTriangle className="text-lg mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{errors.otp}</p>
                        {otpErrors.expired && (
                          <button
                            type="button"
                            onClick={resendOTP}
                            className="text-sm underline mt-1 hover:no-underline"
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => clearError("otp")}
                        className={`p-1 rounded transition-colors ${
                          isDarkMode
                            ? "hover:bg-red-500/20"
                            : "hover:bg-red-100"
                        }`}
                      >
                        <FiX className="text-sm" />
                      </button>
                    </motion.div>
                  )}

                  <p
                    className={`text-center text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Can't find the code? Check your spam folder or{" "}
                    <button
                      type="button"
                      className="text-emerald-500 hover:text-emerald-400 font-medium"
                      onClick={resendOTP}
                    >
                      resend
                    </button>
                  </p>

                  {/* Verify Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading || otp.some((digit) => digit === "")}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer ${
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
                  className="text-emerald-500 hover:text-emerald-400 font-medium cursor-pointer"
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

      {/* OTP Success Popup */}
      <AnimatePresence>
        {showOtpPopup && step === "otp" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`rounded-2xl p-6 max-w-sm w-full border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <FiMail className="text-2xl text-emerald-500" />
                </div>
                <h3
                  className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  OTP Sent!
                </h3>
                <p
                  className={`text-sm mb-4 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  We've sent a 6-digit verification code to your email address.
                  Please check your inbox and enter the code to continue.
                </p>
                <button
                  onClick={() => setShowOtpPopup(false)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "bg-emerald-500 hover:bg-emerald-600 text-white"
                  }`}
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
