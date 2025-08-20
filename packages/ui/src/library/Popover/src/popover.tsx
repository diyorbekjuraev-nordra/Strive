"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";
import { LAYER_CLASSNAMES, LAYER_LEVEL } from "@/lib/shared/layer";

import { cn } from "@/lib/utils";

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      className="active:bg-[var(--background-active)] rounded-md"
      {...props}
    />
  );
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  layer = LAYER_LEVEL.LAYER_1,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & {
  layer?: LAYER_LEVEL;
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          LAYER_CLASSNAMES[layer],
          "text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 border p-2 shadow-md outline-hidden dark:bg-sidebar rounded-[16px]",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

interface TPopoverItem extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  contentEditable?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
const PopoverItem = React.memo(
  ({
    className,
    children,
    onClick,

    contentEditable = false,
    ...props
  }: TPopoverItem) => {
    const handleClick = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick?.();
      },
      [onClick]
    );

    return (
      <div
        className={cn(
          "cursor-pointer w-full justify-between focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex  items-center gap-2 px-2 py-1 rounded-sm  text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-[var(--background-hover)]",
          className,
          contentEditable &&
            "border border-transparent focus:outline-none focus:border-[var(--interactive)]"
        )}
        contentEditable={contentEditable}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverItem,
  type TPopoverItem,
};
