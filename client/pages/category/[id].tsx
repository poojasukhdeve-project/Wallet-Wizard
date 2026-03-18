import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CategoryDetail() {

  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState("");

  // ✅ FETCH CATEGORY DATA
  useEffect(() => {
    if (!id) return;

    fetch("http://localhost:3100/category")
      .then(res => res.json())
      .then(data => {
        const c = data.find((item: any) => item.id == id);
        if (c) setName(c.name);
      });
  }, [id]);

  // ✅ UPDATE
  const handleUpdate = async () => {

    await fetch(`http://localhost:3100/category/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    router.push("/");
  };

  // ✅ DELETE
  const handleDelete = async () => {

    await fetch(`http://localhost:3100/category/${id}`, {
      method: "DELETE",
    });

    router.push("/");
  };

  return (

    <div className="flex justify-center pt-10">

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">

        <h2 className="text-xl font-bold text-center mb-4">
          Category Edit/Delete
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white w-full py-2 rounded mb-2"
        >
          Update
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white w-full py-2 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  );
}