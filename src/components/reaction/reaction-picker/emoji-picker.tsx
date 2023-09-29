import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  loading: () => (
    <div className="flex flex-col h-[450px] w-[350px] rounded-lg bg-background border border-border">
      <Skeleton className="my-[15px] mx-[10px] h-[40px]" />
      <div className="my-[15px] mx-[10px] h-[60px] flex justify-around">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-[30px] w-[30px]" />
        ))}
      </div>
      <Skeleton className="mx-[10px] grow" />
      <Skeleton className="my-[15px] mx-[10px] h-[70px]" />
    </div>
  ),
  ssr: false,
});
export { EmojiPicker };
