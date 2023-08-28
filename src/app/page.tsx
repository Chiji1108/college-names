import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <header className="mx-auto w-full px-4.5 xs:px-6 sm:px-10 md:px-11 lg:px-12 max-w-2xl">
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
    </main>
  );
}
