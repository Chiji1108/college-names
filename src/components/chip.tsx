import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

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
  extends ComponentProps<"div">,
    VariantProps<typeof chipVariants> {
  icon?: React.ReactNode;
}

function Chip({ className, size, icon, children, ...props }: ChipProps) {
  return (
    <div className={cn(chipVariants({ size }), className)} {...props}>
      {icon && <span className={cn(iconVariants({ size }))}>{icon}</span>}
      <span>{children}</span>
    </div>
  );
}

export { Chip, chipVariants };
