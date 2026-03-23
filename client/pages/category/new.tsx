"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // ✅ ADD CATEGORY
  const handleAdd = async () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setLoading(true);

      await fetch("http://localhost:3100/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      toast.success("Category added ✅");

      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch {
      toast.error("Failed to add category ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ CANCEL
  const handleCancel = () => {
    router.push("/");
  };

  // ✅ ENTER KEY SUBMIT
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            ➕ Add Category
          </h2>
          <p className="text-gray-500 text-sm">
            Create a new category
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Food, Travel, Bills"
              autoFocus
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* BUTTONS */}
          <div className="pt-4 space-y-3">

            {/* ADD */}
            <button
              onClick={handleAdd}
              disabled={loading || !name.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Category"}
            </button>

            {/* CANCEL */}
            <button
              onClick={handleCancel}
              className="w-full border border-gray-300 text-gray-600 hover:bg-gray-100 active:scale-95 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}