import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        let decoded;
        try {
          decoded = jwtDecode(data.token);
        } catch (e) {
          setError("Invalid token received.");
          setIsLoading(false);
          return;
        }
        setSuccess(`${isLogin ? "Login" : "Signup"} successful. Redirecting...`);
        setTimeout(() => {
          if (decoded.role === "superadmin") {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
      <Card className="w-full max-w-lg bg-gray-900 text-white border border-gray-700 rounded-xl shadow-lg">
        <CardHeader className="text-center pb-0">
          {/* Role Selector */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-200 ${role === 'clubadmin' ? 'bg-blue-700 text-white' : 'bg-gray-800 text-gray-400'}`}
              onClick={() => { setRole('clubadmin'); setIsLogin(true); }}
            >
              Club Admin
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-t-lg font-semibold transition-colors duration-200 ${role === 'superadmin' ? 'bg-blue-700 text-white' : 'bg-gray-800 text-gray-400'}`}
              onClick={() => { setRole('superadmin'); setIsLogin(true); }}
            >
              Super Admin
            </button>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-100">
            {role === 'superadmin'
              ? 'Super Admin Login'
              : isLogin ? 'Log In' : 'Club Sign Up'}
          </CardTitle>
          <p className="text-sm text-gray-400 mt-1">
            {role === 'superadmin'
              ? 'Enter your super admin credentials'
              : isLogin
                ? 'Enter your credentials to access the portal'
                : 'Register your club to get started'}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Login/Signup fields */}
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
              {/* Comprehensive Signup fields (Club Admin only) */}
              {role === 'clubadmin' && !isLogin && (
                <>
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
                </>
              )}
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
              {isLoading ? "Processing..." : isLogin ? "Log In" : "Register Club"}
            </Button>
          </form>
          {role === 'clubadmin' && (
            <div className="text-center text-sm text-gray-400 mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={handleToggle}
                className="ml-1 font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </div>
          )}
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
