import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Správa úkolů
        </h1>
        <p className="mt-3 text-slate-600">
          Jednoduchá aplikace pro správu úkolů. Můžeš vytvářet, prohlížet, upravovat, označovat jako
          splněné a mazat úkoly.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/tasks"
            className="rounded-md bg-blue-600 px-5 py-2.5 text-center font-medium text-white transition-colors hover:bg-blue-700"
          >
            Zobrazit úkoly
          </Link>
          <Link
            href="/tasks/new"
            className="rounded-md border border-slate-300 px-5 py-2.5 text-center font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            Přidat nový úkol
          </Link>
        </div>
      </div>
    </div>
  );
}
