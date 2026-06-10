import { z } from "zod";

// Validační schéma pro formulář úkolu (react-hook-form + Zod).
// Validovaná pole: title (povinné, délka) a description (max délka) + status (enum).
export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Název musí mít alespoň 3 znaky.")
    .max(100, "Název může mít nejvýše 100 znaků."),
  description: z
    .string()
    .trim()
    .max(500, "Popis může mít nejvýše 500 znaků.")
    .optional(),
  status: z.enum(["todo", "done"], {
    message: "Vyber platný stav úkolu.",
  }),
  due_date: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
