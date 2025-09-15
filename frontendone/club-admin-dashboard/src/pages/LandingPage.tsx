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
  <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white p-0 md:p-0 transition-colors duration-300">
      {/* Navbar */}
  <nav className="w-full bg-white dark:bg-black shadow flex items-center justify-between px-6 py-4 mb-12 border-b border-green-600">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-green-600 tracking-tight">Zam Foot Central</Link>
          <div className="hidden md:flex gap-6">
            <Link to="/clubs" className="hover:text-green-600 transition-colors font-medium">Clubs</Link>
            <Link to="/players" className="hover:text-green-600 transition-colors font-medium">Players</Link>
            <Link to="/transfers" className="hover:text-green-600 transition-colors font-medium">Transfers</Link>
            <Link to="/news" className="hover:text-green-600 transition-colors font-medium">News</Link>
            <Link to="/statistics" className="hover:text-green-600 transition-colors font-medium">Statistics</Link>
            <Link to="/injuries" className="hover:text-green-600 transition-colors font-medium">Injuries</Link>
            <Link to="/leagues" className="hover:text-green-600 transition-colors font-medium">Leagues</Link>
            <Link to="/about" className="hover:text-green-600 transition-colors font-medium">About</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
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
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[400px] flex items-center justify-center bg-gradient-to-r from-green-600 via-black to-green-900 overflow-hidden mb-16">
          <div className="text-center text-white z-10">
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to Zam Foot Central</h1>
            <p className="text-xl mb-6">The home of Zambian football clubs, legends, and fans.</p>
            <Button className="bg-white text-green-700 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition">Explore Clubs</Button>
          </div>
          {/* Optional: Add a semi-transparent football image or SVG as a background */}
          <img src="/football-bg.png" alt="" className="absolute right-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block" />
        </section>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
          {/* Player Management Card */}
          <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-lg border border-green-600 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-green-800">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-xl mb-4 text-white">
              {/* icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1.5-6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm4.5 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
                <path d="M16 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM8.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Player Management</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">Complete player profiles and career tracking</p>
          </div>

          {/* Transfer System Card */}
          <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-lg border border-green-600 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-green-800">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-xl mb-4 text-white">
              {/* icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1.5-6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm4.5 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
                <path d="M16 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM8.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Transfer System</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">Streamlined transfer management process</p>
          </div>

          {/* Analytics Card */}
          <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-lg border border-green-600 transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-green-800">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-xl mb-4 text-white">
              {/* icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1.5-6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0zm4.5 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm-3-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
                <path d="M16 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM8.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Analytics</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">Comprehensive reporting and insights</p>
          </div>
        </div>

        {/* Featured Players Section */}
        <section className="w-full max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6 text-left text-green-600">Featured Players</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map((n) => (
              <div key={n} className="bg-white dark:bg-black border border-green-100 dark:border-green-900 rounded-xl shadow p-5 flex flex-col items-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full mb-3" />
                <h3 className="font-semibold text-lg mb-1">Player Name {n}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Club Name</p>
                <p className="text-xs text-gray-400">Position • Age • Nationality</p>
              </div>
            ))}
          </div>
        </section>

        {/* Zambian Football Legends Section */}
        <section className="w-full max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6 text-left text-green-600">Zambian Football Legends</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map((n) => (
              <div key={n} className="bg-white dark:bg-black border border-yellow-200 dark:border-yellow-900 rounded-xl shadow p-5 flex flex-col items-center">
                <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900 rounded-full mb-3" />
                <h3 className="font-semibold text-lg mb-1">Legend Name {n}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Club(s) • Years Active</p>
                <p className="text-xs text-gray-400">Achievements • Honors</p>
              </div>
            ))}
          </div>
        </section>

        {/* Women's League Section */}
        <section className="w-full max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6 text-left text-green-600">Women's League</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map((n) => (
              <div key={n} className="bg-white dark:bg-black border border-pink-200 dark:border-pink-900 rounded-xl shadow p-5 flex flex-col items-center">
                <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900 rounded-full mb-3" />
                <h3 className="font-semibold text-lg mb-1">Women's Club {n}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Top Player • Recent Result</p>
                <p className="text-xs text-gray-400">League Standing</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partners Section */}
        <section className="w-full max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6 text-left text-green-600">Our Partners</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
            {[1,2,3,4].map((n) => (
              <div key={n} className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full mb-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Partner {n}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Donate to Football Legends Welfare Section */}
        <section className="w-full max-w-5xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6 text-left text-green-600">Donate to Football Legends Welfare</h2>
          <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-xl shadow p-8 flex flex-col items-center">
            <p className="text-lg font-semibold mb-2 text-green-700 dark:text-green-300">Support our Zambian football legends in need.</p>
            <p className="text-gray-700 dark:text-gray-200 mb-4">Your donation helps provide medical care, housing, and support for retired players who made history for Zambia.</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 text-lg font-bold">Donate Now</Button>
          </div>
        </section>

        {/* Transfer Rumors Section */}
        <section className="w-full max-w-5xl mx-auto mt-16 mb-24">
          <h2 className="text-2xl font-bold mb-6 text-left text-green-600">Transfer Rumors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map((n) => (
              <div key={n} className="bg-white dark:bg-black border border-blue-200 dark:border-blue-900 rounded-xl shadow p-5 flex flex-col items-start">
                <h3 className="font-semibold text-lg mb-1">Rumor Headline {n}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Player X rumored to join Club Y for record fee.</p>
                <span className="text-xs text-gray-400">Source: Football News</span>
              </div>
            ))}
          </div>
        </section>

  </main>

  {/* Footer */}
  <footer className="w-full bg-white dark:bg-black border-t border-green-600 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="text-2xl font-bold text-green-600 mb-2">Zam Foot Central</Link>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">&copy; {new Date().getFullYear()} Zam Foot Central. All rights reserved.</p>
            <p className="text-gray-400 text-xs">A platform for Zambian football clubs, legends, and fans.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <Link to="/clubs" className="text-sm text-gray-700 dark:text-gray-200 hover:text-green-600">Clubs</Link>
            <Link to="/players" className="text-sm text-gray-700 dark:text-gray-200 hover:text-green-600">Players</Link>
            <Link to="/transfers" className="text-sm text-gray-700 dark:text-gray-200 hover:text-green-600">Transfers</Link>
            <Link to="/news" className="text-sm text-gray-700 dark:text-gray-200 hover:text-green-600">News</Link>
            <Link to="/statistics" className="text-sm text-gray-700 dark:text-gray-200 hover:text-green-600">Statistics</Link>
            <Link to="/injuries" className="text-sm text-gray-700 dark:text-gray-200 hover:text-green-600">Injuries</Link>
            <Link to="/leagues" className="text-sm text-gray-700 dark:text-gray-200 hover:text-green-600">Leagues</Link>
            <Link to="/about" className="text-sm text-gray-700 dark:text-gray-200 hover:text-green-600">About</Link>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-gray-600 dark:text-gray-300 text-sm">Contact: info@zamfootcentral.com</span>
            <span className="text-gray-400 text-xs">Follow us on social media</span>
            <div className="flex gap-3 mt-1">
              <a href="#" className="text-green-600 hover:text-green-800" aria-label="Facebook"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg></a>
              <a href="#" className="text-green-600 hover:text-green-800" aria-label="Twitter"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/></svg></a>
              <a href="#" className="text-green-600 hover:text-green-800" aria-label="Instagram"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809 2.256 6.089 2.243 6.498 2.243 12c0 5.502.013 5.911.072 7.191.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-7.191 0-5.502-.013-5.911-.072-7.191-.059-1.277-.353-2.45-1.32-3.417C19.398.425 18.225.131 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
