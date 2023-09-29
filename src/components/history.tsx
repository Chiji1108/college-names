import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";
import { Chip, ChipGroup } from "./chip";

export interface HistoryGroupProps extends HTMLAttributes<HTMLDivElement> {}

const HistoryGroup = forwardRef<HTMLDivElement, HistoryGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <>
        <div
          ref={ref}
          className={cn(
            "border-l-2 border-border flex flex-col pl-6 gap-12 ml-4 mt-8 pb-2",
            className
          )}
          {...props}
        >
          {children}
        </div>
        <div className="border-l-2 border-dashed border-border pl-6 ml-4 h-6" />
      </>
    );
  }
);
HistoryGroup.displayName = "HistoryGroup";

export interface HistoryProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  items?: string[];
  timestamp: string;
  avatar?: React.ReactNode;
}

const History = forwardRef<HTMLDivElement, HistoryProps>(
  (
    { title, description, items, timestamp, avatar, className, ...props },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div className="absolute -top-2">
          <div className="absolute w-12 -left-12 h-[1.5rem] grid place-items-center">
            <div className="w-3 h-3 rounded-full bg-background border-2 border-border overflow-hidden mr-[2px]" />
          </div>
          <div className="text-muted-foreground">{timestamp}</div>
        </div>
        <div className="flex flex-col gap-1 mt-6">
          <div className="flex justify-between rounded-lg overflow-hidden hover:bg-accent transition px-4 py-2 -ml-4 -mt-2 cursor-pointer">
            <div className="flex flex-col justify-center">
              <h4 className="font-bold text-lg leading-tight">{title}</h4>
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>
            {avatar}
          </div>
          {items && (
            <ChipGroup>
              {items.map((d, i) => (
                <Chip key={i} size="sm" clickable={false}>
                  {d}
                </Chip>
              ))}
            </ChipGroup>
          )}
        </div>
      </div>
      //   <Card className="flex flex-col gap-1" {...props}>
      //     <div className="leading-tight">
      //       <p>{primary}</p>
      //       {secondary && <p>{secondary}</p>}
      //     </div>
      //     {items && (
      //       <ul className="flex flex-wrap gap-2">
      //         {items.map((d, i) => (
      //           <li key={i}>{d}</li>
      //         ))}
      //       </ul>
      //     )}
      //     {footer && <p className="text-sm text-muted-foreground">{footer}</p>}
      //   </Card>
    );
  }
);
History.displayName = "HistoryItem";

export { History, HistoryGroup };
