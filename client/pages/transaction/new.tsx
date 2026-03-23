"use client";

import TransactionForm from "@/components/TransactionForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase";

export default function NewTransaction() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // 🔐 AUTH CHECK
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // ⏳ LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">

      {/* ✅ HEADER (FIXED POSITIONING) */}
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        Wallet Wizard 
      </h1>

      {/* ✅ FORM */}
      <TransactionForm />

    </div>
  );
}