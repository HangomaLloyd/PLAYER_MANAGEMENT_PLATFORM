import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-[#0A0D14] text-gray-900 dark:text-gray-200 p-8 md:p-12 transition-colors duration-300">
      {/* Header with Navigation */}
      <header className="flex justify-end w-full mb-16">
        <div className="flex items-center space-x-4">
          <Link to="/auth" className="text-sm font-medium hover:text-green-500 transition-colors">
            Log In
          </Link>
          <Link to="/auth">
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 transition-all duration-300">
              Sign Up
            </Button>
          </Link>
          <Button
            onClick={toggleTheme}
            variant="ghost"
            className="p-2 rounded-full text-gray-400 hover:bg-gray-800"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-[#1B2130] text-green-500 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Secure & Professional
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Welcome to <span className="text-green-500">ZAM-</span><span className="text-orange-400">FOOT-CENTRAL</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            The comprehensive Football Club & Player Management Platform designed for the Football Association of Zambia. Manage players, transfers, and club operations with professional precision.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Player Management Card */}
          <div className="bg-[#1B2130] p-6 rounded-2xl shadow-lg border border-[#2D3340] hover:border-green-500 transition-colors duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-xl mb-4 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1.5-6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm4.5 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
                <path d="M16 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM8.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Player Management</h3>
            <p className="text-sm text-gray-400">Complete player profiles and career tracking</p>
          </div>

          {/* Transfer System Card */}
          <div className="bg-[#1B2130] p-6 rounded-2xl shadow-lg border border-[#2D3340] hover:border-green-500 transition-colors duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-xl mb-4 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1.5-6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm4.5 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
                <path d="M16 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM8.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Transfer System</h3>
            <p className="text-sm text-gray-400">Streamlined transfer management process</p>
          </div>

          {/* Analytics Card */}
          <div className="bg-[#1B2130] p-6 rounded-2xl shadow-lg border border-[#2D3340] hover:border-green-500 transition-colors duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-xl mb-4 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1.5-6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm4.5 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
                <path d="M16 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM8.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Analytics</h3>
            <p className="text-sm text-gray-400">Comprehensive reporting and insights</p>
          </div>
        </div>
      </main>
    </div>
  );
}
