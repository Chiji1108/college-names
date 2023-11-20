"use server";

import { getRevalidateTags } from "@/app/(profile)/get-profile-by-username";
import { getUserId } from "@/app/(profile)/get-userId-by-username";
import { createClient } from "@/lib/supabase/server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function toggleBadge(username: string, badgeId: number) {
  const { data: user, error: getUserIdError } = await getUserId({
    username,
  });
  if (getUserIdError) throw getUserIdError;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: personalities, error } = await supabase
    .from("personalities")
    .select("*")
    .eq("user_id", user.id);
  if (error) throw error;
  if (
    personalities.map((personality) => personality.badge_id).includes(badgeId)
  ) {
    const { error } = await supabase
      .from("personalities")
      .delete()
      .match({ user_id: user.id, badge_id: badgeId });
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("personalities")
      .insert({ user_id: user.id, badge_id: badgeId });
    if (error) throw error;
  }

  getRevalidateTags(username).forEach((tag) => revalidateTag(tag));
}
