// "use client";

// import { EmojiCount } from "@/app/api/fetcher/get-emoji-counts";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   HTMLAttributes,
//   experimental_useOptimistic as useOptimistic,
// } from "react";
// import { ReactionCounter } from "../reaction-counter/reaction-counter";
// import { ReactionPicker } from "../reaction-picker/reaction-picker";
// import { redirect } from "next/navigation";
// import { toggleReactionItem } from "../actions";
// import { cva } from "class-variance-authority";

// const MotionReactionCounter = motion(ReactionCounter);
// const base = 4;
// const t = (d: number) => d * base;

// type ReactionBarProps = HTMLAttributes<HTMLDivElement> & {
//   reactionId: number;
//   emojiCounts: EmojiCount[];
//   currentUserId: string | null;
//   side?: "left" | "right";
// };

// const reactionBarVariants = cva(
//   "absolute -bottom-10 flex px-2 py-1.5 rounded-3xl overflow-hidden border border-border/50 bg-background w-fit",
//   {
//     variants: {
//       side: {
//         left: "left-0 flex-row-reverse",
//         right: "right-0",
//       },
//     },
//     defaultVariants: { side: "right" },
//   }
// );

// type OptimiscAction = {
//   emoji: string;
//   userId: string;
// };

// export const ReactionBar = ({
//   emojiCounts,
//   currentUserId,
//   reactionId,
//   side = "right",
// }: ReactionBarProps) => {
//   const [optimisticEmojiCounts, toggleOptimisticEmojiCounts] = useOptimistic<
//     EmojiCount[],
//     OptimiscAction
//   >(emojiCounts, (prevEmojiCounts, { emoji, userId }) => {
//     const emojiCount = prevEmojiCounts.find((ec) => ec.emoji === emoji);
//     if (emojiCount) {
//       if (emojiCount.userIds.includes(userId)) {
//         if (emojiCount.userIds.length === 1) {
//           // 最後の一人なら絵文字ごと削除
//           return prevEmojiCounts.filter((ec) => ec.emoji !== emoji);
//         } else {
//           // 自分だけ削除
//           return prevEmojiCounts.map((ec) =>
//             ec.emoji === emoji
//               ? {
//                   ...ec,
//                   userIds: ec.userIds.filter((id) => id !== userId),
//                 }
//               : ec
//           );
//         }
//       } else {
//         // 既存絵文字に追加

//         return prevEmojiCounts.map((ec) =>
//           ec.emoji === emoji
//             ? {
//                 ...ec,
//                 userIds: [...ec.userIds, userId],
//               }
//             : ec
//         );
//       }
//     } else {
//       // 新規絵文字
//       return [
//         ...prevEmojiCounts,
//         {
//           emoji,
//           userIds: [userId],
//         },
//       ];
//     }
//   });

//   const reactionCounts: EmojiCount[] =
//     optimisticEmojiCounts.length === 0
//       ? [{ emoji: "❤️", userIds: [] }]
//       : [...optimisticEmojiCounts];

//   return (
//     <ul className={reactionBarVariants({ side })}>
//       <AnimatePresence>
//         {reactionCounts.map(({ emoji, userIds }) => {
//           return (
//             <motion.li
//               layout
//               key={emoji}
//               initial={{ opacity: 0, width: 0 }}
//               animate={{
//                 opacity: 1,
//                 width: "auto",
//                 transition: {
//                   type: "spring",
//                   bounce: 0.3,
//                   opacity: { delay: t(0.025) },
//                 },
//               }}
//               exit={{ opacity: 0, width: 0 }}
//               transition={{
//                 duration: t(0.15),
//                 type: "spring",
//                 bounce: 0,
//                 // opacity: { delay: t(0.03) },
//               }}
//             >
//               <ReactionCounter
//                 className={side === "right" ? "mr-1.5" : "ml-1.5"}
//                 emoji={emoji}
//                 count={userIds.length}
//                 isSelected={
//                   currentUserId ? userIds.includes(currentUserId) : false
//                 }
//                 onClick={async () => {
//                   if (!currentUserId) redirect("/auth/login");
//                   toggleOptimisticEmojiCounts({
//                     emoji,
//                     userId: currentUserId,
//                   });
//                   await toggleReactionItem({
//                     userId: currentUserId,
//                     emoji,
//                     reactionId,
//                   });
//                 }}
//               />
//             </motion.li>
//           );
//         })}
//       </AnimatePresence>
//       <ReactionPicker
//         handleEmojiClick={async (emoji) => {
//           if (!currentUserId) redirect("/auth/login");
//           toggleOptimisticEmojiCounts({ emoji, userId: currentUserId });
//           await toggleReactionItem({
//             userId: currentUserId,
//             emoji,
//             reactionId,
//           });
//         }}
//       />
//     </ul>
//   );
// };
