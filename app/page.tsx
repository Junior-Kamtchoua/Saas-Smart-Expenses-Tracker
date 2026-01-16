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
  { name: "Housing", value: 40, color: "#8b5cf6" },
  { name: "Food", value: 25, color: "#38bdf8" },
  { name: "Transport", value: 25, color: "#fb923c" },
  { name: "Entertainment", value: 10, color: "#f472b6" },
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
      {/* HEADER */}
      <header className="sticky top-4 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-xl" />
              <span className="font-semibold text-base sm:text-lg text-gray-900">
                Smart Expense Tracker
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
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

            <div className="flex items-center gap-4">
              <a
                href="/login"
                className="text-gray-700 hover:text-gray-900 transition font-medium"
              >
                Log In
              </a>
              <a
                href="/register"
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Take Control of <br />
            Your Finances
          </h1>

          <p className="mt-8 text-base sm:text-lg text-gray-700 max-w-xl">
            Easily track your expenses, set budgets, and gain clear insights
            into your financial habits with a modern and intuitive platform.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="px-7 py-3.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 hover:shadow-lg transition"
            >
              Get Started
            </Link>

            <button
              onClick={() => setShowDemo(true)}
              className="
    relative
    group
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
              {/* Glow effect */}
              <span
                className="
      absolute inset-0
      bg-linear-to-r from-blue-500/20 via-sky-400/20 to-blue-500/20
      opacity-0 group-hover:opacity-100
      transition-opacity duration-300
    "
              />

              {/* Play icon */}
              <span
                className="
      relative z-10
      w-9 h-9
      rounded-full
      bg-blue-600
      text-white
      flex items-center justify-center
      shadow-md
      group-hover:scale-110
      transition-transform
    "
              >
                ▶
              </span>

              {/* Text */}
              <span className="relative z-10">Watch Demo</span>
            </button>
          </div>

          <p className="mt-8 text-sm text-gray-600">
            Trusted by over 10,000 users worldwide
          </p>
        </div>

        {/* RIGHT CARD */}
        <div className="relative flex items-center justify-center">
          <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/60 w-full max-w-md">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-600">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900">$12,450</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm text-gray-600">Monthly Income</p>
                <p className="text-2xl font-bold text-gray-900">$5,200</p>
              </div>

              <div className="col-span-2 bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Expense Breakdown
                </p>

                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseBreakdownData}
                        dataKey="value"
                        outerRadius={60}
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
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Spending Overview
                </p>

                <div className="h-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={spendingOverviewData}>
                      <XAxis tick={{ fontSize: 12 }} axisLine={false} />
                      <YAxis tick={{ fontSize: 12 }} axisLine={false} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 py-10">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Smart Expense. All rights reserved.
        </p>
      </footer>

      {/* DEMO MODAL*/}
      {showDemo && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div
            className="
              relative
              w-full
              h-full
              sm:h-auto
              sm:max-w-4xl
              bg-black
              rounded-none sm:rounded-xl
              overflow-hidden
            "
          >
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-3 right-3 z-10 bg-white text-black rounded-full w-9 h-9 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <video
              src="/videos/demo.mp4"
              controls
              autoPlay
              playsInline
              className="w-full h-full max-h-screen object-contain bg-black"
            />
          </div>
        </div>
      )}
    </main>
  );
}
