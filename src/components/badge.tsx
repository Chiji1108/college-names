import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border rounded-full bg-card text-card-foreground shadow-sm",
  {
    variants: {
      size: {
        sm: "text-xs px-2.5 py-0.5",
        md: "text-base px-2.5 py-0.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({ className, size, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ size }), className)} {...props}>
      {icon && (
        <span className="mr-1 w-4 h-4 leading-none text-sm grid place-content-center">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}

export { Badge, badgeVariants };
