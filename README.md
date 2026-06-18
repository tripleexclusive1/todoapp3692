# Todo App - správa úkolů

Webová aplikace pro správu úkolů postavená na **Next.js (App Router)** s **Supabase**
jako databází. Demonstruje dynamické stránky, formuláře s validací
(`react-hook-form` + `Zod`) a kompletní CRUD operace.

## Použité technologie

- **Next.js 16** (App Router, TypeScript)
- **Supabase** (`@supabase/supabase-js`) - databáze a API
- **react-hook-form** + **Zod** - formuláře a validace
- **Tailwind CSS** - stylování (responzivní)

## Funkce

- Seznam úkolů - `/tasks`
- Detail úkolu (dynamická cesta) - `/tasks/[id]`
- Přidání úkolu - `/tasks/new`
- Úprava úkolu - `/tasks/[id]/edit`
- Označení úkolu jako splněného / nesplněného
- Smazání úkolu

Všechna data (čtení, zápis, úprava, mazání) procházejí přes Supabase.

## Datový model

Tabulka `tasks`:

| Sloupec       | Typ           | Poznámka               |
| ------------- | ------------- | ---------------------- |
| `id`          | `bigint`      | primární klíč (auto)   |
| `title`       | `text`        | název úkolu (povinný)  |
| `description` | `text`        | popis (volitelný)      |
| `status`      | `text`        | `'todo'` nebo `'done'` |
| `due_date`    | `date`        | termín (volitelný)     |
| `created_at`  | `timestamptz` | čas vytvoření (auto)   |

## Nastavení a spuštění

### 1. Naklonuj repozitář a nainstaluj závislosti

```bash
git clone https://github.com/tripleexclusive1/todoapp3692.git
cd todoapp3692
npm install
```

### 2. Nastav Supabase

1. Vytvoř projekt na [supabase.com](https://supabase.com).
2. V **SQL Editoru** spusť následující SQL pro vytvoření tabulky a povolení přístupu:

```sql
create table if not exists public.tasks (
  id          bigint generated always as identity primary key,
  title       text not null,
  description text,
  status      text not null default 'todo',
  due_date    date,
  created_at  timestamptz not null default now()
);

alter table public.tasks enable row level security;

create policy "Allow all access to tasks"
  on public.tasks
  for all
  using (true)
  with check (true);
```

3. V **Settings → API** zkopíruj **Project URL** a **publishable (anon)** klíč.

### 3. Vytvoř soubor `.env.local`

V kořeni projektu vytvoř `.env.local` (do Gitu se nedostane, je v `.gitignore`):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tvuj-projekt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tvuj-publishable-klic
```

### 4. Spusť vývojový server

```bash
npm run dev
```

Aplikace běží na [http://localhost:3000](http://localhost:3000).

## Struktura projektu

```
app/
  layout.tsx              # Hlavní layout (hlavička + navigace)
  page.tsx                # Domovská stránka
  globals.css             # Globální styly (Tailwind)
  tasks/
    page.tsx              # Seznam úkolů (/tasks)
    new/page.tsx          # Přidání úkolu (/tasks/new)
    [id]/page.tsx         # Detail úkolu (/tasks/[id])
    [id]/edit/page.tsx    # Úprava úkolu (/tasks/[id]/edit)
components/
  TaskForm.tsx            # Formulář (react-hook-form + Zod)
  StatusBadge.tsx         # Odznak stavu
  ToggleStatusButton.tsx  # Přepnutí splněno/nesplněno
  DeleteTaskButton.tsx    # Smazání úkolu
lib/
  supabase.ts             # Supabase klient
  types.ts                # Datové typy
  validations.ts          # Zod validační schéma
  format.ts               # Formátování data
```
