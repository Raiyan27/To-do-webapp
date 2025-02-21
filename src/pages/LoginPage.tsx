import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, GoogleAuthProvider } from "../Auth/firebase.init";
import { toast } from "react-toastify";
import axiosInstance from "../Routes/Axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
      toast.success("Logged in successfully!");
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      toast.success("Failed to login!");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await axiosInstance.post("users/signup", {
        name: user.displayName || "Unknown",
        email: user.email || "unknown@example.com",
      });

      navigate("/home");
      toast.success("Google sign-up successful!");
    } catch (error: any) {
      console.error("Error during Google Sign-In:", error.message);
      toast.error(error.message || "An error occurred during Google sign-up.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignUp}
        >
          Sign up with Google
        </Button>
        <h2 className="text-center">
          Don't have an account?{" "}
          <Link className="text-blue-500" to="signup">
            SignUp
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default LoginPage;
