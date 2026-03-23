import { useEffect, useState } from "react";
import Category from "./Category";
import { supabase } from "../lib/supabase";

export default function CategoryList() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) return;

      const { data, error } = await supabase
        .from("category")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error(error);
      } else {
        setCategories(data || []);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h3>
        Category List - <a href="/category/new">Add new</a>
      </h3>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Category Name</th>
            <th>Created at</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c: any, i: number) => (
            <Category key={c.id} category={c} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}