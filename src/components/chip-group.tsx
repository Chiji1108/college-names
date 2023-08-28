import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

export interface ChipGroupProps extends ComponentProps<"div"> {}

const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("flex gap-2 flex-wrap", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ChipGroup.displayName = "ChipGroup";

export { ChipGroup };
