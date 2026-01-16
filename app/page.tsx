"use client";

import Link from "next/link";
import { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

const expenseBreakdownData = [
  { name: "Housing", value: 40, color: "#8b5cf6" }, // violet
  { name: "Food", value: 25, color: "#38bdf8" }, // bleu
  { name: "Transport", value: 25, color: "#fb923c" }, // orange
  { name: "Entertainment", value: 10, color: "#f472b6" }, // rose
];

const spendingOverviewData = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 2000 },
  { month: "Mar", amount: 1800 },
  { month: "Apr", amount: 2300 },
  { month: "May", amount: 2900 },
  { month: "Jun", amount: 2600 },
];

export default function HomePage() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <main className="min-h-screen bg-linear-to-b from-sky-100 via-blue-50 to-white relative overflow-hidden">
      {/*  HEADER */}
      <div
        className="absolute w-130 h-130 rounded-full
    animate-[orbit_18s_linear_infinite] pointer-events-none"
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 left-0
      w-15 h-15 bg-yellow-400 rounded-full
      flex items-center justify-center text-white font-bold shadow-xl"
        >
          $
        </div>
      </div>

      <header className="sticky top-4 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-white/40 px-6 py-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-xl" />
              <span className="font-semibold text-lg text-gray-900">
                Smart Expense Tracker
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-10 text-gray-600 font-medium">
              <a href="#features" className="hover:text-gray-900 transition">
                Features
              </a>
              <a href="#pricing" className="hover:text-gray-900 transition">
                Pricing
              </a>
              <a href="#faq" className="hover:text-gray-900 transition">
                FAQ
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <a
                href="/login"
                className="text-gray-600 hover:text-gray-900 transition font-medium"
              >
                Log In
              </a>
              <span> </span>
              <a
                href="/register"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative
  animate-[fadeIn_1s_ease-out]"
      >
        {/* LEFT */}
        <div className="animate-[slideUp_1s_ease-out]">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Take Control of <br />
            Your Finances
          </h1>

          <p className="mt-8 text-lg text-gray-600 max-w-xl">
            Easily track your expenses, set budgets, and gain clear insights
            into your financial habits with a modern and intuitive platform.
          </p>

          <div className="mt-10 flex items-center gap-5">
            <Link
              href="/register"
              className="px-7 py-3.5 rounded-xl bg-blue-600 text-white font-medium
  hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-xl
  transition-all duration-300"
            >
              Get Started
            </Link>

            <button
              onClick={() => setShowDemo(true)}
              className="
                relative group
                flex items-center gap-3
                px-6 py-3.5
                rounded-xl
                font-semibold
                text-blue-700
                bg-white
                border border-blue-200
                shadow-md
                hover:shadow-xl
                hover:-translate-y-0.5
                transition-all duration-300
                overflow-hidden
              "
            >
              <span className="absolute inset-0 bg-linear-to-r from-blue-500/20 via-sky-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="relative z-10 w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                ▶
              </span>

              <span className="relative z-10">Watch Demo</span>
            </button>
          </div>

          <p className="mt-10 text-sm text-gray-500">
            Trusted by over 10,000 users worldwide
          </p>
        </div>

        {/* RIGHT — ILLUSTRATION */}
        <div className="relative flex items-center justify-center">
          {/* ORBIT ZONE (VISIBLE) */}
          <div
            className="absolute w-130 h-130 rounded-full
    border border-blue-200/40"
          />

          {/* ORBIT 1 */}
          <div
            className="absolute w-130 h-130 rounded-full
    animate-[orbit_18s_linear_infinite] pointer-events-none"
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 left-0
      w-15 h-15 bg-yellow-400 rounded-full
      flex items-center justify-center text-white font-bold shadow-xl"
            >
              $
            </div>
          </div>

          {/* ORBIT 2 */}
          <div
            className="absolute w-155 h-155 rounded-full
    animate-[orbit_28s_linear_infinite] pointer-events-none"
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 left-0
      w-10 h-10 bg-green-500 rounded-full
      flex items-center justify-center text-white font-bold shadow-xl"
            >
              $
            </div>
          </div>

          <div
            className="absolute w-130 h-130 rounded-full
    animate-[orbit_20s_linear_infinite] pointer-events-none"
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 left-0
      w-12 h-12 bg-yellow-400 rounded-full
      flex items-center justify-center text-white font-bold shadow-xl"
            >
              $
            </div>
          </div>

          {/* ORBIT 2 */}
          <div
            className="absolute w-155 h-155 rounded-full
    animate-[orbit_26s_linear_infinite] pointer-events-none"
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 left-0
      w-13 h-13 bg-green-500 rounded-full
      flex items-center justify-center text-white font-bold shadow-xl"
            >
              $
            </div>
          </div>

          {/* GLASS CARD — RESTE GRANDE */}
          <div
            className="relative z-10 bg-white/70 backdrop-blur-xl
    rounded-3xl shadow-2xl p-10 border border-white/60
    w-105"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900">$12,450</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-500">Monthly Income</p>
                <p className="text-2xl font-bold text-gray-900">$5,200</p>
              </div>

              <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm">
                <div className="mb-2">
                  <p className="text-sm font-semibold text-gray-700">
                    Expense Breakdown
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm h-75">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseBreakdownData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        label
                      >
                        {expenseBreakdownData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm">
                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-700">
                    Spending Overview
                  </p>
                </div>

                <div className="h-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={spendingOverviewData}>
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY */}
      <section className="py-24">
        <p className="text-center text-sm text-gray-500 mb-12">
          Trusted by teams at
        </p>

        <div className="logo-scroll">
          <div className="logo-track">
            {/* Group 1 */}
            <div className="logo-group">
              <div className="logo-item">Google</div>
              <div className="logo-item">Slack</div>
              <div className="logo-item">Stripe</div>
              <div className="logo-item">Dropbox</div>
              <div className="logo-item">Amazon</div>
              <div className="logo-item">Netflix</div>
            </div>

            {/* Group 2 (clone exact) */}
            <div className="logo-group">
              <div className="logo-item">Google</div>
              <div className="logo-item">Slack</div>
              <div className="logo-item">Stripe</div>
              <div className="logo-item">Dropbox</div>
              <div className="logo-item">Amazon</div>
              <div className="logo-item">Netflix</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* VIDEO BACKGROUND */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/money.mp4"
              autoPlay
              loop
              muted
              playsInline
            />

            {/* BLUE OVERLAY */}
            <div className="absolute inset-0 bg-blue-600/25" />

            {/* CONTENT */}
            <div className="relative z-10 text-center px-6 py-28 text-white">
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to take control of your finances?
              </h2>

              <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
                Join thousands of users who already manage their money smarter.
                Start today — no credit card required.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="/register"
                  className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition"
                >
                  Get Started Free
                </a>

                <a
                  href="#"
                  className="border border-white/40 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 py-12">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Smart Expense. All rights reserved.
        </p>
      </footer>

      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          {/* Modal container */}
          <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white text-black rounded-full w-9 h-9 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            {/* Video */}
            <video
              src="/videos/demo.mp4"
              controls
              autoPlay
              className="w-full h-[70vh] object-cover"
            />
          </div>
        </div>
      )}
    </main>
  );
}
