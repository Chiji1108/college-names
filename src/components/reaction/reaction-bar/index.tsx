// import { getEmojiCounts } from "@/app/api/fetcher/get-emoji-counts";
// import { ReactionBar } from "./reaction-bar";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { Database } from "@/lib/database.types";
// import { cookies } from "next/headers";

// interface ReactionBarContainerProps {
//   reactionId: number;
//   side?: "left" | "right";
// }

// export const dynamic = "force-dynamic";

// export default async function ReactionBarContainer({
//   reactionId,
//   side = "right",
// }: ReactionBarContainerProps) {
//   const emojiCounts = await getEmojiCounts({ reactionId });
//   const supabase = createServerComponentClient<Database>({ cookies });
//   const {
//     data: { session },
//     error,
//   } = await supabase.auth.getSession();
//   const currentUserId = session?.user?.id || null;
//   //   console.log(emojiCounts, currentUserId);
//   return (
//     <ReactionBar
//       emojiCounts={emojiCounts}
//       currentUserId={currentUserId}
//       reactionId={reactionId}
//       side={side}
//     />
//     // <div />
//   );
// }
