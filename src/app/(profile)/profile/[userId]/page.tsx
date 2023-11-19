import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { getUsername } from "./get-username-by-userId";
import { getUserIds } from "./get-userIds";

// export const revalidate = 3600;

export async function generateStaticParams() {
  const cookieStore = cookies();
  const { data: users, error } = await getUserIds({ cookieStore });
  if (error) throw error;
  return users.map((user) => ({ userId: user.id }));
}

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const cookieStore = cookies();
  const { data: user } = await getUsername({ userId, cookieStore });
  if (!user) notFound();
  redirect(`/${user.username}`);
}
