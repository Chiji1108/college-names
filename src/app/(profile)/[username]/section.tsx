import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  icon?: string;
  title?: string;
  cta?: React.ReactNode;
}

export default function Section({
  icon,
  title,
  cta,
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section className={cn("mx-6", className)} {...props}>
      {(icon || title || cta) && (
        <div className="flex justify-between items-center mb-4">
          <div className="font-black text-2xl flex gap-2">
            {icon && <span>{icon}</span>}
            {title && <h2>{title}</h2>}
          </div>
          {cta && <div>{cta}</div>}
        </div>
      )}
      {/* {title ? <FadeIn>{children}</FadeIn> : children} */}
      {children}
    </section>
  );
}
