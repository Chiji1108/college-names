import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";

export default async function Login() {
  const handleSignUp = async (formData: FormData) => {
    "use server";
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    revalidatePath("/");
  };

  const handleSignIn = async (formData: FormData) => {
    "use server";
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

    revalidatePath("/");
  };

  const handleSignOut = async () => {
    "use server";
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.auth.signOut();
    revalidatePath("/");
  };

  return (
    <form action={handleSignUp}>
      <input name="email" />
      <input type="password" name="password" />
      <button>Sign up</button>
      <button formAction={handleSignIn}>Sign in</button>
      <button formAction={handleSignOut}>Sign out</button>
    </form>
  );
}
