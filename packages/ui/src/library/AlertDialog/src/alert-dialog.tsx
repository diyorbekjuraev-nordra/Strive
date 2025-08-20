"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer ",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--button-background-base)] shadow-button-custom text-white hover:bg-[var(--button-background-hover)] rounded-[8px] transition-colors transition-shadow duration-200 active:bg-[var(--button-background-active)]",
        destructive:
          "bg-[var(--button-destructive-background-base)] text-white  shadow-xs hover:bg-[var(--button-destructive-background-hover)] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-[var(--button-destructive-background-active)] active:bg-[var(--button-destructive-background-active)]",

        "destructive-outline":
          "border border-[var(--button-destructive-background-base)]  bg-transparent text-destructive hover:text-white shadow-xs hover:bg-[var(--button-destructive-background-hover)] focus-visible:ring-[var(--button-destructive-background-base)] dark:focus-visible:ring-[var(--button-destructive-background-base)]  active:bg-[var(--button-destructive-background-active)]",
        "destructive-ghost":
          "border-none bg-transparent text-destructive hover:text-white hover:bg-[var(--button-destructive-background-hover)] focus-visible:ring-[var(--button-destructive-background-hover)] dark:focus-visible:ring-destructive/40 dark:bg-[var(--button-destructive-background-active)] active:bg-[var(--button-destructive-background-active)]",
        outline:
          "border bg-[var(--layer-01)] shadow-xs hover:bg-[var(--background-hover)] hover:text-accent-foreground",
        secondary:
          "bg-[var(--button-secondary-background-base)]  text-white  hover:bg-[var(--button-secondary-background-hover)] active:bg-[var(--button-secondary-background-active)]",
        ghost:
          "hover:bg-[var(--background-hover)] hover:text-accent-foreground dark:hover:bg-[var(--background-hover)]",
        link: "text-[var(--text-primary)] underline-offset-4 hover:underline",
      },
      size: {
        md: "h-8 px-4 py-2 has-[>svg]:px-3",
        sm: "h-6.5 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-6.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

export function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

export function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

export function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

export function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

export function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

export function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

export function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

export function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

export function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}

