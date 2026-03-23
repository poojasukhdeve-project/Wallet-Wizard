"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategorySelect from "@/components/CategorySelect";
import toast from "react-hot-toast";
import { supabase } from "../../lib/supabase";

export default function TransactionDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    amount: "",
    category_id: "",
  });

  // ✅ FETCH TRANSACTION
  useEffect(() => {
    if (!id) return; // ✅ VERY IMPORTANT FIX

    const fetchTransaction = async () => {
      try {
        setPageLoading(true);

        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;

        if (!user) {
          router.push("/login");
          return;
        }

        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .eq("id", id as string) // ✅ FIX TYPE
          .eq("user_id", user.id)
          .single();

        if (error || !data) {
          console.error("Fetch error:", error);
          toast.error("Failed to load transaction ❌");
          return;
        }

        setFormData({
          name: data.name || "",
          date: data.date ? data.date.split("T")[0] : "",
          description: data.description || "",
          amount: data.amount?.toString() || "",
          category_id: data.category_id || "",
        });

      } catch (err) {
        console.error(err);
        toast.error("Something went wrong ❌");
      } finally {
        setPageLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  // ✅ HANDLE INPUT CHANGE
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

      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        toast.error("Not authorized ❌");
        router.push("/login");
        return;
      }

      const { error } = await supabase
        .from("transactions")
        .update({
          name: formData.name,
          date: formData.date,
          description: formData.description,
          amount: Number(formData.amount),
          category_id: formData.category_id,
        })
        .eq("id", id as string)
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Transaction updated ✅");

      setTimeout(() => {
        router.push("/");
      }, 800);

    } catch (err) {
      console.error(err);
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ CANCEL
  const handleCancel = () => {
    router.push("/");
  };

  // ✅ LOADING STATE UI
  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading transaction...</p>
      </div>
    );
  }

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
              className="w-full border border-gray-300 rounded-lg p-3"
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
              className="w-full border border-gray-300 rounded-lg p-3"
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
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <div className="border border-gray-300 rounded-lg p-2">
              <CategorySelect
                value={formData.category_id}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="pt-4 space-y-3">

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Updating..." : "Update Transaction"}
            </button>

            <button
              onClick={handleCancel}
              className="w-full border border-gray-300 text-gray-600 hover:bg-gray-100 py-3 rounded-lg font-semibold"
            >
              Cancel
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}