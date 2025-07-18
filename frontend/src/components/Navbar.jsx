import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleLoginModal, toggleSignupModal } from "../store/store";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeNavTab, setActiveNavTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    console.log("Token:", token); // Debug log
    console.log("User data from localStorage:", userData); // Debug log

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("Parsed user:", parsedUser); // Debug log
        setIsLoggedIn(true);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Clear invalid data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "progress", label: "Progress", icon: "�" },
    { id: "leaderboard", label: "Leaderboard", icon: "🏆" },
  ];

  const handleNavClick = (tabId) => {
    setActiveNavTab(tabId);
    // Close mobile menu when item is clicked
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setActiveNavTab("dashboard");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm sm:text-xl">
                TW
              </span>
            </div>
            <div>
              <h1 className="text-white text-lg sm:text-2xl font-bold">
                TrainWave
              </h1>
              <p className="text-white/70 text-xs hidden sm:block">
                AI Fitness Tracker
              </p>
            </div>
          </div>

          {/* Navigation Items - Only show if logged in */}
          {isLoggedIn && (
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeNavTab === item.id
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="text-base sm:text-lg">{item.icon}</span>
                  <span className="font-medium text-sm sm:text-base">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {isLoggedIn ? (
              // Logged in state
              <>
                <div className="hidden sm:flex items-center space-x-2 text-white/90">
                  <span className="text-sm">
                    Welcome,{" "}
                    {user?.name || user?.username || user?.firstName || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 sm:px-6 py-2 text-white/90 hover:text-white border border-white/30 rounded-lg sm:rounded-xl hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                >
                  Logout
                </button>
              </>
            ) : (
              // Not logged in state
              <>
                <button
                  onClick={() => dispatch(toggleLoginModal())}
                  className="px-3 sm:px-6 py-2 text-white/90 hover:text-white border border-white/30 rounded-lg sm:rounded-xl hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                >
                  Login
                </button>
                <button
                  onClick={() => dispatch(toggleSignupModal())}
                  className="px-3 sm:px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 text-sm sm:text-base"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden ml-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {sidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Only show if logged in */}
        {isLoggedIn && (
          <div
            className={`lg:hidden transition-all duration-300 overflow-hidden ${
              sidebarOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/20">
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg transition-all duration-300 ${
                      activeNavTab === item.id
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="text-sm sm:text-base">{item.icon}</span>
                    <span className="text-xs sm:text-sm font-medium">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Mobile User Info & Logout */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="text-center text-white/80 text-sm mb-3">
                  Welcome,{" "}
                  {user?.name || user?.username || user?.firstName || "User"}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 text-white/90 border border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300 text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
