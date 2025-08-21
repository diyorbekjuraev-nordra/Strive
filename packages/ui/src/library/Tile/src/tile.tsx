"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import { type LAYER_VARIANTS } from "@/lib/types/colors";
import { LAYER_CLASSNAMES } from "@/lib/shared/layer";

// ---- Base Tile ----
type TileProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function Tile({ children, className, ...props }: TileProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ---- Clickable Tile ----
type ClickableTileProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function ClickableTile({
  href,
  children,
  className,
  ...props
}: ClickableTileProps) {
  return (
    <a
      href={href}
      className={cn(
        "block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-lg hover:bg-gray-50",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

// ---- Selectable Tile ----
type SelectableTileProps = {
  selected?: boolean;
  onChange?: (selected: boolean) => void;
  children: React.ReactNode;
  className?: string;
  hasIndicator?: boolean;
  indicatorRenderer?: () => React.ReactNode;
  layer?: LAYER_VARIANTS;
  classNames?: {
    root?: string;
    content?: string;
    indicator?: string;
  };
};

function SelectableTile({
  selected = false,
  onChange,
  children,
  className,
  hasIndicator = true,
  indicatorRenderer,
  classNames,
  layer = 1,
}: SelectableTileProps) {
  const [isSelected, setIsSelected] = React.useState(selected);

  const toggle = () => {
    const newState = !isSelected;
    setIsSelected(newState);
    onChange?.(newState);
  };

  return (
    <div
      role="button"
      aria-pressed="mixed"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      onClick={toggle}
      className={cn(
        "relative flex w-full items-center justify-between rounded-md border p-4 text-left transition",
        LAYER_CLASSNAMES[layer],
        isSelected
          ? "border-[var(--interactive)] bg-[var(--interactive)]/10 shadow-md"
          : "border-border hover:shadow-md",
        className,
        classNames?.root
      )}
    >
      <div>{children}</div>
      {isSelected &&
        hasIndicator &&
        (indicatorRenderer?.() ?? (
          <CircleCheck className="absolute right-3 top-3 h-4 w-4 text-[var(--interactive)]" />
        ))}
    </div>
  );
}

export { Tile, ClickableTile, SelectableTile };
