import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <h1>Top Page</h1>
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
    </main>
  );
}
