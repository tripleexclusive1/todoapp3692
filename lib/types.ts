// Stav úkolu: 'todo' = nesplněno, 'done' = splněno.
export type TaskStatus = "todo" | "done";

// Odpovídá sloupcům tabulky `tasks` v Supabase.
export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  due_date: string | null; // formát YYYY-MM-DD nebo null
  created_at: string;
};
