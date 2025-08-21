"use client";

import { Popover as PopoverPrimitive } from "radix-ui";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  forceMount?: boolean;
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        onInteractOutside={(e: any) => {
          // allow closing if clicked outside
          // prevent closing when clicking inside the content
          if (
            e.target instanceof HTMLElement &&
            e.currentTarget?.contains(e.target)
          ) {
            e.preventDefault();
          }
        }}
        asChild
        forceMount
        align={align}
        sideOffset={sideOffset}
      >
        <AnimatePresence>
          {/* @ts-ignore */}
          {props?.forceMount !== false && (
            // @ts-ignore
            <motion.div
              key="popover-content"
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={cn(
                LAYER_CLASSNAMES[layer],
                "will-change-[transform,opacity] text-popover-foreground z-50 w-72 border p-2 shadow-md outline-hidden dark:bg-sidebar rounded-[16px]",
                className
              )}
              {...props}
            />
          )}
        </AnimatePresence>
      </PopoverPrimitive.Content>
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
