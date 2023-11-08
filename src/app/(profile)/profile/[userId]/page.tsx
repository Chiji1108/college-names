import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

// export const revalidate = 3600;

export async function generateStaticParams() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore, ["users"]);
  const { data: users, error } = await supabase.from("users").select("id");
  if (error) throw error;
  return users.map((user) => ({ userId: user.id }));
}

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: user, error } = await supabase
    .from("users")
    .select("id, username")
    .eq("id", userId)
    .single();
  if (!user) notFound();
  redirect(`/${user.username}`);
}
