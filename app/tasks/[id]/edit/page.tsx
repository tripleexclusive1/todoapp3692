import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Task } from "@/lib/types";
import TaskForm from "@/components/TaskForm";

export const dynamic = "force-dynamic";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const task = data as Task;

  return (
    <div className="space-y-6">
      <Link
        href={`/tasks/${task.id}`}
        className="inline-block text-sm text-slate-500 hover:text-slate-800"
      >
        ← Zpět na detail
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Upravit úkol</h1>
        <TaskForm mode="edit" task={task} />
      </div>
    </div>
  );
}
