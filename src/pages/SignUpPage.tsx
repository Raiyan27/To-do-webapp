import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, GoogleAuthProvider } from "../Auth/firebase.init";
import axiosInstance from "../Routes/Axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      const response = await axiosInstance.post("/users/signup", {
        name,
        email,
      });

      if (response.data.message === "User already exists") {
        toast.warn("User already exists. Please log in.");
      } else {
        toast.success("Sign up successful!");
        navigate("/home");
      }
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      toast.error(error.message || "An error occurred during sign-up.");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await axiosInstance.post("users/signup", {
        name: user.displayName || "Unknown",
        email: user.email || "unknown@example.com",
      });

      if (response.data.message === "User already exists") {
        toast.warn("User already exists. Please log in.");
      } else {
        toast.success("Google sign-up successful!");
        navigate("/home");
      }
    } catch (error: any) {
      console.error("Error during Google Sign-In:", error.message);
      toast.error(error.message || "An error occurred during Google sign-up.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="photoURL">Photo URL</Label>
            <Input
              id="photoURL"
              type="url"
              placeholder="Enter your photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignUp}
        >
          Sign Up with Google
        </Button>
        <h2 className="text-center">
          Already have an account?{" "}
          <Link className="text-blue-500" to="/">
            Login
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default SignUpPage;
