"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2 } from "lucide-react";

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

export default function ExpensesPage() {
  // STATE

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const isFormValid = title.trim().length > 0 && Number(amount) > 0;

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

      setLoading(false);
    };

    fetchExpenses();
  }, []);

  // ADD EXPENSE

  const addExpense = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setFeedback({
        type: "error",
        message: "You must be logged in",
      });
      return;
    }

    const { error } = await supabase.from("expense").insert({
      user_id: user.id,
      title,
      amount: Number(amount),
      category,
    });

    if (error) {
      setFeedback({
        type: "error",
        message: error.message,
      });
      return;
    }

    // Reset form
    setTitle("");
    setAmount("");
    setCategory("");

    setFeedback({
      type: "success",
      message: "Expense added successfully",
    });

    setTimeout(() => setFeedback(null), 3000);

    // Refresh list
    const { data } = await supabase
      .from("expense")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setExpenses(data);
    }
  };

  // DELETE EXPENSE

  const deleteExpense = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) return;

    const { error } = await supabase.from("expense").delete().eq("id", id);

    if (error) {
      setFeedback({
        type: "error",
        message: error.message,
      });
      return;
    }

    setExpenses((prev) => prev.filter((e) => e.id !== id));

    setFeedback({
      type: "success",
      message: "Expense deleted",
    });

    setTimeout(() => setFeedback(null), 3000);
  };

  // UI

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">Expenses</h1>

      {/* FEEDBACK */}
      {feedback && (
        <div
          className={`p-3 rounded text-sm max-w-md ${
            feedback.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {/* ADD EXPENSE */}
      <div
        className="
    bg-white/70 backdrop-blur-md
    p-8
    rounded-2xl
    shadow-lg
    border border-white/40
    lg:col-span-1
  "
      >
        <h2 className="font-medium mb-4">Add expense</h2>

        <select
          className="w-full border rounded p-2 mb-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Rent">Rent</option>
          <option value="Internet">Internet</option>
        </select>

        <input
          className="w-full border rounded p-2 mb-3"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border rounded p-2 mb-4"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={addExpense}
          disabled={!isFormValid}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
        >
          <span className="flex items-center gap-2 justify-center">
            <Plus size={16} />
            Add Expense
          </span>
        </button>
      </div>

      {/* EXPENSE LIST */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-md lg:col-span-2">
        <h2 className="font-medium mb-4">Your expenses</h2>

        {loading && <p className="text-gray-500">Loading…</p>}

        {!loading && expenses.length === 0 && (
          <p className="text-gray-500">No expenses yet</p>
        )}

        <div className="space-y-4">
          {expenses.map((e) => (
            <div
              key={e.id}
              className="
    flex items-center justify-between
    bg-white/80
    px-5 py-4
    rounded-xl
    shadow-sm
    hover:bg-blue-50
    hover:shadow-md
    transition-all
    cursor-pointer
  "
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                  {e.category?.[0] || "?"}
                </div>

                <div>
                  <div className="font-medium text-gray-800">{e.title}</div>
                  <div className="text-sm text-gray-500">
                    {e.category || "No category"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Amount */}
                <div className="text-lg font-semibold text-gray-900">
                  ${e.amount}
                </div>

                {/* Delete */}
                <button
                  onClick={() => deleteExpense(e.id)}
                  className="text-gray-400 hover:text-red-600 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
