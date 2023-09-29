import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
// import { MotionProps, motion } from "framer-motion";
import { ButtonHTMLAttributes, HTMLAttributes, forwardRef } from "react";

type ReactionCounterProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  emoji: string;
  count: number;
  isSelected: boolean;
};

const reactionCounterVariants = cva(
  "flex gap-1 items-center justify-center rounded-full overflow-hidden px-2 py-1 border border-transparent bg-secondary text-secondary-foreground transition hover:bg-primary/10 focus:ring-primary/50 focus:ring",
  {
    variants: {
      isSelected: {
        true: "border-primary/60 bg-primary/20 shadow-[0_0_4px_0] shadow-primary/60",
        false: "",
      },
    },
  }
);

const ReactionCounter = forwardRef<HTMLButtonElement, ReactionCounterProps>(
  ({ emoji, count, isSelected, className, ...props }, ref) => {
    return (
      <button
        className={cn(reactionCounterVariants({ isSelected }), className)}
        ref={ref}
        {...props}
      >
        <div>{emoji}</div>
        <div className="text-sm">{count}</div>
      </button>
    );
  }
);
ReactionCounter.displayName = "ReactionCounter";

export { ReactionCounter };
