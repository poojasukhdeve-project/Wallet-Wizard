import { useEffect, useState } from "react";

export default function CategorySelect({ value, onChange }: any) {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    fetch("http://localhost:3100/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });

  }, []);

  return (

    <select
      name="category_id"
      value={value || ""} // ✅ prevents undefined issue
      onChange={onChange}
      className="border p-2 w-full" // ✅ styling added
    >

      <option value="">Select Category</option>

      {categories.map((c: any) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}

    </select>

  );
}