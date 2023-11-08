"use server";
import { cookies } from "next/headers";

import { revalidateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export const toggleReactionItem = async ({
  userId,
  reactionId,
  emoji,
}: {
  userId: string;
  reactionId: number;
  emoji: string;
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: reactionItem, error } = await supabase
    .from("reaction_items")
    .select("*")
    .match({ reaction_id: reactionId, emoji, user_id: userId })
    .maybeSingle();
  if (error) throw error;
  if (reactionItem) {
    const { error } = await supabase
      .from("reaction_items")
      .delete()
      .match({ reaction_id: reactionId, emoji });
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("reaction_items")
      .insert({ reaction_id: reactionId, emoji });
    if (error) throw error;
  }
  revalidateTag(`reactions:${reactionId}`);
};
