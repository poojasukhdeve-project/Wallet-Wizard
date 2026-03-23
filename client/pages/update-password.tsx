"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

export default function UpdatePassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ UPDATE PASSWORD
  const handleUpdatePassword = async () => {
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      toast.success("Password updated successfully ✅");

      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (err: any) {
      toast.error(err.message || "Failed to update password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-yellow-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🔑 Update Password
        </h2>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
            placeholder="Enter new password"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </div>
    </div>
  );
}