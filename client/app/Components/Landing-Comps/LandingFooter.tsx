import React from "react";
import { FaRobot } from "react-icons/fa";

const LandingFooter = ({ isDarkMode }: any) => {
  return (
    <>
      <footer
        className={`border-t py-12 transition-colors duration-300 ${
          isDarkMode ? "bg-black border-gray-800" : "bg-white border-gray-200"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-500 to-teal-500"
                    : "bg-linear-to-r from-emerald-400 to-teal-400"
                }`}
              >
                <FaRobot />
              </div>
              <span
                className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                    : "bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
                }`}
              >
                Varon AI
              </span>
            </div>

            <div
              className={`text-center md:text-right transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <p>The boss-level AI that coordinates your digital dream team</p>
              <p className="text-sm mt-2">
                © {new Date().getFullYear()} Varon AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingFooter;
