import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

const chipVariants = cva(
  "text-center inline-flex items-center border rounded-full bg-card text-card-foreground shadow-sm",
  {
    variants: {
      size: {
        sm: "text-xs px-2.5 py-0.5",
        md: "text-base px-3 py-1",
      },
    },
    defaultVariants: {
      size: "md",
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
  extends ComponentProps<"li">,
    VariantProps<typeof chipVariants> {
  icon?: React.ReactNode;
}

const Chip = forwardRef<HTMLLIElement, ChipProps>(
  ({ className, size, icon, children, ...props }, ref) => {
    return (
      <li
        className={cn(chipVariants({ size }), className)}
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

export { Chip, chipVariants };
