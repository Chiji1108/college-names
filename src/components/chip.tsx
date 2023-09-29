import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ComponentProps, HTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { LinkProps } from "next/link";

const chipVariants = cva(
  "text-center inline-flex items-center rounded-full border",
  {
    variants: {
      size: {
        sm: "text-xs px-2 py-1",
        md: "text-base px-3 py-1",
      },
      clickable: {
        true: "bg-card text-card-foreground cursor-pointer transition ease-in-out hover:bg-secondary",
        false: "border-transparent bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: {
      size: "md",
      clickable: true,
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
  extends HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof chipVariants> {
  icon?: React.ReactNode;
}

const Chip = forwardRef<HTMLLIElement, ChipProps>(
  ({ className, size, icon, clickable, children, ...props }, ref) => {
    return (
      <li
        className={cn(chipVariants({ size, clickable }), className)}
        ref={ref}
        {...props}
      >
        {icon && <span className={cn(iconVariants({ size }))}>{icon}</span>}
        <span>{children}</span>
      </li>
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

export interface ChipGroupProps extends HTMLAttributes<HTMLUListElement> {}

const ChipGroup = forwardRef<HTMLUListElement, ChipGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        className={cn("flex gap-2 flex-wrap", className)}
        ref={ref}
        {...props}
      >
        {children}
      </ul>
    );
  }
);
ChipGroup.displayName = "ChipGroup";

export { Chip, ChipGroup };
