import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export default function getClient(tags: string[]) {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (...args) => fetch(args[0], { ...args[1], next: { tags } }),
      },
      auth: { persistSession: false },
    }
  );
}
