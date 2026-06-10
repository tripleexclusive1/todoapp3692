import { createClient } from "@supabase/supabase-js";

// Hodnoty se načítají z .env.local (NEXT_PUBLIC_ prefix => dostupné i v prohlížeči).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Chybí Supabase proměnné prostředí. Zkontroluj soubor .env.local " +
      "(NEXT_PUBLIC_SUPABASE_URL a NEXT_PUBLIC_SUPABASE_ANON_KEY)."
  );
}

// Jediný sdílený klient používaný v serverových i klientských komponentách.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
