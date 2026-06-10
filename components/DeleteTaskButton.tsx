"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DeleteTaskButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Opravdu chceš tento úkol smazat?")) return;

    setLoading(true);
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      window.alert(`Smazání se nezdařilo: ${error.message}`);
      setLoading(false);
      return;
    }

    router.push("/tasks");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-md border border-red-300 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-50 disabled:opacity-60"
    >
      {loading ? "Mažu…" : "Smazat"}
    </button>
  );
}
