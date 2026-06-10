"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { taskFormSchema, type TaskFormValues } from "@/lib/validations";
import type { Task } from "@/lib/types";

type TaskFormProps = {
  mode: "create" | "edit";
  task?: Task;
};

const fieldClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 " +
  "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200";
const labelClass = "mb-1 block text-sm font-medium text-slate-700";
const errorClass = "mt-1 text-sm text-red-600";

export default function TaskForm({ mode, task }: TaskFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? "todo",
      due_date: task?.due_date ?? "",
    },
  });

  async function onSubmit(values: TaskFormValues) {
    setSubmitError(null);

    const payload = {
      title: values.title.trim(),
      description: values.description?.trim() ? values.description.trim() : null,
      status: values.status,
      due_date: values.due_date ? values.due_date : null,
    };

    if (mode === "create") {
      const { data, error } = await supabase
        .from("tasks")
        .insert(payload)
        .select()
        .single();

      if (error) {
        setSubmitError(`Uložení se nezdařilo: ${error.message}`);
        return;
      }
      router.push(`/tasks/${data.id}`);
      router.refresh();
    } else if (task) {
      const { error } = await supabase
        .from("tasks")
        .update(payload)
        .eq("id", task.id);

      if (error) {
        setSubmitError(`Uložení se nezdařilo: ${error.message}`);
        return;
      }
      router.push(`/tasks/${task.id}`);
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="title" className={labelClass}>
          Název *
        </label>
        <input
          id="title"
          type="text"
          className={fieldClass}
          placeholder="Např. Koupit mléko"
          {...register("title")}
        />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Popis
        </label>
        <textarea
          id="description"
          rows={4}
          className={fieldClass}
          placeholder="Volitelný podrobnější popis úkolu"
          {...register("description")}
        />
        {errors.description && (
          <p className={errorClass}>{errors.description.message}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="status" className={labelClass}>
            Stav
          </label>
          <select id="status" className={fieldClass} {...register("status")}>
            <option value="todo">Nesplněno</option>
            <option value="done">Splněno</option>
          </select>
          {errors.status && (
            <p className={errorClass}>{errors.status.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="due_date" className={labelClass}>
            Termín
          </label>
          <input
            id="due_date"
            type="date"
            className={fieldClass}
            {...register("due_date")}
          />
          {errors.due_date && (
            <p className={errorClass}>{errors.due_date.message}</p>
          )}
        </div>
      </div>

      {submitError && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {submitError}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting
            ? "Ukládám…"
            : mode === "create"
              ? "Vytvořit úkol"
              : "Uložit změny"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border border-slate-300 px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Zrušit
        </button>
      </div>
    </form>
  );
}
