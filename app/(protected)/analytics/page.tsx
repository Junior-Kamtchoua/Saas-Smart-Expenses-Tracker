"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#22c55e",
  Transport: "#3b82f6",
  Rent: "#ef4444",
  Internet: "#f59e0b",
};

type Period = "7d" | "30d" | "12m";

export default function AnalyticsPage() {
  // STATE

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("30d");

  // FETCH DATA

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await supabase.from("expense").select("*");

      if (!error && data) {
        setExpenses(data);
      }

      setLoading(false);
    };

    fetchExpenses();
  }, []);

  const now = new Date();
  const filteredExpenses = expenses.filter((expense) => {
    const date = new Date(expense.created_at);

    if (period === "7d") {
      const sevenDaysAgo = new Date(now);
      sevenDaysAgo.setDate(now.getDate() - 7);
      return date >= sevenDaysAgo;
    }

    if (period === "30d") {
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
      return date >= thirtyDaysAgo;
    }

    // 12 months
    const twelveMonthsAgo = new Date(now);
    twelveMonthsAgo.setMonth(now.getMonth() - 12);
    return date >= twelveMonthsAgo;
  });

  // CALCULATIONS

  // Total
  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Average per expense
  const average =
    filteredExpenses.length > 0
      ? Math.round(total / filteredExpenses.length)
      : 0;

  // Totals by category
  const totalsByCategory = filteredExpenses.reduce((acc, e) => {
    const cat = e.category || "No category";
    acc[cat] = (acc[cat] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(totalsByCategory).map(
    ([name, value]) => ({ name, value })
  );

  // Totals by month
  const monthTotalsByCategory = filteredExpenses.reduce((acc, e) => {
    const date = new Date(e.created_at);
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    const category = e.category || "No category";

    if (!acc[month]) {
      acc[month] = { month };
    }

    acc[month][category] = ((acc[month][category] as number) || 0) + e.amount;

    return acc;
  }, {} as Record<string, Record<string, number | string>>);

  const monthData = Object.values(monthTotalsByCategory);

  const hasExpenses = filteredExpenses.length > 0;

  // INSIGHTS

  // Biggest category
  let biggestCategory: { name: string; amount: number } | null = null;

  if (hasExpenses) {
    for (const [category, amount] of Object.entries(totalsByCategory)) {
      if (!biggestCategory || amount > biggestCategory.amount) {
        biggestCategory = {
          name: category,
          amount,
        };
      }
    }
  }

  // Percentage of biggest category
  const biggestCategoryPercent =
    biggestCategory && total > 0
      ? Math.round((biggestCategory.amount / total) * 100)
      : null;

  // MONTH OVER MONTH COMPARISON

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const previousMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const previousMonth = previousMonthDate.getMonth();
  const previousYear = previousMonthDate.getFullYear();

  const currentMonthTotal = filteredExpenses
    .filter((e) => {
      const d = new Date(e.created_at);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, e) => sum + e.amount, 0);

  const previousMonthTotal = filteredExpenses
    .filter((e) => {
      const d = new Date(e.created_at);
      return d.getMonth() === previousMonth && d.getFullYear() === previousYear;
    })
    .reduce((sum, e) => sum + e.amount, 0);

  let comparisonMessage: string | null = null;

  if (previousMonthTotal > 0 && currentMonthTotal > 0) {
    const diff = currentMonthTotal - previousMonthTotal;
    const percent = Math.round((diff / previousMonthTotal) * 100);

    if (percent > 0) {
      comparisonMessage = `📈 You spent ${percent}% more than last month.`;
    } else if (percent < 0) {
      comparisonMessage = `📉 You spent ${Math.abs(
        percent
      )}% less than last month.`;
    } else {
      comparisonMessage = "➖ Your spending is stable compared to last month.";
    }
  }

  let comparisonPercent: number | null = null;

  if (comparisonMessage) {
    const match = comparisonMessage.match(/(\d+)%/);
    if (match) {
      comparisonPercent = Number(match[1]);
    }
  }

  let comparisonType: "up" | "down" | "same" | null = null;

  if (comparisonMessage?.includes("more")) comparisonType = "up";
  if (comparisonMessage?.includes("less")) comparisonType = "down";
  if (comparisonMessage?.includes("stable")) comparisonType = "same";

  // UI

  if (loading) {
    return <p className="text-gray-500">Loading analytics…</p>;
  }

  const periods: { label: string; value: Period }[] = [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 12 months", value: "12m" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* TITLE */}
      <h1 className="text-2xl font-semibold text-gray-800">Analytics</h1>
      {/* PERIOD FILTER */}
      <div className="flex gap-2">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              period === p.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total spent" value={hasExpenses ? `$${total}` : "—"} />

        <StatCard
          label="Number of expenses"
          value={hasExpenses ? expenses.length : "—"}
        />

        <StatCard
          label="Average expense"
          value={hasExpenses ? `$${average}` : "—"}
        />
      </div>

      {/* INSIGHTS */}
      {hasExpenses && biggestCategory && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 transition transform hover:-translate-y-0.5 hover:shadow-sm text-sm text-indigo-700">
          <p className="font-medium">📊 Spending insight</p>
          <p className="mt-1">
            Your biggest spending category is{" "}
            <strong>{biggestCategory.name}</strong> with{" "}
            <strong>${biggestCategory.amount}</strong>, accounting for{" "}
            <strong>{biggestCategoryPercent}%</strong> of your total expenses.
          </p>
        </div>
      )}

      {/* MONTH COMPARISON */}
      {hasExpenses && comparisonMessage && (
        <div
          className={`rounded-lg transition transform hover:-translate-y-0.5 hover:shadow-sm p-4 text-sm border ${
            comparisonType === "up"
              ? "bg-red-50 border-red-200 text-red-700"
              : comparisonType === "down"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-gray-50 border-gray-200 text-gray-600"
          }`}
        >
          <p className="font-medium flex items-center gap-2">
            {comparisonType === "up" && "📈"}
            {comparisonType === "down" && "📉"}
            {comparisonType === "same" && "➖"}
            Monthly comparison
            {comparisonPercent !== null && (
              <span
                className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${
                  comparisonType === "up"
                    ? "bg-red-100 text-red-700"
                    : comparisonType === "down"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {comparisonType === "up" && "+"}
                {comparisonType === "down" && "-"}
                {comparisonPercent}%
              </span>
            )}
          </p>

          <p className="mt-1">{comparisonMessage}</p>
        </div>
      )}

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-medium mb-4">Spending over time</h2>

          {hasExpenses ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />

                  <Bar dataKey="Food" stackId="a" fill={CATEGORY_COLORS.Food} />
                  <Bar
                    dataKey="Transport"
                    stackId="a"
                    fill={CATEGORY_COLORS.Transport}
                  />
                  <Bar dataKey="Rent" stackId="a" fill={CATEGORY_COLORS.Rent} />
                  <Bar
                    dataKey="Internet"
                    stackId="a"
                    fill={CATEGORY_COLORS.Internet}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState
              title="No spending data yet"
              description="Your spending over time will appear here once you add expenses."
            />
          )}
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-medium mb-4">Spending by category</h2>

          {hasExpenses ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                  >
                    {categoryData.map((entry) => (
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
          ) : (
            <EmptyState
              title="No categories yet"
              description="Once you add expenses, you’ll see how they are split by category."
            />
          )}
        </div>
      </div>
    </div>
  );
}

// SMALL COMPONENT

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm transition transform hover:-translate-y-1 hover:shadow-md">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="h-64 flex flex-col items-center justify-center text-center text-gray-400">
      <p className="font-medium text-gray-500">{title}</p>
      <p className="text-sm mt-1">{description}</p>
    </div>
  );
}
