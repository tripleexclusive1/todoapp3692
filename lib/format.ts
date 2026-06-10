// Naformátuje datum (YYYY-MM-DD nebo null) do české podoby.
export function formatDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
