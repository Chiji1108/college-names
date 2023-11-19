import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function EditProfile({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();
  if (!currentUser) return null;
  if (userId !== currentUser.id) return null;
  //TODO: add admin check
  return (
    <Link href={`/${username}/edit`}>
      <Button variant="outline" className="m-4 absolute top-0 right-0">
        プロフィールを編集
      </Button>
    </Link>
  );
}
