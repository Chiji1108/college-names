import { createClient } from "@/lib/supabase/withoutAuth";
import { notFound, redirect } from "next/navigation";
import { getUsername } from "./get-username-by-userId";

// export const revalidate = 3600;

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: users, error } = await supabase.from("users").select("id");
  if (error) throw error;
  return users.map((user) => ({ userId: user.id }));
}

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const { data: user } = await getUsername({ userId });
  if (!user) notFound();
  redirect(`/${user.username}`);
}
