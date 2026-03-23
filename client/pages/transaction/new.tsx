"use client";

import TransactionForm from "@/components/TransactionForm";

export default function NewTransaction() {

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      {/* OPTIONAL HEADER (can remove if not needed) */}
      <div className="absolute top-6 text-center">
        <h1 className="text-xl font-bold text-gray-700">
          Wallet Wizard - Add Transaction
        </h1>
      </div>

      {/* FORM (already styled) */}
      <TransactionForm />

    </div>
  );
}