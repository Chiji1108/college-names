import { supabaseAdmin } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound, redirect } from "next/navigation";
// import { cookies } from "next/headers";

export const revalidate = 60;

export default async function Page({ params }: { params: { userId: string } }) {
  // const supabase = createServerComponentClient({ cookies });
  const { data: user, error } = await supabaseAdmin
    .from("users")
    .select("id, username, groups (*)")
    .eq("id", params.userId)
    .maybeSingle();
  if (error) throw error;

  if (!user) {
    notFound();
  } else {
    redirect(`/${user.username}`);
  }
}
