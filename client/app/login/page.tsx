"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  FiLogIn,
  FiKey,
  FiArrowRight,
  FiSun,
  FiMoon,
  FiX,
} from "react-icons/fi";
import { useTheme } from "../theme/ThemeToogle";
import Link from "next/link";
import AxiosProxyInstance from "@/config/AxiosProxyInstance";
import { useRouter } from "next/navigation";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginAttempts {
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
}

export default function LoginPage() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempts>({
    count: 0,
    lastAttempt: 0,
  });

  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

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

  const isAccountLocked = (): boolean => {
    if (loginAttempts.lockedUntil && Date.now() < loginAttempts.lockedUntil) {
      const remainingTime = Math.ceil(
        (loginAttempts.lockedUntil - Date.now()) / 1000 / 60
      );
      setErrors({
        general: `Too many failed attempts. Please try again in ${remainingTime} minutes.`,
      });
      return true;
    }
    return false;
  };

  const resetLockIfExpired = () => {
    if (loginAttempts.lockedUntil && Date.now() >= loginAttempts.lockedUntil) {
      setLoginAttempts({ count: 0, lastAttempt: 0 });
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    resetLockIfExpired();

    if (isAccountLocked()) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await AxiosProxyInstance.post("/api/login", formData);

      if (res.status === 200) {
        console.log(res.data);
        setLoginAttempts({ count: 0, lastAttempt: 0 });
        setErrors({});
        router.push("/varon");
      }
    } catch (error: any) {
      setLoginAttempts((prev) => ({
        ...prev,
        count: prev.count + 1,
        lastAttempt: Date.now(),
        lockedUntil:
          prev.count + 1 >= 5 ? Date.now() + 2 * 60 * 1000 : undefined,
      }));
      setErrors({
        general:
          error?.response?.data?.error ||
          "Login failed. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Google authentication initiated");
      alert("Google authentication would be implemented here.");
    } catch (error) {
      setErrors({ general: "Google authentication failed. Please try again." });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      setErrors({ email: "Please enter your email address to reset password" });
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    console.log("Password reset requested for:", formData.email);
    alert(`Password reset instructions sent to ${formData.email}`);
  };

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
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
                {loginAttempts.count > 0 && !loginAttempts.lockedUntil && (
                  <p className="text-xs mt-1 opacity-80">
                    Attempts: {loginAttempts.count}/5
                  </p>
                )}
                {loginAttempts.lockedUntil && (
                  <button
                    onClick={handleForgotPassword}
                    className="text-xs underline mt-1 hover:no-underline"
                  >
                    Forgot password?
                  </button>
                )}
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

          <form onSubmit={handleEmailLogin} className="space-y-6">
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
                  onClick={handleForgotPassword}
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
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
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
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <FaExclamationTriangle className="text-xs" />
                  {errors.password}
                </motion.p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
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

            <motion.button
              type="submit"
              disabled={
                isLoading ||
                !!(
                  loginAttempts.lockedUntil &&
                  Date.now() < loginAttempts.lockedUntil
                )
              }
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                isLoading ||
                (loginAttempts.lockedUntil &&
                  Date.now() < loginAttempts.lockedUntil)
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
                  Signing In...
                </>
              ) : loginAttempts.lockedUntil &&
                Date.now() < loginAttempts.lockedUntil ? (
                <>
                  <FiKey className="text-xl" />
                  Account Locked
                </>
              ) : (
                <>
                  <FiLogIn className="text-xl" />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

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
