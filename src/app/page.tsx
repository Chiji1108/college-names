import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="mx-auto w-full px-4.5 xs:px-6 sm:px-10 md:px-11 lg:px-12 max-w-2xl">
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/auth">Auth</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>User: {user?.email || "Not logged in"}</main>
    </div>
  );
}
