import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

import { UseAlertProps } from "./use-Alert";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-sidebar text-sidebar-foreground",
        destructive:
          "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/20 dark:text-red-300 dark:border-red-600 [&>svg]:text-red-600 dark:[&>svg]:text-red-400 *:data-[slot=alert-description]:text-red-700 dark:*:data-[slot=alert-description]:text-red-300",
        warning:
          "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-600 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400 *:data-[slot=alert-description]:text-yellow-700 dark:*:data-[slot=alert-description]:text-yellow-300",
        success:
          "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-600 [&>svg]:text-green-600 dark:[&>svg]:text-green-400 *:data-[slot=alert-description]:text-green-700 dark:*:data-[slot=alert-description]:text-green-300",
        purple:
          "bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700 [&>svg]:text-purple-600 dark:[&>svg]:text-purple-400 *:data-[slot=alert-description]:text-purple-700 dark:*:data-[slot=alert-description]:text-purple-300",
        blue: "bg-blue-50 text-blue-800 border-[var(--interactive)] dark:bg-blue-900/20 dark:text-blue-300 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400 *:data-[slot=alert-description]:text-blue-700 dark:*:data-[slot=alert-description]:text-blue-300",
      },
      color: {
        gray: "bg-gray-50 text-gray-800 border-gray-300 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-700 [&>svg]:text-gray-600 dark:[&>svg]:text-gray-400 *:data-[slot=alert-description]:text-gray-700 dark:*:data-[slot=alert-description]:text-gray-300",
        red: "bg-red-50 text-red-800 border-red-300 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700 [&>svg]:text-red-600 dark:[&>svg]:text-red-400 *:data-[slot=alert-description]:text-red-700 dark:*:data-[slot=alert-description]:text-red-300",
        yellow:
          "bg-yellow-50 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400 *:data-[slot=alert-description]:text-yellow-700 dark:*:data-[slot=alert-description]:text-yellow-300",
        green:
          "bg-green-50 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700 [&>svg]:text-green-600 dark:[&>svg]:text-green-400 *:data-[slot=alert-description]:text-green-700 dark:*:data-[slot=alert-description]:text-green-300",
        blue: "bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400 *:data-[slot=alert-description]:text-blue-700 dark:*:data-[slot=alert-description]:text-blue-300",
        indigo:
          "bg-indigo-50 text-indigo-800 border-indigo-300 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-700 [&>svg]:text-indigo-600 dark:[&>svg]:text-indigo-400 *:data-[slot=alert-description]:text-indigo-700 dark:*:data-[slot=alert-description]:text-indigo-300",
        purple:
          "bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700 [&>svg]:text-purple-600 dark:[&>svg]:text-purple-400 *:data-[slot=alert-description]:text-purple-700 dark:*:data-[slot=alert-description]:text-purple-300",
        pink: "bg-pink-50 text-pink-800 border-pink-300 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-700 [&>svg]:text-pink-600 dark:[&>svg]:text-pink-400 *:data-[slot=alert-description]:text-pink-700 dark:*:data-[slot=alert-description]:text-pink-300",
        orange:
          "bg-orange-50 text-orange-800 border-orange-300 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700 [&>svg]:text-orange-600 dark:[&>svg]:text-orange-400 *:data-[slot=alert-description]:text-orange-700 dark:*:data-[slot=alert-description]:text-orange-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type AlertProps = React.ComponentProps<"div"> &
  UseAlertProps &
  VariantProps<typeof alertVariants>;

export function Alert({
  className,
  children,
  variant,
  color,
  status,
  customIcon,
  ...props
}: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, color }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
