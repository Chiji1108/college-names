import { ReactionBar } from "./reaction-bar";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

interface ReactionBarContainerProps {
  reactionId: number;
  side?: "left" | "right";
}

export type EmojiCount = {
  emoji: string;
  userIds: string[];
};

// export const dynamic = "force-dynamic";

export default async function ReactionBarContainer({
  reactionId,
  side = "right",
}: ReactionBarContainerProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore, [`reactions:${reactionId}`]);

  const { data: reaction, error } = await supabase
    .from("reactions")
    .select("*, reaction_items (*)")
    .eq("id", reactionId)
    .order("created_at", {
      foreignTable: "reaction_items",
      ascending: true,
    })
    .single();
  if (error) throw error;
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

  const {
    data: { user },
  } = await supabase.auth.getUser();
  //   console.log(emojiCounts, currentUserId);
  return (
    <ReactionBar
      emojiCounts={emojiCounts}
      currentUserId={user?.id || null}
      reactionId={reactionId}
      side={side}
    />
    // <div />
  );
}
