import { cookies } from "next/headers";
import Login from "@/app/auth/login";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <h1>Auth</h1>
      {user ? <p>{user.email}</p> : <p>no user</p>}
      <Login />
    </>
  );
}
