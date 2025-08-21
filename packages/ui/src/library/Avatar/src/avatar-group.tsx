"use client";

import React from "react";
import { getInitials } from "@/lib/utils";
import { TooltipWrapper } from "@/library/Tooltip";
import { AvatarBase } from "./avatar";
import { AvatarImage } from "./avatar-image";
import { AvatarFallback } from "./avatar-fallback";
import { getColorById } from "@/lib/color";
import { cn } from "@/lib/utils";

interface AvatarGroupProps<T> {
  items: T[];
  getId: (item: T) => string | number;
  getName: (item: T) => string;
  getImageUrl?: (item: T) => string | undefined | null;
  className?: string;
  maxVisible?: number;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
};

const AvatarGroup = React.memo(
  <T,>({
    items,
    getId,
    getName,
    getImageUrl,
    className,
    maxVisible = 5,
    size = "md",
  }: AvatarGroupProps<T>) => {
    const visibleItems = items.slice(0, maxVisible);
    const remainingCount = items.length - maxVisible;

    return (
      <div className={cn("flex -space-x-1 overflow-hidden", className)}>
        {visibleItems.map((item) => {
          const id = getId(item);
          const name = getName(item);
          const imageUrl = getImageUrl?.(item);

          return (
            <TooltipWrapper key={id} content={name}>
              <AvatarBase
                aria-label={name}
                className={cn(sizeClasses[size], "ring-2 ring-background hover:z-10")}
              >
                <AvatarImage src={imageUrl ?? ""} alt={name} />
                <AvatarFallback className={cn(getColorById(String(id)))}>
                  {getInitials(name)}
                </AvatarFallback>
              </AvatarBase>
            </TooltipWrapper>
          );
        })}

        {remainingCount > 0 && (
          <TooltipWrapper content={`${remainingCount} more`}>
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
);

AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
