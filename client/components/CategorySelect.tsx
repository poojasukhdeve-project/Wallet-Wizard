import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function CategorySelect({ value, onChange }: any) {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;

        if (!user) return;

        const { data, error } = await supabase
          .from("category")
          .select("*")
          .eq("user_id", user.id)
          .eq("deleted", false) // ✅ EXCLUDE DELETED
          .order("created_at", { ascending: true });

        if (error) throw error;

        setCategories(data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)} // ✅ FIX HERE
      className="border p-2 w-full rounded-lg"
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