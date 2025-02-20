import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // shadcn Input component
import { Button } from "@/components/ui/button"; // shadcn Button component
import { Label } from "@/components/ui/label"; // shadcn Label component
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Icons for show/hide password

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Add your login logic here
  };

  const handleGoogleSignUp = () => {
    console.log("Google Sign Up");
    // Add your Google sign-up logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon size={20} />
                ) : (
                  <EyeIcon size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        {/* Google Sign-Up Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignUp}
        >
          Sign up with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
