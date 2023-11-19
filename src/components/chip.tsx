import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  ButtonHTMLAttributes,
  ComponentProps,
  HTMLAttributes,
  forwardRef,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { LinkProps } from "next/link";

const chipVariants = cva(
  "text-center inline-flex items-center rounded-full border bg-card text-card-foreground transition ease-in-out hover:bg-secondary hover:text-secondary-foreground disabled:border-transparent disabled:bg-secondary disabled:text-secondary-foreground",
  {
    variants: {
      size: {
        sm: "text-xs px-2 py-1",
        md: "text-base px-3 py-1",
      },
      selected: {
        true: "border-primary/60 bg-primary/20 shadow-[0_0_4px_0] shadow-primary/60",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      selected: false,
    },
  }
);

const iconVariants = cva(
  "w-4 h-4 leading-none text-md grid place-content-center font-black",
  {
    variants: {
      size: {
        sm: "w-3 h-3 text-sm mr-1",
        md: "w-4 h-4 text-md mr-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ChipProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  icon?: React.ReactNode;
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, size, icon, selected, children, ...props }, ref) => {
    return (
      <button
        className={cn(chipVariants({ size, selected }), className)}
        ref={ref}
        {...props}
      >
        {icon && <span className={cn(iconVariants({ size }))}>{icon}</span>}
        <span>{children}</span>
      </button>
    );
  }
);
Chip.displayName = "Chip";

// const MotionChip = motion(Chip);
// MotionChip.defaultProps = {
//   variants: {
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { type: "spring", stiffness: 300, damping: 24 },
//     },
//     hidden: {
//       opacity: 0,
//       y: 20,
//       transition: { duration: 0.2 },
//     },
//   },
// };

export interface ChipGroupProps extends HTMLAttributes<HTMLDivElement> {}

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

export { Chip, ChipGroup };
