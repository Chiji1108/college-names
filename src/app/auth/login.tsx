import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
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
      <Input name="email" />
      <Input type="password" name="password" />
      <Button>Sign up</Button>
      <Button formAction={handleSignIn}>Sign in</Button>
      <Button formAction={handleSignOut}>Sign out</Button>
    </form>
  );
}
