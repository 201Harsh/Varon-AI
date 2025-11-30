import { motion } from "framer-motion";
import {
  FiX,
  FiCpu,
  FiSettings,
  FiCreditCard,
  FiHelpCircle,
  FiSliders,
  FiShield,
  FiBell,
  FiActivity,
  FiMoon,
  FiSun,
  FiCheck,
  FiBook,
  FiInfo,
  FiMail,
} from "react-icons/fi";
import { useState } from "react";

interface PopupProps {
  type: string | null;
  onClose: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const PopupModal = ({
  type,
  onClose,
  isDarkMode,
  toggleTheme,
}: PopupProps) => {
  if (!type) return null;

  const getContent = () => {
    switch (type) {
      case "customize":
        return <CustomizeAIContent isDarkMode={isDarkMode} />;
      case "settings":
        return (
          <SettingsContent isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        );
      case "subscription":
        return <SubscriptionContent isDarkMode={isDarkMode} />;
      case "help":
        return <HelpContent isDarkMode={isDarkMode} />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (type) {
      case "customize":
        return { icon: FiCpu, text: "Customize Varon AI" };
      case "settings":
        return { icon: FiSettings, text: "Settings" };
      case "subscription":
        return { icon: FiCreditCard, text: "Pricing & Plans" };
      case "help":
        return { icon: FiHelpCircle, text: "Help & Support" };
      default:
        return { icon: FiSettings, text: "" };
    }
  };

  const { icon: Icon, text: title } = getTitle();

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`relative w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[90vh] ${
          isDarkMode
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div
          className={`px-4 md:px-6 py-4 border-b flex items-center justify-between shrink-0 ${
            isDarkMode
              ? "border-gray-800 bg-gray-900/50"
              : "border-gray-100 bg-gray-50/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              <Icon className="text-xl" />
            </div>
            <h3
              className={`font-bold text-lg ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-900"
            }`}
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar flex-1">
          {getContent()}
        </div>

        {/* Footer Actions */}
        <div
          className={`px-4 md:px-6 py-4 border-t flex justify-end gap-3 shrink-0 ${
            isDarkMode
              ? "border-gray-800 bg-gray-900/50"
              : "border-gray-100 bg-gray-50/50"
          }`}
        >
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            Close
          </button>
          {type !== "help" && type !== "subscription" && (
            <button
              onClick={onClose}
              className={`px-5 py-2 rounded-xl text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all active:scale-95 ${
                isDarkMode
                  ? "bg-emerald-600 hover:bg-emerald-500"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }`}
            >
              Save Changes
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// --- Sub-components for Content ---

const CustomizeAIContent = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="space-y-6">
    {/* Personality Sliders */}
    <div
      className={`p-4 rounded-xl border ${
        isDarkMode
          ? "bg-gray-800/50 border-gray-700"
          : "bg-blue-50/50 border-blue-100"
      }`}
    >
      <div className="flex gap-3 mb-4">
        <FiActivity className="text-emerald-500 text-xl mt-1" />
        <div>
          <h4
            className={`font-medium ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Model Parameters
          </h4>
          <p
            className={`text-sm mt-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Fine-tune the behavior metrics.
          </p>
        </div>
      </div>
      <div className="space-y-5">
        <RangeSlider
          label="Creativity (Temperature)"
          value={75}
          isDarkMode={isDarkMode}
        />
        <RangeSlider
          label="Response Length"
          value={60}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>

    {/* System Instructions TextArea */}
    <div className="space-y-2">
      <label
        className={`text-sm font-medium ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Custom System Instructions
      </label>
      <textarea
        className={`w-full h-32 p-4 rounded-xl border outline-none text-sm transition-colors resize-none ${
          isDarkMode
            ? "bg-gray-800 border-gray-700 text-white focus:border-emerald-500"
            : "bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500"
        }`}
        placeholder="e.g., You are a senior React developer. Always provide code examples in TypeScript..."
        defaultValue="You are Varon AI, a helpful and intelligent assistant."
      />
      <p
        className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
      >
        These instructions will be prepended to every conversation.
      </p>
    </div>

    {/* Tone Selector */}
    <div className="space-y-2">
      <label
        className={`text-sm font-medium ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Response Tone
      </label>
      <div className="grid grid-cols-3 gap-2">
        {["Professional", "Friendly", "Concise"].map((tone, i) => (
          <button
            key={i}
            className={`py-2 px-3 rounded-lg text-sm border transition-all ${
              i === 0
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-500 font-medium"
                : isDarkMode
                ? "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            {tone}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const SettingsContent = ({
  isDarkMode,
  toggleTheme,
}: {
  isDarkMode: boolean;
  toggleTheme: () => void;
}) => (
  <div className="space-y-4">
    {/* Theme Toggle Control */}
    <div
      className={`flex items-center justify-between p-3 rounded-xl border ${
        isDarkMode
          ? "border-gray-800 bg-gray-800/30"
          : "border-gray-100 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg ${
            isDarkMode
              ? "bg-gray-800 text-yellow-400"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isDarkMode ? <FiMoon /> : <FiSun />}
        </div>
        <div>
          <div
            className={`font-medium text-sm ${
              isDarkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            Appearance
          </div>
          <div
            className={`text-xs ${
              isDarkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            Switch to {isDarkMode ? "Light" : "Dark"} Mode
          </div>
        </div>
      </div>

      {/* Animated Switch Button */}
      <button
        onClick={toggleTheme}
        className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
          isDarkMode ? "bg-emerald-500" : "bg-gray-300"
        }`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm ${
            isDarkMode ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>

    {/* Other Settings Toggles */}
    <ToggleItem
      icon={FiBell}
      title="Notifications"
      desc="Receive alerts for task completions"
      isDarkMode={isDarkMode}
      defaultChecked={true}
    />
    <ToggleItem
      icon={FiShield}
      title="Privacy Mode"
      desc="Do not store conversation history"
      isDarkMode={isDarkMode}
      defaultChecked={false}
    />
    <ToggleItem
      icon={FiSliders}
      title="Auto-Connect"
      desc="Connect to Varon AI on startup"
      isDarkMode={isDarkMode}
      defaultChecked={false}
    />
  </div>
);

const SubscriptionContent = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      features: ["Basic AI Model", "50 messages/day", "Community Support"],
      active: true,
    },
    {
      name: "Pro",
      price: "₹290/mo",
      features: [
        "Advanced AI Model",
        "Unlimited messages",
        "Priority Support",
        "Custom personas",
      ],
      active: false,
    },
    {
      name: "Team",
      price: "₹699/mo",
      features: [
        "Dedicated Server",
        "Admin Dashboard",
        "API Access",
        "SSO Integration",
      ],
      active: false,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h4
          className={`text-lg font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Upgrade your experience
        </h4>
        <p
          className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Choose the plan that fits your needs.
        </p>
      </div>

      {/* Grid: 1 col on mobile, 3 cols on tablet/desktop */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative p-4 rounded-xl border flex flex-col ${
              plan.active
                ? "border-emerald-500 bg-emerald-500/5"
                : isDarkMode
                ? "border-gray-800 bg-gray-800/50"
                : "border-gray-200 bg-white"
            }`}
          >
            {plan.active && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                Current
              </div>
            )}
            <div
              className={`text-lg font-bold mb-1 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {plan.name}
            </div>
            <div
              className={`text-xl font-bold mb-4 ${
                plan.active
                  ? "text-emerald-500"
                  : isDarkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }`}
            >
              {plan.price}
            </div>

            <ul className="space-y-2 mb-6 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs">
                  <FiCheck className="text-emerald-500 shrink-0 mt-0.5" />
                  <span
                    className={isDarkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
                plan.active
                  ? "bg-emerald-500 text-white cursor-default"
                  : isDarkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              {plan.active ? "Active Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const HelpContent = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const links = [
    {
      icon: FiBook,
      label: "Documentation",
      desc: "Read the full guide",
      action: "/docs",
    },
    {
      icon: FiCpu,
      label: "AI Assistants",
      desc: "Learn about our models",
      action: "/assistants",
    },
    {
      icon: FiInfo,
      label: "About Varon AI",
      desc: "Our story & mission",
      action: "/about",
    },
    {
      icon: FiMail,
      label: "Contact Support",
      desc: "Get help from our team",
      action: "/contact",
    },
  ];

  const handleRedirect = (path: string) => {
    window.open(path, "_blank");
  };

  return (
    <div className="space-y-3">
      {links.map((item, i) => (
        <button
          key={i}
          onClick={() => handleRedirect(item.action)}
          className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-4 group ${
            isDarkMode
              ? "border-gray-800 bg-gray-800/30 hover:bg-gray-800 hover:border-gray-700"
              : "border-gray-100 bg-white hover:border-emerald-200 hover:shadow-sm"
          }`}
        >
          <div
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? "bg-gray-800 text-gray-400 group-hover:text-emerald-400"
                : "bg-gray-100 text-gray-500 group-hover:text-emerald-600 group-hover:bg-emerald-50"
            }`}
          >
            <item.icon className="text-lg" />
          </div>
          <div>
            <div
              className={`font-medium text-sm ${
                isDarkMode
                  ? "text-gray-200 group-hover:text-white"
                  : "text-gray-900"
              }`}
            >
              {item.label}
            </div>
            <div
              className={`text-xs ${
                isDarkMode ? "text-gray-500" : "text-gray-500"
              }`}
            >
              {item.desc}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

// --- Helper Components ---

const RangeSlider = ({ label, value, isDarkMode }: any) => (
  <div>
    <div className="flex justify-between text-xs mb-2">
      <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
        {label}
      </span>
      <span className="text-emerald-500 font-medium">{value}%</span>
    </div>
    <div
      className={`h-2 rounded-full overflow-hidden relative ${
        isDarkMode ? "bg-gray-700" : "bg-gray-200"
      }`}
    >
      <div
        style={{ width: `${value}%` }}
        className="h-full bg-emerald-500 rounded-full"
      />
    </div>
  </div>
);

// Toggle Item for non-theme switches (Notifications etc)
const ToggleItem = ({
  icon: Icon,
  title,
  desc,
  isDarkMode,
  defaultChecked,
  onClickAction,
}: any) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleClick = () => {
    setChecked(!checked);
    if (onClickAction) onClickAction();
  };

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl border ${
        isDarkMode
          ? "border-gray-800 bg-gray-800/30"
          : "border-gray-100 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg ${
            isDarkMode
              ? "bg-gray-800 text-gray-400"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <Icon />
        </div>
        <div>
          <div
            className={`font-medium text-sm ${
              isDarkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            {title}
          </div>
          <div
            className={`text-xs ${
              isDarkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            {desc}
          </div>
        </div>
      </div>
      <button
        onClick={handleClick}
        className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${
          checked
            ? "bg-emerald-500"
            : isDarkMode
            ? "bg-gray-700"
            : "bg-gray-300"
        }`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};
