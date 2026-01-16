"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { getUserServer } from "@/lib/getUser";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Menu, X } from "lucide-react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🔹 UI STATE (mobile sidebar only)
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar panel */}
          <aside className="absolute inset-y-0 left-0 w-64 bg-white p-6 shadow-lg">
            {/* Close button */}
            <button
              className="mb-6 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} />
            </button>

            <Sidebar />
          </aside>
        </div>
      )}

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>

          <h1 className="font-semibold text-gray-800">Dashboard</h1>

          <div className="flex items-center gap-4">
            <Header />
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
