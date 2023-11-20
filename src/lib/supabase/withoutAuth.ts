import { createClient as createClientWithoutAuth } from "@supabase/supabase-js";
import { Database } from "./database.types";

export const createClient = (tags?: string[]) =>
  createClientWithoutAuth<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (input, init) => {
          return fetch(input as RequestInfo | URL, {
            ...init,
            next: {
              tags,
            },
          });
        },
      },
    }
  );
