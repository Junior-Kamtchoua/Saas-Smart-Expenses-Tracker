"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-3 py-2 rounded-md font-medium ${
      pathname === path
        ? "bg-blue-100 text-blue-700"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside
      className="
        w-64
        bg-white
        border-r border-gray-200
        p-6
        h-screen
        fixed
        top-0
        left-0
        z-40
        overflow-y-auto
        md:static
        md:h-auto
        md:block
      "
    >
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-blue-600 rounded-md" />
        <span className="font-semibold text-lg text-gray-800">
          Smart Expense
        </span>
      </div>

      <nav className="space-y-2 text-sm">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>

        <Link href="/expenses" className={linkClass("/expenses")}>
          Expenses
        </Link>

        <Link href="/analytics" className={linkClass("/analytics")}>
          Analytics
        </Link>

        <Link href="/settings" className={linkClass("/settings")}>
          Settings
        </Link>
      </nav>
    </aside>
  );
}
