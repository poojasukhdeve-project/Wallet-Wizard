import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategorySelect from "@/components/CategorySelect";

export default function TransactionDetail() {

  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    amount: "",
    category_id: "",
  });

  // FETCH DATA
  useEffect(() => {
    if (!id) return;

    fetch("http://localhost:3100/transactions")
      .then(res => res.json())
      .then(data => {
        const t = data.find((item: any) => item.id == id);

        if (t) {
          setFormData({
            name: t.name,
            date: t.date?.split("T")[0],
            description: t.description || "",
            amount: t.amount,
            category_id: t.category_id,
          });
        }
      });
  }, [id]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE
  const handleUpdate = async () => {

    const data = {
      ...formData,
      amount: Number(formData.amount),
    };

    await fetch(`http://localhost:3100/transaction/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.push("/");
  };

  // DELETE
  const handleDelete = async () => {

    await fetch(`http://localhost:3100/transaction/${id}`, {
      method: "DELETE",
    });

    router.push("/");
  };

  return (
    <div className="flex justify-center pt-10">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">

        <h2 className="text-xl font-bold text-center mb-4">
          Transaction Edit/Delete
        </h2>

        <div className="space-y-4">

          <input name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="border p-2 w-full" />
          <input name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full" />
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="border p-2 w-full" />

          <CategorySelect value={formData.category_id} onChange={handleChange} />

          <button onClick={handleUpdate} className="bg-blue-500 text-white w-full py-2 rounded">
            Update Transaction
          </button>

          <button onClick={handleDelete} className="bg-red-500 text-white w-full py-2 rounded">
            Delete Transaction
          </button>

        </div>
      </div>
    </div>
  );
}