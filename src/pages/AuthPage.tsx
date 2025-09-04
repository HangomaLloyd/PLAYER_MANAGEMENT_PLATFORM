import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock } from "lucide-react"; // Importing icons for the input fields
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// This is a placeholder for a real API call.
const API_BASE_URL = "/api";

export default function AuthPage() {
  const [role, setRole] = useState<'clubadmin' | 'superadmin'>('clubadmin');
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clubName, setClubName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [province, setProvince] = useState("");
  const [clubDivision, setClubDivision] = useState("");
  const [registrationDoc, setRegistrationDoc] = useState(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Handle toggling between login and signup forms
  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setClubName("");
    setAdminName("");
    setAdminRole("");
    setPhoneNumber("");
    setProvince("");
    setClubDivision("");
    setRegistrationDoc(null);
    setLogo(null);
  };

  // Handle navigation to the home page
  const handleHome = () => {
    navigate("/");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (role === 'clubadmin') {
      if (!isLogin && password !== confirmPassword) {
        setError("Passwords do not match.");
        setIsLoading(false);
        return;
      }
      if (!isLogin && (!clubName || !adminName || !adminRole || !phoneNumber || !province || !clubDivision || !registrationDoc)) {
        setError("Please fill in all required fields.");
        setIsLoading(false);
        return;
      }
    }

    try {
      let endpoint = `${API_BASE_URL}/auth/login`;
      if (role === 'clubadmin' && !isLogin) {
        endpoint = `${API_BASE_URL}/auth/signup`;
      }

      let response, data;
      if (isLogin || role === 'superadmin') {
        // Login for both roles
        response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
      } else {
        // Club admin signup
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("clubName", clubName);
        formData.append("adminName", adminName);
        formData.append("adminRole", adminRole);
        formData.append("phoneNumber", phoneNumber);
        formData.append("province", province);
        formData.append("clubDivision", clubDivision);
        formData.append("registrationDoc", registrationDoc);
        if (logo) formData.append("logo", logo);
        response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });
      }
      data = await response.json();

      if (!response.ok) {
        setError(data.message || "Authentication failed.");
        setIsLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("jwt", data.token);
        setSuccess(`${isLogin ? "Login" : "Signup"} successful. Redirecting...`);
        setTimeout(() => {
          if (role === 'superadmin') {
            navigate("/superadmin");
          } else {
            navigate("/dashboard");
          }
        }, 1500);
      } else {
        setError("No token received from server.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="football-background flex items-center justify-center min-h-screen p-4">
      {/* Role Selector moved outside the Card */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[200px] flex justify-center gap-4 mb-4 z-10">
        <button
          type="button"
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg ${role === 'clubadmin' ? 'bg-zinc-800 text-green-400 border border-green-400' : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-green-400 hover:border-green-400'}`}
          onClick={() => { setRole('clubadmin'); setIsLogin(true); }}
        >
          Club Admin
        </button>
        <button
          type="button"
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg ${role === 'superadmin' ? 'bg-zinc-800 text-green-400 border border-green-400' : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-green-400 hover:border-green-400'}`}
          onClick={() => { setRole('superadmin'); setIsLogin(true); }}
        >
          Super Admin
        </button>
      </div>

      <Card className="w-full max-w-sm bg-zinc-900/90 text-white rounded-3xl shadow-2xl backdrop-blur-sm border-2 border-green-400/50">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-gray-100">
            {role === 'superadmin' ? 'Super Admin Login' : isLogin ? 'Log In' : 'Club Sign Up'}
          </CardTitle>
          <p className="text-sm text-gray-400 mt-2">
            {role === 'superadmin' ? 'Enter your super admin credentials' : isLogin ? 'Enter your credentials to access the portal' : 'Register your club to get started'}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {isLogin && (
                <>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-zinc-800 text-white placeholder-gray-500 border-zinc-700 focus:border-green-400 rounded-lg"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-zinc-800 text-white placeholder-gray-500 border-zinc-700 focus:border-green-400 rounded-lg"
                    />
                  </div>
                </>
              )}
            </div>

            {isLogin && (
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember-me" className="w-4 h-4 bg-zinc-800 border-zinc-700 text-green-400" />
                  <Label htmlFor="remember-me" className="text-gray-400">Remember me</Label>
                </div>
                <a href="#" className="text-green-400 hover:underline">Forgot password?</a>
              </div>
            )}

            {error && <p className="text-sm text-red-400 font-medium text-center">{error}</p>}
            {success && <p className="text-sm text-green-400 font-medium text-center">{success}</p>}
            
            <Button
              type="submit"
              className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : isLogin ? "Log In" : "Register Club"}
            </Button>
          </form>

          {role === 'clubadmin' && isLogin && (
            <div className="text-center text-sm text-gray-400 mt-4">
              Don't have an account?
              <button
                onClick={handleToggle}
                className="ml-1 font-medium text-green-400 hover:text-green-500 transition-colors duration-200"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Show signup form fields when in signup mode */}
          {role === 'clubadmin' && !isLogin && (
              <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Comprehensive Signup fields (Club Admin only) */}
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
                <div className="space-y-2">
                  <Label htmlFor="clubName" className="text-white">Club Name</Label>
                  <Input
                    id="clubName"
                    type="text"
                    placeholder="e.g., Green Buffaloes FC"
                    required
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                    className="bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-primary-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminName" className="text-white">Admin Full Name</Label>
                  <Input
                    id="adminName"
                    type="text"
                    placeholder="e.g., John Banda"
                    required
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-primary-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminRole" className="text-white">Admin Role</Label>
                  <Select onValueChange={setAdminRole} required>
                    <SelectTrigger className="bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-primary-500">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white">
                      <SelectItem value="Club Secretary">Club Secretary</SelectItem>
                      <SelectItem value="Registrar">Registrar</SelectItem>
                      <SelectItem value="Team Manager">Team Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-white">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="e.g., +260 977 123456"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-primary-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province" className="text-white">Province</Label>
                  <Select onValueChange={setProvince} required>
                    <SelectTrigger className="bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-primary-500">
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white">
                      <SelectItem value="Lusaka">Lusaka</SelectItem>
                      <SelectItem value="Copperbelt">Copperbelt</SelectItem>
                      <SelectItem value="Central">Central</SelectItem>
                      <SelectItem value="Eastern">Eastern</SelectItem>
                      <SelectItem value="Luapula">Luapula</SelectItem>
                      <SelectItem value="Muchinga">Muchinga</SelectItem>
                      <SelectItem value="Northern">Northern</SelectItem>
                      <SelectItem value="North-Western">North-Western</SelectItem>
                      <SelectItem value="Southern">Southern</SelectItem>
                      <SelectItem value="Western">Western</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clubDivision" className="text-white">Club Division/League</Label>
                  <Select onValueChange={setClubDivision} required>
                    <SelectTrigger className="bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-primary-500">
                      <SelectValue placeholder="Select division" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white">
                      <SelectItem value="Super League">Super League</SelectItem>
                      <SelectItem value="Division One">Division One</SelectItem>
                      <SelectItem value="Women's League">Women's League</SelectItem>
                      <SelectItem value="Provincial League">Provincial League</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="registrationDoc" className="text-white">Registration Document</Label>
                  <Input
                    id="registrationDoc"
                    type="file"
                    required
                    onChange={(e) => setRegistrationDoc(e.target.files[0])}
                    className="bg-gray-700 text-white file:bg-gray-600 file:text-white file:border-none file:rounded-md file:mr-2"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="logo" className="text-white">Club Logo (optional)</Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={e => setLogo(e.target.files ? e.target.files[0] : null)}
                    className="bg-gray-700 text-white file:bg-gray-600 file:text-white file:border-none file:rounded-md file:mr-2"
                  />
                </div>
              </div>
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
                {isLoading ? "Processing..." : "Register Club"}
              </Button>
            </form>
          )}

          {role === 'clubadmin' && !isLogin && (
            <div className="text-center text-sm text-gray-400 mt-4">
              Already have an account?
              <button
                onClick={handleToggle}
                className="ml-1 font-medium text-green-400 hover:text-green-500 transition-colors duration-200"
              >
                Log In
              </button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Updated button for demonstration purposes */}
      <div className="absolute top-4 right-4">
        <Button onClick={handleHome} variant="outline" className="bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700">
          Home
        </Button>
      </div>
    </div>
  );
}
