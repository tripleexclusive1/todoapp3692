"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { TaskStatus } from "@/lib/types";

type Props = {
  id: number;
  status: TaskStatus;
};

export default function ToggleStatusButton({ id, status }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const nextStatus: TaskStatus = status === "done" ? "todo" : "done";

  async function handleToggle() {
    setLoading(true);
    const { error } = await supabase
      .from("tasks")
      .update({ status: nextStatus })
      .eq("id", id);

    if (error) {
      window.alert(`Změna stavu se nezdařila: ${error.message}`);
      setLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className="rounded-md bg-emerald-600 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
    >
      {loading
        ? "Ukládám…"
        : status === "done"
          ? "Označit jako nesplněné"
          : "Označit jako splněné"}
    </button>
  );
}
