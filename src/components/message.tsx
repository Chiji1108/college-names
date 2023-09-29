import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

const bubbleVariants = cva(
  "rounded-[20px] px-4 py-2 inline-flex items-center justify-center relative",
  {
    variants: {
      last: {
        true: "",
        false: "before:hidden after:hidden overflow-hidden",
      },
      left: {
        true: "ml-2 bg-secondary text-secondary-foreground before:content-[''] before:absolute before:z-0 before:bottom-0 before:left-[-7px] before:h-[20px] before:w-[20px] before:bg-secondary before:rounded-br-[15px] after:content-[''] after:absolute after:bottom-0 after:left-[-10px] after:h-[20px] after:w-[10px] after:bg-background after:rounded-br-[10px]",
        false:
          "mr-2 bg-primary text-primary-foreground before:content-[''] before:absolute before:z-0 before:bottom-0 before:right-[-8px] before:w-[20px] before:h-[20px] before:bg-primary before:rounded-bl-[15px] after:content-[''] after:absolute after:bottom-0 after:right-[-10px] after:w-[10px] after:h-[20px] after:bg-background after:rounded-bl-[10px]",
      },
    },
    defaultVariants: {
      last: true,
      left: true,
    },
  }
);

export interface BubbleProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bubbleVariants> {}

const Bubble = forwardRef<HTMLDivElement, BubbleProps>(
  ({ className, last, left, ...props }, ref) => {
    return (
      <div
        className={cn(bubbleVariants({ last, left }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Bubble.displayName = "Bubble";

const messageVariants = cva("flex items-end", {
  variants: {
    left: {
      true: "self-start mr-[25%]",
      false: "self-end ml-[25%]",
    },
  },
  defaultVariants: {
    left: true,
  },
});

export interface MessageProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageVariants> {}

const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ className, left, ...props }, ref) => {
    return (
      <div
        className={cn(messageVariants({ left }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Message.displayName = "Message";

export { Bubble, Message };
