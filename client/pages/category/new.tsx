import { useState } from "react";
import { useRouter } from "next/router"; // ADD THIS

export default function NewCategory() {

  const [name, setName] = useState("");
  const router = useRouter(); // ADD THIS

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("http://localhost:3100/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    router.push("/"); //  FIXED (instead of window.location.href)
  };

  return (

    <div className="min-h-screen bg-gray-100 text-center pt-10">

      {/* Title */}
      <h1 className="text-xl font-bold mb-4">
        Wallet Wizard Project - February 2026
      </h1>

      <h2 className="font-semibold mb-4">
        Category Page
      </h2>

      {/* Small Card */}
      <div className="bg-gray-200 inline-block p-6 rounded-lg shadow-md">

        <h3 className="mb-4 font-medium">
          Add Category
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="flex items-center justify-center mb-4">

            <label className="mr-2">Name :</label>

            <input
              className="border p-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>

          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 text-black px-6 py-1 rounded w-full"
          >
            Add Category
          </button>

        </form>

      </div>

    </div>

  );
}