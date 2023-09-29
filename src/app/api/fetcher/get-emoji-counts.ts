import { Database } from "@/lib/database.types";
import supabase from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { cache } from "react";
import "server-only";

export type EmojiCount = {
  emoji: string;
  userIds: string[];
};

type GetEmojiCounts = ({
  reactionId,
}: {
  reactionId: number;
}) => Promise<EmojiCount[]>;

export const getEmojiCounts: GetEmojiCounts = async ({
  reactionId,
}: {
  reactionId: number;
}) => {
  // const supabase = createServerComponentClient<Database>({ cookies });
  // const supabase = createClient<Database>(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //   { auth: { persistSession: false } }
  // );
  const { data: reaction, error } = await supabase([`reactions:${reactionId}`])
    .from("reactions")
    .select("*, reaction_items (*)")
    .eq("id", reactionId)
    .order("created_at", { foreignTable: "reaction_items", ascending: true })
    .single();

  // if (error) throw error;
  if (!reaction) return [];

  // console.log(reaction);

  const emojiCounts: EmojiCount[] = [];
  reaction.reaction_items.forEach(({ emoji, user_id }) => {
    const emojiCount = emojiCounts.find(
      (emojiCount) => emojiCount.emoji === emoji
    );
    if (emojiCount) {
      emojiCount.userIds.push(user_id);
    } else {
      emojiCounts.push({ emoji, userIds: [user_id] });
    }
  });
  return emojiCounts;
};
