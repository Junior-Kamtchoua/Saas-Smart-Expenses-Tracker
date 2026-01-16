"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/money.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-md" />
          <span className="font-semibold text-lg text-gray-800">
            Smart Expense
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Welcome back
        </h1>
        <p className="text-gray-600 text-center mt-2">Log in to your account</p>

        {/* Form */}
        <div className="mt-8 space-y-5">
          {/* Email */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                rounded-lg
                px-4 py-3
                bg-white
                border-2 border-blue-200
                focus:border-blue-600
                focus:ring-4 focus:ring-blue-100
                outline-none
                transition
              "
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                rounded-lg
                px-4 py-3
                bg-white
                border-2 border-blue-200
                focus:border-blue-600
                focus:ring-4 focus:ring-blue-100
                outline-none
                transition
              "
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            onClick={handleLogin}
            className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-lg
              font-semibold
              hover:bg-blue-700
              transition
            "
          >
            Log In
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-8">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
