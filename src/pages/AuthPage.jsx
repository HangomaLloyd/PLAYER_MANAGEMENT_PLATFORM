import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";

const API_BASE_URL = "/api";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

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

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const fillDummyData = () => {
    setEmail("test@example.com");
    setPassword("password123");
    setConfirmPassword("password123");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    // --- TEMPORARY FIX: Simulating a successful API response ---
    // This bypasses the API call and directly sets a token.
    // Replace this with a real backend implementation later.
    const dummyToken = "dummy_jwt_token_for_testing";
    localStorage.setItem("jwt", dummyToken);
    setSuccess(`${isLogin ? "Login" : "Signup"} successful. Redirecting to dashboard...`);
    setTimeout(() => navigate("/dashboard"), 1500);
    setIsLoading(false);
    return;
    // -------------------------------------------------------------

    // The original API call logic is commented out below:
    // const endpoint = isLogin ? "login" : "signup";
    // const body = isLogin ? { email, password } : { email, password };
    // try {
    //   const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body),
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     throw new Error(data.message || `Failed to ${isLogin ? "log in" : "sign up"}.`);
    //   }

    //   if (isLogin) {
    //     localStorage.setItem("jwt", data.token);
    //     setSuccess("Login successful. Redirecting to dashboard...");
    //     setTimeout(() => navigate("/dashboard"), 1500);
    //   } else {
    //     localStorage.setItem("jwt", data.token); // Store the token after signup
    //     setSuccess("Signup successful. Redirecting to dashboard...");
    //     setTimeout(() => navigate("/dashboard"), 1500); // Redirect to dashboard
    //   }
    // } catch (err) {
    //   setError(err.message || "An unexpected error occurred.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 p-4 transition-colors duration-300">
      <Card className="w-full max-w-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
        <CardHeader className="text-center pb-0">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {isLogin ? "Log In" : "Sign Up"}
          </CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isLogin ? "Enter your credentials to access the portal" : "Create a new account"}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900 dark:text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="mister.faz@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600 focus:border-primary-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-900 dark:text-white">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600 focus:border-primary-500"
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-gray-900 dark:text-white">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600 focus:border-primary-500"
                />
              </div>
            )}
            {error && (
              <p className="text-sm text-red-500 dark:text-red-400 font-medium text-center">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-500 dark:text-green-400 font-medium text-center">{success}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
            </Button>
          </form>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={handleToggle}
              className="ml-1 font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </div>
        </CardContent>
      </Card>
      
      {/* Theme Toggle Button */}
      <Button
        onClick={toggleTheme}
        variant="outline"
        className="fixed top-4 right-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </Button>

      {/* Logout button for demonstration purposes */}
      <div className="absolute top-4 right-20">
        <Button onClick={handleLogout} variant="outline" className="bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700">
          Logout
        </Button>
      </div>
    </div>
  );
}
