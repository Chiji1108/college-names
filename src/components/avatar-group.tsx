import { cn, getValidChildren } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

export interface AvatarGroupProps extends ComponentProps<"div"> {
  max?: number;
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max, ...props }, ref) => {
    const validChildren = getValidChildren(children);
    /**
     * get the avatars within the max
     */
    const childrenWithinMax =
      max != null ? validChildren.slice(0, max) : validChildren;

    /**
     * get the remaining avatar count
     */
    const excess = max != null ? validChildren.length - max : 0;

    /**
     * Reversing the children is a great way to avoid using zIndex
     * to overlap the avatars
     */
    const reversedChildren = childrenWithinMax.reverse();

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-end flex-row-reverse -space-x-2 space-x-reverse relative",
          className
        )}
        {...props}
      >
        {excess > 0 && (
          <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full items-center justify-center text-xs bg-secondary text-secondary-foreground font-semibold border-background border-2">
            +{excess}
          </div>
        )}
        {reversedChildren}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
