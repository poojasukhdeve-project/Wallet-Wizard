"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import toast from "react-hot-toast";

// TYPES
type Category = {
  id: string;
  name: string;
  created_at: string;
};

type Transaction = {
  id: string;
  name: string;
  category_id: string;
  amount: number;
  date: string;
  created_at: string;
  category?: { name: string }; // ✅ FIX
};

type CategoryChart = {
  category: string;
  amount: number;
};

type PieType = {
  name: string;
  value: number;
};

type MonthlyType = {
  month: string;
  amount: number;
  index: number;
};

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function Index() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const router = useRouter();

  // 🔐 AUTH + FETCH FROM SUPABASE
  useEffect(() => {
    const checkUserAndFetch = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.push("/login");
        return;
      }

      // ✅ FETCH CATEGORIES (USER SAFE)
      const { data: catData, error: catError } = await supabase
        .from("category")
        .select("*")
        .eq("user_id", user.id)
        .eq("deleted", false);

      if (catError) {
        toast.error("Failed to load categories");
      } else {
        setCategories(catData || []);
      }

      // ✅ FETCH TRANSACTIONS WITH CATEGORY JOIN
      const { data: txnData, error: txnError } = await supabase
        .from("transactions")
        .select(`
          *,
          category:category_id (name)
        `)
        .eq("user_id", user.id)
         .eq("deleted", false); // ✅ SOFT DELETE;

      if (txnError) {
        toast.error("Failed to load transactions ❌");
      } else {
        setTransactions(txnData || []);
      }
    };

    checkUserAndFetch();
  }, []);

  // ✅ FIXED TOTAL
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  // ✅ FIXED CHART DATA (NO category_name)
  const chartData: CategoryChart[] = Object.values(
    transactions.reduce((acc: Record<string, CategoryChart>, t) => {
      const name = t.category?.name || "Unknown";

      if (!acc[name]) {
        acc[name] = { category: name, amount: 0 };
      }

      acc[name].amount += t.amount / 100; // ✅ FIXED AMOUNT
      return acc;
    }, {})
  );

  const pieData: PieType[] = Object.values(
    transactions.reduce((acc: Record<string, PieType>, t) => {
      const name = t.category?.name || "Unknown";

      if (!acc[name]) {
        acc[name] = { name, value: 0 };
      }

      acc[name].value += t.amount / 100; // ✅ FIXED AMOUNT
      return acc;
    }, {})
  );

  const monthlyData: MonthlyType[] = Object.values(
    transactions.reduce((acc: Record<string, MonthlyType>, t) => {
      const date = new Date(t.date);
      const monthIndex = date.getMonth();
      const month = date.toLocaleString("default", { month: "short" });

      if (!acc[month]) {
        acc[month] = { month, amount: 0, index: monthIndex };
      }

      acc[month].amount += t.amount / 100; // ✅ FIXED AMOUNT
      return acc;
    }, {})
  ).sort((a, b) => a.index - b.index);

  const topCategory =
    chartData.length > 0
      ? chartData.reduce((max, curr) =>
          curr.amount > max.amount ? curr : max
        )
      : null;

  const maxTransaction =
    transactions.length > 0
      ? transactions.reduce((max, t) =>
          t.amount > max.amount ? t : max
        )
      : null;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">💰 Wallet Wizard</h2>

        <nav className="space-y-3">
          <Link href="/" className="block p-2 rounded bg-blue-100 text-blue-600">
            Dashboard
          </Link>
          <Link href="/transaction/new" className="block p-2 hover:bg-gray-100">
            Add Transaction
          </Link>
          <Link href="/category/new" className="block p-2 hover:bg-gray-100">
            Add Category
          </Link>

          {/* 🔓 LOGOUT */}
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
            className="block p-2 text-red-500 hover:bg-gray-100 rounded"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN (UNCHANGED UI) */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          💰 Dashboard Overview
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <p>Total Spend</p>
            <h2 className="text-3xl font-bold">
              ${(totalAmount / 100).toFixed(2)}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <p>Transactions</p>
            <h2 className="text-3xl font-bold">{transactions.length}</h2>
          </div>

          <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <p>Categories</p>
            <h2 className="text-3xl font-bold">{categories.length}</h2>
          </div>

        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-2 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="mb-4 font-semibold">📊 Spending by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip
                     formatter={(value: any) => `$${value}`}
                />
                <Bar dataKey="amount" fill="#3b82f6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="mb-4 font-semibold">🥧 Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  label={({ value }) => `$${value}`}
>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                    formatter={(value: any) => `$${value}`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* MONTHLY TREND */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <h2 className="mb-4 font-semibold">📈 Monthly Spending Trend</h2>

          <ResponsiveContainer width="100%" height={300}>
           <LineChart data={monthlyData}>
    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

    <XAxis dataKey="month" />

    <YAxis
      tickFormatter={(value) => `$${value}`}
    />

    <Tooltip
      formatter={(value: any) => `$${value}`}
      contentStyle={{ borderRadius: "10px", border: "none" }}
    />

    <Line
      type="monotone"
      dataKey="amount"
      stroke="#3b82f6"
      strokeWidth={3}
      dot={{ r: 5 }}
      activeDot={{ r: 8 }}
    />
  </LineChart>
          </ResponsiveContainer>
        </div>

        {/* INSIGHTS */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <h2 className="mb-4 font-semibold">💡 Insights</h2>

          <div className="space-y-2 text-gray-700">

            {topCategory ? (
              <p>
                You spent the most on <b>{topCategory.category}</b> (${topCategory.amount.toFixed(2)})
              </p>
            ) : null}

            {maxTransaction ? (
              <p>
                Your highest transaction was <b>{maxTransaction.name}</b> (${(maxTransaction.amount / 100).toFixed(2)})
              </p>
            ) : null}

            <p>
              You made <b>{transactions.length}</b> transactions.
            </p>

          </div>
        </div>

        {/* CATEGORY TABLE */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">📂 Categories</h2>

          <Link href="/category/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Add
          </Link>
        </div>

        <table className="w-full">

          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-400">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((c, i) => (
                <tr
                  key={c.id}
                  className="border-b hover:bg-blue-50 transition even:bg-gray-50"
                >
                  <td className="p-3">{i + 1}</td>

                  <td className="p-3 text-blue-600 font-medium">
                    {c.name}
                  </td>

                  <td className="p-3">
                    {new Date(c.created_at).toLocaleString()}
                  </td>

                  <td className="p-3 space-x-2">
                    <Link
                      href={`/category/${c.id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={async () => {
                        if (!confirm("Delete?")) return;

                        const { data } = await supabase.auth.getUser();
                        const user = data.user;

                        if (!user) {
                          toast.error("Not authorized");
                          return;
                        }

                        const { error } = await supabase
                          .from("category")
                          .update({ deleted: true }) 
                          .eq("id", c.id)
                          .eq("user_id", user.id);

                        if (error) {
                          toast.error("Delete failed");
                          return;
                        }

                        setCategories((prev) => prev.filter((x) => x.id !== c.id));
                        toast.success("Deleted");
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">💳 Transactions</h2>

          <Link href="/transaction/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Add
          </Link>
        </div>

        <table className="w-full">

          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Transaction</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-6 text-gray-400">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((t, i) => (
                <tr
                  key={t.id}
                  className="border-b hover:bg-blue-50 transition even:bg-gray-50"
                >
                  <td className="p-3">{i + 1}</td>

                  <td className="p-3 text-blue-600 font-medium">
                    {t.name}
                  </td>

                  {/* ✅ FIXED CATEGORY */}
                  <td className="p-3">
                    {t.category?.name || "N/A"}
                  </td>

                  <td className="p-3">
                    {new Date(t.date).toLocaleDateString()}
                  </td>

                  {/* ✅ FIXED AMOUNT */}
                  <td className="p-3 text-green-600 font-semibold">
                    ${Number(t.amount/100).toFixed(2)}
                  </td>

                  <td className="p-3">
                    {new Date(t.created_at).toLocaleString()}
                  </td>

                  <td className="p-3 space-x-2">
                    <Link
                      href={`/transaction/${t.id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg"
                    >
                      Edit
                    </Link>

                    <button
  onClick={async (): Promise<void> => {
    if (!confirm("Delete?")) return;

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
      toast.error("Not authorized");
      return;
    }

    const { error } = await supabase
      .from("transactions")
      .update({ deleted: true })
      .eq("id", t.id)
      .eq("user_id", user.id);

    if (error) {
      toast.error("Delete failed ❌");
      return;
    }

    setTransactions((prev: Transaction[]) =>
      prev.filter((x) => x.id !== t.id)
    );

    toast.success("Deleted ✅");
  }}
  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
>
  Delete
</button>
                    
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      </main>
    </div>
  );
}