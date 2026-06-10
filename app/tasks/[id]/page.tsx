import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/format";
import type { Task } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";
import ToggleStatusButton from "@/components/ToggleStatusButton";
import DeleteTaskButton from "@/components/DeleteTaskButton";

export const dynamic = "force-dynamic";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // V Next.js 16 jsou `params` asynchronní – musíme je awaitnout.
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
        href="/tasks"
        className="inline-block text-sm text-slate-500 hover:text-slate-800"
      >
        ← Zpět na seznam
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-900">{task.title}</h1>
          <StatusBadge status={task.status} />
        </div>

        <dl className="mt-6 space-y-4">
          <div>
            <dt className="text-sm font-medium text-slate-500">Popis</dt>
            <dd className="mt-1 whitespace-pre-wrap text-slate-800">
              {task.description ? task.description : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Termín</dt>
            <dd className="mt-1 text-slate-800">{formatDate(task.due_date)}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-wrap gap-3">
        <ToggleStatusButton id={task.id} status={task.status} />
        <Link
          href={`/tasks/${task.id}/edit`}
          className="rounded-md border border-slate-300 px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Upravit
        </Link>
        <DeleteTaskButton id={task.id} />
      </div>
    </div>
  );
}
