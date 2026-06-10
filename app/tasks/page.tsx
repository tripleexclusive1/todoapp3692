import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/format";
import type { Task } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";

// Vždy načítat aktuální data ze Supabase (bez cachování).
export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <p className="rounded-md bg-red-50 px-4 py-3 text-red-700">
        Načtení úkolů se nezdařilo: {error.message}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Seznam úkolů</h1>
        <Link
          href="/tasks/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          + Nový úkol
        </Link>
      </div>

      {!tasks || tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-500">Zatím tu nejsou žádné úkoly.</p>
          <Link
            href="/tasks/new"
            className="mt-3 inline-block font-medium text-blue-600 hover:text-blue-800"
          >
            Vytvořit první úkol
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {(tasks as Task[]).map((task) => (
            <li key={task.id}>
              <Link
                href={`/tasks/${task.id}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50/40"
              >
                <div className="min-w-0">
                  <p
                    className={
                      "truncate font-medium " +
                      (task.status === "done"
                        ? "text-slate-400 line-through"
                        : "text-slate-900")
                    }
                  >
                    {task.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Termín: {formatDate(task.due_date)}
                  </p>
                </div>
                <StatusBadge status={task.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
