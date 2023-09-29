"use server";
import { cookies } from "next/headers";

import { Database } from "@/lib/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidateTag } from "next/cache";

export const toggleReactionItem = async ({
  userId,
  reactionId,
  emoji,
}: {
  userId: string;
  reactionId: number;
  emoji: string;
}) => {
  const supabase = createServerActionClient<Database>({ cookies });
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

// const addReactionItem = async ({
//   reactionId,
//   emoji,
// }: {
//   reactionId: number;
//   emoji: string;
// }) => {
//   const supabase = createServerActionClient<Database>({ cookies });
//   const { error } = await supabase
//     .from("reaction_items")
//     .insert({ reaction_id: reactionId, emoji });
//   if (error) throw error;
//   revalidateTag(`reactions:${reactionId}`);
// };

// const removeReactionItem = async ({
//   reactionId,
//   emoji,
// }: {
//   reactionId: number;
//   emoji: string;
// }) => {
//   const supabase = createServerActionClient<Database>({ cookies });
//   const { error } = await supabase
//     .from("reaction_items")
//     .delete()
//     .match({ reaction_id: reactionId, emoji });
//   if (error) throw error;
//   revalidateTag(`reactions:${reactionId}`);
// };
