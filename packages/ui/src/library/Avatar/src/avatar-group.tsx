"use client";

import React, { JSX, useMemo } from "react";
import { getInitials } from "@/lib/utils";
import { TooltipWrapper } from "@/library/Tooltip";
import { AvatarBase } from "./avatar";
import { AvatarImage } from "./avatar-image";
import { AvatarFallback } from "./avatar-fallback";
import { getColorById } from "@/lib/color";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";
interface AvatarGroupProps<T> {
  items: T[];
  getId: (item: T) => string | number;
  getName: (item: T) => string;
  getImageUrl?: (item: T) => string | undefined | null;
  className?: string;
  maxVisible?: number;
  size?: "sm" | "md" | "lg";
  classNames?: {
    avatar?: string;
    fallback?: string;
    tooltip?: string;
  };
}

const sizeClasses: Record<Size, string> = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
} as const;

function AvatarGroupInner<T>({
  items,
  getId,
  getName,
  getImageUrl,
  className,
  maxVisible = 5,
  size = "md",
  classNames,
}: AvatarGroupProps<T>) {
  const { visibleItems, remainingCount } = useMemo(() => {
    const visible = items.slice(0, maxVisible);
    const remaining = Math.max(0, items.length - maxVisible);
    return { visibleItems: visible, remainingCount: remaining };
  }, [items, maxVisible]);

  if (!visibleItems.length && remainingCount === 0) {
    return <div className={cn("flex", className)} aria-hidden="true" />;
  }

  return (
    <div className={cn("flex -space-x-1", className)}>
      {visibleItems.map((item) => {
        const idStr = String(getId(item));
        const name = getName(item);
        const src = getImageUrl?.(item) || undefined;

        return (
          <TooltipWrapper
            key={idStr}
            content={name}
            classNames={{
              content: classNames?.tooltip,
            }}
          >
            <AvatarBase
              aria-label={name}
              title={name}
              className={cn(
                sizeClasses[size],
                "ring-1 ring-border hover:z-10 focus:z-10",
                classNames?.avatar
              )}
            >
              {src ? (
                <AvatarImage
                  src={src}
                  alt={name}
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <AvatarFallback
                className={cn(getColorById(idStr), classNames?.fallback)}
              >
                {getInitials(name)}
              </AvatarFallback>
            </AvatarBase>
          </TooltipWrapper>
        );
      })}

      {remainingCount > 0 && (
        <TooltipWrapper
          content={`+${remainingCount} more`}
          classNames={{
            content: classNames?.tooltip,
          }}
        >
          <div
            className={cn(
              "flex items-center justify-center rounded-full bg-muted text-muted-foreground font-medium border hover:z-10",
              sizeClasses[size]
            )}
          >
            +{remainingCount}
          </div>
        </TooltipWrapper>
      )}
    </div>
  );
}

// ✅ Preserve generics when wrapping with React.memo
const AvatarGroup = React.memo(AvatarGroupInner) as <T>(
  props: AvatarGroupProps<T>
) => JSX.Element;

export { AvatarGroup };
