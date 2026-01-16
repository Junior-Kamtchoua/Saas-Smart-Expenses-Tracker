"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CATEGORIES } from "@/lib/categories";

type Budget = {
  id: string;
  category: string;
  amount: number;
};

export default function SettingsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch budgets
  useEffect(() => {
    const fetchBudgets = async () => {
      const { data, error } = await supabase.from("budget").select("*");

      if (!error && data) {
        setBudgets(data);
      }

      setLoading(false);
    };

    fetchBudgets();
  }, []);

  const getBudgetValue = (category: string) => {
    return budgets.find((b) => b.category === category)?.amount || "";
  };

  const updateBudget = (category: string, value: string) => {
    const amount = Number(value);

    setBudgets((prev) => {
      const existing = prev.find((b) => b.category === category);

      if (existing) {
        return prev.map((b) =>
          b.category === category ? { ...b, amount } : b
        );
      }

      return [...prev, { id: crypto.randomUUID(), category, amount }];
    });
  };

  const saveBudgets = async () => {
    setSaving(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("AUTH ERROR:", userError.message);
      alert("Auth error: " + userError.message);
      setSaving(false);
      return;
    }

    if (!user) {
      alert("No user connected");
      setSaving(false);
      return;
    }

    console.log("USER ID:", user.id);

    // Delete existing budgets
    const { error: deleteError } = await supabase
      .from("budget")
      .delete()
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("DELETE ERROR:", deleteError.message);
      alert("Delete error: " + deleteError.message);
      setSaving(false);
      return;
    }

    const rows = budgets.map((b) => ({
      user_id: user.id,
      category: b.category,
      amount: b.amount,
    }));

    console.log("ROWS TO INSERT:", rows);

    const { error: insertError } = await supabase.from("budget").insert(rows);

    if (insertError) {
      console.error("INSERT ERROR:", insertError.message);
      alert("Insert error: " + insertError.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    alert("Budgets saved successfully");
  };

  if (loading) {
    return <p className="text-gray-500">Loading settings…</p>;
  }

  return (
    <div className="max-w-xl space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h2 className="font-medium">Budgets per category</h2>

        {CATEGORIES.map((category) => (
          <div key={category} className="flex items-center gap-4">
            <span className="w-32 text-gray-600">{category}</span>

            <input
              type="number"
              placeholder="0"
              value={getBudgetValue(category)}
              onChange={(e) => updateBudget(category, e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
        ))}

        <button
          onClick={saveBudgets}
          disabled={saving}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {saving ? "Saving..." : "Save budgets"}
        </button>
      </div>
    </div>
  );
}
