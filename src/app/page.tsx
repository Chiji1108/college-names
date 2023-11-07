import Link from "next/link";
import { auth } from "./api/auth/auth";
import { LoginButton, LogoutButton } from "./api/auth/components/buttons";

export default async function Home() {
  const session = await auth();
  return (
    <div className="mx-auto w-full px-4.5 xs:px-6 sm:px-10 md:px-11 lg:px-12 max-w-2xl">
      {/* <header>
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
      </header> */}
      <main>User: {session?.user?.email || "Not logged in"}</main>
      <LoginButton />
      <LogoutButton />
    </div>
  );
}
