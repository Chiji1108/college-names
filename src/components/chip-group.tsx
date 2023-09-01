import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

export interface ChipGroupProps extends ComponentProps<"ul"> {}

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

// const MotionChipGroup = motion(ChipGroup);
// MotionChipGroup.defaultProps = {
//   initial: "hidden",
//   whileInView: "visible",
//   viewport: {
//     once: true,
//     // margin: "-100px",
//   },
//   variants: {
//     visible: {
//       //   opacity: 1,
//       transition: {
//         delayChildren: 0.3,
//         staggerChildren: 0.05,
//       },
//     },
//     hidden: {
//       //   opacity: 0,
//       //   transition: {
//       //     when: "afterChildren",
//       //   },
//     },
//   },
// };

export { ChipGroup };
