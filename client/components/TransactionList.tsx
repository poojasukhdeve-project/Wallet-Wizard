"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Transaction from "./Transaction";
import { useRouter } from "next/router";

export default function TransactionList() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTransactions = async () => {
      // 🔐 GET USER
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        router.push("/login");
        return;
      }

      // ✅ FETCH FROM SUPABASE (JOIN CATEGORY)
      const { data: transactionsData, error } = await supabase
        .from("transactions")
        .select(`
          *,
          category:category_id (name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) {
        setTransactions(transactionsData || []);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>

      <h3>
        Transaction List -{" "}
        <a href="/transaction/new" className="text-blue-600">
          Add new
        </a>
      </h3>

      <table>

        <thead>
          <tr>
            <th>Id</th>
            <th>Transaction Name</th>
            <th>Category Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Created at</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((t: any, i: number) => (
              <Transaction key={t.id} transaction={t} index={i} />
            ))
          )}
        </tbody>

      </table>
    </div>
  );
}