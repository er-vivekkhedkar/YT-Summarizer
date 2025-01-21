"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { nhost } from "@/lib/nhost";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signInError } = await nhost.auth.signIn({
        email,
        password,
      });

      if (signInError) throw new Error(signInError.message);

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-zinc-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#4f46e5_0%,_transparent_50%)] opacity-30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#e11d48_0%,_transparent_50%)] opacity-30"></div>
      <div className="absolute inset-0 backdrop-blur-[120px]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 p-8 relative z-10"
      >
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-300 to-white">
            Welcome Back
          </h2>
          <p className="text-zinc-400">Log in to your account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4">
            <p className="text-red-500 text-center text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-5">
            <div className="relative group">
              <input
                type="email"
                required
                className="w-full px-5 py-4 bg-white/5 border border-zinc-800 rounded-xl outline-none focus:border-red-500/50 transition-all duration-300 text-white"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="relative group">
              <input
                type="password"
                required
                className="w-full px-5 py-4 bg-white/5 border border-zinc-800 rounded-xl outline-none focus:border-red-500/50 transition-all duration-300 text-white"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="text-right">
            <Link 
              href="/forgot-password" 
              className="text-zinc-400 hover:text-red-500 text-sm transition-colors duration-300"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 p-4 text-white text-lg font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-zinc-400 text-center">
          Don&apos;t have an account?{" "}
          <Link 
            href="/signup" 
            className="text-white hover:text-red-500 transition-colors duration-300"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
