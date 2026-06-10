import type { TaskStatus } from "@/lib/types";

export default function StatusBadge({ status }: { status: TaskStatus }) {
  const isDone = status === "done";

  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium " +
        (isDone
          ? "bg-emerald-100 text-emerald-800"
          : "bg-amber-100 text-amber-800")
      }
    >
      {isDone ? "Splněno" : "Nesplněno"}
    </span>
  );
}
