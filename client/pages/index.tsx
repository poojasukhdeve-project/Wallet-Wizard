import React, { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
  created_at: string;
};

type Transaction = {
  id: string;
  name: string;
  category_name: string;
  amount: number;
  date: string;
  created_at: string;
};

function Index() {

  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {

    fetch("http://localhost:3100/category")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch("http://localhost:3100/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) =>
        console.error("Error fetching transactions:", err)
      );

  }, []);

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center pt-10">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-6xl">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center mb-10">
          Wallet Wizard Project - February 2026
        </h1>

        {/* ================= CATEGORY ================= */}

        <div className="mb-12">

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-lg font-semibold">
              Category List
            </h2>

            <a
              href="/category/new"
              className="bg-blue-300 hover:bg-blue-600 text-black px-4 py-1 rounded"
            >
              Add new
            </a>

          </div>

          <table className="w-full overflow-hidden rounded-lg">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-3 text-left">Id</th>
                <th className="p-3 text-left">Category Name</th>
                <th className="p-3 text-left">Created at</th>
              </tr>

            </thead>

            <tbody>

              {categories.map((item, index) => (

                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >

                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 text-blue-600 underline">
                    <a href={`/category/${item.id}`}>
                      {item.name}
                    </a>
                  </td>

                  <td className="p-3">
                    {new Date(item.created_at).toLocaleString("en-US", {
                      timeZoneName: "short",
                    })}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* ================= TRANSACTION ================= */}

        <div>

          <div className="flex justify-between items-center mb-4">

            <h2 className="text-lg font-semibold">
              Transaction List
            </h2>

            <a
              href="/transaction/new"
              className="bg-blue-300 hover:bg-blue-700 text-black px-4 py-2 rounded shadow"
            >
              Add new
            </a>

          </div>

          <table className="w-full overflow-hidden rounded-lg">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-3 text-left">Id</th>
                <th className="p-3 text-left">Transaction Name</th>
                <th className="p-3 text-left">Category Name</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Created At</th>
              </tr>

            </thead>

            <tbody>

              {transactions.map((item, index) => (

                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >

                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 text-blue-600 underline">
                    <a href={`/transaction/${item.id}`}>
                      {item.name}
                    </a>
                  </td>

                  <td className="p-3">{item.category_name}</td>

                  <td className="p-3">
                    {new Date(item.date).toLocaleDateString("en-US")}
                  </td>

                  <td className="p-3">
                    {(item.amount / 100).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </td>

                  <td className="p-3">
                    {new Date(item.created_at).toLocaleString("en-US", {
                      timeZoneName: "short",
                    })}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default Index;