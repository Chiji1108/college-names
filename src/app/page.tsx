import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import LogoutButton from "./logout-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="mx-auto w-full px-4.5 xs:px-6 sm:px-10 md:px-11 lg:px-12 max-w-2xl">
      {/* <header>
        <nav>
          <ul>
            <li></li>
            <li>

            </li>
          </ul>
        </nav>
      </header> */}
      <main className="mx-6">
        <Card className="mb-6 mt-6">
          <CardHeader>
            <CardTitle>ログイン情報</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user?.email || "Not logged in"}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button asChild>
              <Link href="/login">ログイン</Link>
            </Button>
            <LogoutButton disabled={!user} />
          </CardFooter>
        </Card>
        <Button asChild>
          <Link href="/chiji">Chijiのプロフィール</Link>
        </Button>
      </main>
    </div>
  );
}
