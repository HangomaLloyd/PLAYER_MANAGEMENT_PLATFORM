import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const API_BASE_URL = "/api";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    try {
      const endpoint = isLogin ? `${API_BASE_URL}/auth/login` : `${API_BASE_URL}/auth/signup`;
      const payload = isLogin
        ? { email, password }
        : { email, password, confirmPassword };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Authentication failed.");
        setIsLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("jwt", data.token);
        setSuccess(`${isLogin ? "Login" : "Signup"} successful. Redirecting to dashboard...`);
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setError("No token received from server.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
      <Card className="w-full max-w-sm bg-gray-900 text-white border border-gray-700 rounded-xl shadow-lg">
        <CardHeader className="text-center pb-0">
          <CardTitle className="text-2xl font-bold text-gray-100">
            {isLogin ? "Log In" : "Sign Up"}
          </CardTitle>
          <p className="text-sm text-gray-400 mt-1">
            {isLogin ? "Enter your credentials to access the portal" : "Create a new account"}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="mister.faz@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-primary-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-primary-500"
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-primary-500"
                />
              </div>
            )}
            {error && (
              <p className="text-sm text-red-400 font-medium text-center">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-400 font-medium text-center">{success}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
            </Button>
          </form>
          <div className="text-center text-sm text-gray-400 mt-4">
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
      <div className="absolute top-4 right-4">
        <Button onClick={handleHome} variant="outline" className="bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700">
          Home
        </Button>
      </div>
    </div>
  );
}
