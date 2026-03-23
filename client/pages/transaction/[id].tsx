"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategorySelect from "@/components/CategorySelect";
import toast from "react-hot-toast";

export default function TransactionDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    amount: "",
    category_id: "",
  });

  // ✅ FETCH TRANSACTION
  useEffect(() => {
    if (!id) return;

    fetch("http://localhost:3100/transactions")
      .then((res) => res.json())
      .then((data) => {
        const t = data.find((item: any) => item.id == id);

        if (t) {
          setFormData({
            name: t.name,
            date: t.date?.split("T")[0],
            description: t.description || "",
            amount: t.amount,
            category_id: t.category_id,
          });
        }
      });
  }, [id]);

  // ✅ HANDLE CHANGE
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ UPDATE TRANSACTION
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const data = {
        ...formData,
        amount: Number(formData.amount),
      };

      await fetch(`http://localhost:3100/transaction/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      toast.success("Transaction updated ✅");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch {
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ CANCEL (instead of delete)
  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            ✏️ Edit Transaction
          </h2>
          <p className="text-gray-500 text-sm">
            Update your transaction details
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Transaction Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
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

          {/* DESCRIPTION */}
          <div>
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

          {/* BUTTONS */}
          <div className="pt-4 space-y-3">

            {/* UPDATE */}
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Transaction"}
            </button>

            {/* CANCEL */}
            <button
              onClick={handleCancel}
              className="w-full border border-gray-300 text-gray-600 hover:bg-gray-100 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}