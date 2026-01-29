"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  School,
  GraduationCap,
  User,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    // ✅ ALWAYS redirect to root
    router.push("/");

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #404040 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1a1a1a] border border-[#333333] shadow-2xl p-8 md:p-10 rounded-2xl w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2d2d2d] rounded-full mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-[#808080] text-sm">
            Sign in to your account
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 text-center text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">
            <Mail className="inline w-4 h-4 mr-2" />
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full bg-[#2d2d2d] border border-[#404040] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#808080]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-white text-sm font-medium mb-2">
            <Lock className="inline w-4 h-4 mr-2" />
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
              className="w-full bg-[#2d2d2d] border border-[#404040] text-white p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#808080]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#808080]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#404040] hover:bg-[#6b6b6b] text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full" />
              Logging in...
            </>
          ) : (
            <>
              <LogIn size={20} />
              Login
            </>
          )}
        </motion.button>

        {/* Roles */}
        <div className="mt-6 pt-6 border-t border-[#333333]">
          <p className="text-center text-[#6b6b6b] text-xs mb-3">
            Supported Roles
          </p>
          <div className="flex justify-center gap-4">
            <Role icon={Shield} label="Admin" />
            <Role icon={School} label="School" />
            <Role icon={GraduationCap} label="Teacher" />
            <Role icon={User} label="Student" />
          </div>
        </div>
      </motion.form>
    </div>
  );
}

function Role({
  icon: Icon,
  label,
}: {
  icon: any;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon className="w-5 h-5 text-[#808080]" />
      <span className="text-[#6b6b6b] text-xs">{label}</span>
    </div>
  );
}
