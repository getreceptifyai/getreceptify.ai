import type { PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700",
        className,
      )}
    >
      {children}
    </span>
  );
}
