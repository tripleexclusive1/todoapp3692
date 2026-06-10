import Link from "next/link";
import TaskForm from "@/components/TaskForm";

export default function NewTaskPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/tasks"
        className="inline-block text-sm text-slate-500 hover:text-slate-800"
      >
        ← Zpět na seznam
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Nový úkol</h1>
        <TaskForm mode="create" />
      </div>
    </div>
  );
}
