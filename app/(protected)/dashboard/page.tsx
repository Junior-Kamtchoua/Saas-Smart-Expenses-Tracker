"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#22c55e", // green
  Transport: "#3b82f6", // blue
  Rent: "#ef4444", // red
  Internet: "#f59e0b", // yellow
};

/**
 * Expense type
 */
type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string | null;
  created_at: string;
};

type MonthlyExpenses = {
  month: string;
  [category: string]: number | string;
};

export default function DashboardPage() {
  const allCategories = CATEGORIES;

  // STATE

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [budgets, setBudgets] = useState<
    { category: string; amount: number }[]
  >([]);

  // FETCH DATA

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await supabase
        .from("expense")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setExpenses(data);
      }
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const nameFromMeta =
          user.user_metadata?.full_name || user.user_metadata?.name || null;

        if (nameFromMeta) {
          setFirstName(nameFromMeta.split(" ")[0]);
        } else if (user.email) {
          setFirstName(user.email.split("@")[0]);
        }
      }

      if (user?.user_metadata?.avatar_url) {
        setAvatarUrl(user.user_metadata.avatar_url);
      }

      setLoading(false);
    };

    const fetchBudgets = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("budget")
        .select("category, amount")
        .eq("user_id", user.id);

      console.log("RAW budgets from DB:", data);

      if (!error && data) {
        setBudgets(data);
      }
    };

    fetchBudgets();

    fetchExpenses();
  }, []);

  // CALCULATIONS

  // Total expenses
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Current month total
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyTotal = expenses
    .filter((expense) => {
      const date = new Date(expense.created_at);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  // Totals by category
  const totalsByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category || "No category";
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(totalsByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  // Expenses by month + category

  const expensesByMonthAndCategory = expenses.reduce<
    Record<string, MonthlyExpenses>
  >((acc, expense) => {
    const date = new Date(expense.created_at);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    const category = expense.category || "Other";

    // Si le mois n'existe pas encore, on le crée
    if (!acc[key]) {
      acc[key] = { month: key };
    }

    // On ajoute le montant dans la bonne catégorie
    acc[key][category] =
      ((acc[key][category] as number | undefined) || 0) + expense.amount;

    return acc;
  }, {});

  // Données finales pour le graphique
  const barData: MonthlyExpenses[] = Object.values(expensesByMonthAndCategory);

  const budgetsByCategory = budgets.reduce((acc, b) => {
    acc[b.category] = b.amount;
    return acc;
  }, {} as Record<string, number>);

  console.log("budgetsByCategory:", budgetsByCategory);
  console.log("allCategories:", allCategories);

  // UI

  if (loading) {
    return <p className="text-gray-500">Loading dashboard…</p>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10">
      {/* PAGE TITLE */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-900">
          Welcome back{firstName ? `, ${firstName}` : ""} 👋
        </h1>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold overflow-hidden">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="User avatar"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <span>{firstName ? firstName[0].toUpperCase() : "U"}</span>
          )}
        </div>
      </div>

      {expenses.length === 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-medium text-blue-800">
              Your dashboard is empty for now
            </p>
            <p className="text-sm text-blue-700 mt-1">
              You haven’t added any transactions yet. Add your first expense to
              unlock insights and charts.
            </p>
          </div>

          <a
            href="/expenses"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Add your first expense
          </a>
        </div>
      )}

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Balance"
          value={`$${total}`}
          subtitle={
            expenses.length === 0 ? "No transactions yet" : "All-time spending"
          }
        />

        <DashboardCard
          title="Monthly Income"
          value="—"
          subtitle="Not available yet"
        />

        <DashboardCard
          title="Monthly Expenses"
          value={`$${monthlyTotal}`}
          subtitle={
            monthlyTotal === 0 ? "No expenses this month" : "Current month"
          }
          accent={monthlyTotal > 0 ? "red" : undefined}
        />

        <div className="bg-white p-6 rounded-xl shadow-sm space-y-3">
          <h3 className="text-sm text-gray-500">Budget Overview</h3>

          {Object.entries(totalsByCategory).length === 0 && (
            <p className="text-gray-400 text-sm">
              No expenses yet. Add expenses to track your budgets.
            </p>
          )}

          {allCategories.map((category) => {
            const spent = totalsByCategory[category] || 0;
            const budget = budgetsByCategory[category];

            if (!budget) {
              return (
                <div key={category} className="text-sm text-gray-500">
                  {category}: no budget set
                </div>
              );
            }

            const isOver = spent > budget;
            const percent = Math.round((spent / budget) * 100);

            return (
              <div key={category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{category}</span>
                  <span className={isOver ? "text-red-600" : "text-green-600"}>
                    ${spent} / ${budget}
                  </span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      isOver ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>

                {isOver && (
                  <p className="text-xs text-red-600">⚠️ Budget exceeded</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-medium mb-4">Expense breakdown</h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={CATEGORY_COLORS[entry.name] || "#9ca3af"}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-medium mb-2">Expenses by month</h2>

          {/* LÉGENDE */}
          <div className="flex justify-center gap-6 mb-4 text-sm">
            {CATEGORIES.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[category] }}
                />
                <span>{category}</span>
              </div>
            ))}
          </div>

          {/* GRAPHIQUE */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="month" />
                <YAxis />

                {CATEGORIES.map((category) => (
                  <Bar
                    key={category}
                    dataKey={category}
                    stackId="a"
                    fill={CATEGORY_COLORS[category]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// SMALL COMPONENT

function DashboardCard({
  title,
  value,
  subtitle,
  accent,
}: {
  title: string;
  value: string;
  subtitle?: string;
  accent?: "green" | "red";
}) {
  const accentColor =
    accent === "green"
      ? "text-green-600"
      : accent === "red"
      ? "text-red-600"
      : "text-gray-400";

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-sm text-gray-500 mb-2">{title}</h3>

      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">{value}</div>
        {subtitle && (
          <span className={`text-xs ${accentColor}`}>{subtitle}</span>
        )}
      </div>
    </div>
  );
}
