"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import CategorySelect from "./CategorySelect";
import toast from "react-hot-toast";

export default function TransactionForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    amount: "",
    category_id: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ ADD TRANSACTION
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.name || !formData.amount || !formData.category_id) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await fetch("http://localhost:3100/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount),
        }),
      });

      toast.success("Transaction added ✅");

      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch {
      toast.error("Failed to add transaction ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ CANCEL
  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            ➕ Add Transaction
          </h2>
          <p className="text-gray-500 text-sm">
            Create a new transaction
          </p>
        </div>

 {/* FORM */}
<form onSubmit={handleSubmit} className="space-y-6">

  <div className="grid grid-cols-2 gap-6">

    {/* NAME */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Transaction Name
      </label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g. Electricity Bill"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    {/* DATE */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Date
      </label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    {/* DESCRIPTION (FULL WIDTH) */}
    <div className="col-span-2">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Description
      </label>
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Optional"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>

    {/* AMOUNT */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Amount ($)
      </label>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="e.g. 100"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
      />
    </div>

    {/* CATEGORY */}
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Category
      </label>
      <div className="border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500">
        <CategorySelect
          value={formData.category_id}
          onChange={handleChange}
        />
      </div>
    </div>

  </div>

  {/* BUTTONS */}
  <div className="pt-4 flex gap-4 justify-center">

    <button
      type="submit"
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
    >
      {loading ? "Adding..." : "Add Transaction"}
    </button>

    <button
      type="button"
      onClick={handleCancel}
      className="border border-gray-300 text-gray-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition"
    >
      Cancel
    </button>

  </div>

</form>
      </div>
    </div>
  );
}