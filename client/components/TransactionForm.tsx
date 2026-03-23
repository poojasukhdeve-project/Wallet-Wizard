"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import CategorySelect from "./CategorySelect";

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

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ FIX CATEGORY CHANGE (IMPORTANT)
  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category_id: value,
    });
  };

  // ✅ SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log("Form Data:", formData); // 🔍 DEBUG

    if (!formData.name || !formData.amount || !formData.category_id) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: insertedData, error } = await supabase
        .from("transactions")
        .insert([
          {
            name: formData.name,
            amount: Number(formData.amount),
            date: formData.date || null,
            description: formData.description || null,
            category_id: formData.category_id,
            user_id: user.id,
          },
        ]);

      console.log("Insert Response:", insertedData, error); // 🔍 DEBUG

      if (error) throw error;

      toast.success("Transaction added ✅");

      // ✅ Reset form (optional)
      setFormData({
        name: "",
        date: "",
        description: "",
        amount: "",
        category_id: "",
      });

      router.push("/");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          ➕ Add Transaction
        </h2>
        <p className="text-gray-500 text-sm">
          Create a new transaction
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* NAME */}
        <div>
          <label className="text-sm text-gray-600">Transaction Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 border p-3 rounded-lg"
          />
        </div>

        {/* DATE */}
        <div>
          <label className="text-sm text-gray-600">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full mt-1 border p-3 rounded-lg"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm text-gray-600">Description</label>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 border p-3 rounded-lg"
          />
        </div>

        {/* AMOUNT */}
        <div>
          <label className="text-sm text-gray-600">Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full mt-1 border p-3 rounded-lg"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="text-sm text-gray-600">Category</label>
          <CategorySelect
            value={formData.category_id}
            onChange={handleCategoryChange} // ✅ FIXED
          />
        </div>

        {/* BUTTONS */}
        <div className="pt-4 space-y-3">

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Adding..." : "Add Transaction"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-full border py-3 rounded-lg"
          >
            Cancel
          </button>

        </div>
      </form>
    </div>
  );
}