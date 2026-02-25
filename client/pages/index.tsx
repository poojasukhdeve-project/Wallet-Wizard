import React, { useEffect, useState } from "react";

type Transaction = {
  id: string;
  name: string;
  category_name: string;
  amount: number;
  date: string;
  created_at: string;
};

function Index() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("http://localhost:3100/transactions")
      .then((response) => response.json())
      .then((data: Transaction[]) => {
        setTransactions(data);
      })
      .catch((err) =>
        console.error("Error fetching transactions:", err)
      );
  }, []);

  return (
   <div className="flex justify-center pt-10">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-5xl">

        <table className="w-full border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Transaction Name</th>
              <th className="border p-2">Category Name</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Created At</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item, index) => (
              <tr key={item.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.category_name}</td>
                <td className="border p-2">
                  {new Date(item.date).toLocaleDateString("en-US")}
                </td>
                <td className="border p-2">
                  {(item.amount / 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td className="border p-2">
                  {new Date(item.created_at).toLocaleString("en-US",{timeZoneName: "short"})}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Index;
