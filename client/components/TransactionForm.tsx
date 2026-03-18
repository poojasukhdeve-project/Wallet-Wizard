import { useState } from "react";
import { useRouter } from "next/router";
import CategorySelect from "./CategorySelect";

export default function TransactionForm({ id }: any) {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    amount: "",
    category_id: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("http://localhost:3100/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    router.push("/"); // ✅ proper redirect
  };

  return (

    <form onSubmit={handleSubmit} className="space-y-4">

      <h3 className="text-center font-medium mb-2">
        Add Transaction
      </h3>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-2 gap-4 items-center">

        {/* NAME */}
        <label>Name :</label>
        <input
          name="name"
          className="border p-2 w-full"
          value={formData.name}
          onChange={handleChange}
        />

        {/* DATE */}
        <label>Date :</label>
        <input
          type="date"
          name="date"
          className="border p-2 w-full"
          value={formData.date}
          onChange={handleChange}
        />

        {/* DESCRIPTION */}
        <label>Description :</label>
        <input
          name="description"
          className="border p-2 w-full"
          value={formData.description}
          onChange={handleChange}
        />

        {/* AMOUNT */}
        <label>Amount :</label>
        <input
          type="text"
          name="amount"
          className="border p-2 w-full"
          value={formData.amount}
          onChange={handleChange}
        />

        {/* CATEGORY (DYNAMIC) */}
        <label>Category :</label>

        <CategorySelect
          value={formData.category_id}
          onChange={handleChange}
        />

      </div>

      {/* BUTTON */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded"
      >
        Add Transaction
      </button>

    </form>
  );
}