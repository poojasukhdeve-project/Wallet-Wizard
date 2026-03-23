"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../lib/supabase";

export default function CategoryDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ FETCH CATEGORY FROM SUPABASE
  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;

      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("category")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (error) {
        toast.error("Failed to load category ❌");
        return;
      }

      if (data) {
        setName(data.name);
      }
    };

    fetchCategory();
  }, [id]);

  // ✅ UPDATE CATEGORY (SUPABASE)
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        toast.error("Not authorized");
        return;
      }

      const { error } = await supabase
        .from("category")
        .update({ name })
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

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

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Category"}
            </button>

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