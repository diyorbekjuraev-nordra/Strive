"use client";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";
import { cn } from "@/lib/utils";

export type SwitchVariant = "sm" | "md" | "lg";

export interface UseSwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  /**
   * The size of the switch.
   * @default "md"
   */
  size?: SwitchVariant;
  /**
   * Additional class name for the thumb element.
   */
  thumbClassName?: string;
  /**
   * Class names for the switch slots.
   */
  classNames?: {
    root?: string;
    thumb?: string;
  };
}

export function useSwitch(originalProps: UseSwitchProps) {
  const {
    size = "md",
    className = "",
    thumbClassName = "",
    classNames = {},
    ...otherProps
  } = originalProps;

  // Size styles mapping
  const sizes = React.useMemo(
    () => ({
      root: {
        sm: "h-[1rem] w-6",
        md: "h-[1.15rem] w-8",
        lg: "h-[1.3rem] w-10",
      },
      thumb: {
        sm: "size-3 data-[state=unchecked]:translate-x-[calc(100%-11px)]",
        md: "size-[13px] data-[state=checked]:translate-x-[calc(100%+2px)] data-[state=unchecked]:translate-x-[calc(100%-11px)]",
        lg: "size-[15px] data-[state=checked]:translate-x-[calc(100%+6px)] data-[state=unchecked]:translate-x-[calc(100%-12px)]",
      },
    }),
    []
  );

  // Create slots object
  const slots = React.useMemo(
    () => ({
      root: cn(
        "peer data-[state=checked]:bg-[var(--interactive)] data-[state=unchecked]:bg-input",
        "focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80",
        "inline-flex shrink-0 items-center rounded-full border shadow-xs transition-all outline-none",
        "focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 border-border",
        sizes.root[size],
        className,
        classNames.root
      ),
      thumb: cn(
        "bg-white dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-white",
        "pointer-events-none block rounded-full ring-0 transition-transform",
        "data-[state=checked]:translate-x-[calc(100%-3px)] data-[state=unchecked]:translate-x-0",
        sizes.thumb[size],
        thumbClassName,
        classNames.thumb
      ),
    }),
    [size, className, thumbClassName, classNames, sizes]
  );

  // Prop getters
  const getRootProps = React.useCallback(
    (props: React.ComponentProps<typeof SwitchPrimitive.Root> = {}) => ({
      ...props,
      className: cn(slots.root, props.className),
      ...otherProps,
    }),
    [slots.root, otherProps]
  );

  const getThumbProps = React.useCallback(
    (props: React.ComponentProps<typeof SwitchPrimitive.Thumb> = {}) => ({
      ...props,
      className: cn(slots.thumb, props.className),
      'data-slot': 'switch-thumb',
    }),
    [slots.thumb]
  );

  return {
    size,
    slots,
    getRootProps,
    getThumbProps,
  };
}

export type UseSwitchReturn = ReturnType<typeof useSwitch>;
