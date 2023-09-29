import { cn } from "@/lib/utils";
import { SmilePlus } from "lucide-react";
import { forwardRef } from "react";

interface ReactionAddButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

const ReactionAddButton = forwardRef<HTMLButtonElement, ReactionAddButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "grid place-items-center rounded-full overflow-hidden p-2 w-fit border border-transparent bg-secondary text-secondary-foreground transition hover:bg-primary/10 focus:ring-primary/50 focus:ring",
          className
        )}
        {...props}
      >
        <SmilePlus size={16} />
      </button>
    );
  }
);
ReactionAddButton.displayName = "ReactionAddButton";

export { ReactionAddButton };
