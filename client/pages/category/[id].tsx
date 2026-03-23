"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoryDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ FETCH CATEGORY DATA
  useEffect(() => {
    if (!id) return;

    fetch("http://localhost:3100/category")
      .then((res) => res.json())
      .then((data) => {
        const c = data.find((item: any) => item.id == id);
        if (c) setName(c.name);
      });
  }, [id]);

  // ✅ UPDATE CATEGORY
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await fetch(`http://localhost:3100/category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      toast.success("Category updated ✅");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch {
      toast.error("Update failed ❌");
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

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            ✏️ Edit Category
          </h2>
          <p className="text-gray-500 text-sm">
            Update your category name
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* CATEGORY NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* BUTTONS */}
          <div className="pt-4 space-y-3">

            {/* UPDATE */}
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Category"}
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