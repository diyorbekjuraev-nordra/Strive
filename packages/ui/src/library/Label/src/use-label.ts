"use client";

import { useColors } from "@/lib/hooks/useColors";
import { STATUS_VARIANTS, TEXT_COLOR_VARIANTS } from "@/lib/types/colors";
import { ReactNode, ElementType, useMemo, useCallback } from "react";

// Base type definitions
export type LabelVariant = "default" | "inline" | "floating";
export type LabelSize = "sm" | "md" | "lg";

// Slot-based class names
type LabelSlots = {
  base: string;
  required: string;
};

export interface UseLabelProps {
  /**
   * The id of the element the label is associated with.
   */

  color?: TEXT_COLOR_VARIANTS;

  status?: STATUS_VARIANTS;

  htmlFor?: string;
  /**
   * The label variant to use.
   * @default "default"
   */
  variant?: LabelVariant;
  /**
   * The size of the label.
   * @default "md"
   */
  size?: LabelSize;
  /**
   * Whether the field is required.
   * @default false
   */
  required?: boolean;
  /**
   * Whether the label is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Whether the label should be visually hidden.
   * @default false
   */
  visuallyHidden?: boolean;
  /**
   * The component to render as.
   */
  as?: ElementType;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Classname or List of classes to change the classNames of the element.
   */
  classNames?: SlotsToClasses<keyof LabelSlots>;
  /**
   * The content of the label.
   */
  children?: ReactNode;
}

type SlotsToClasses<T extends string> = Partial<Record<T, string>>;

type PropGetter<T = Record<string, any>> = (props?: T) => T;

export function useLabel(originalProps: UseLabelProps) {
  const { text_colors, status_colors } = useColors();
  const {
    variant = "default",
    size = "md",
    required = false,
    disabled = false,
    visuallyHidden = false,
    as: Component = "label",
    className,
    classNames,
    children,
    color = "primary",
    status,
    ...otherProps
  } = originalProps;

  // Variant styles mapping
  const variantStyles: Record<LabelVariant, string> = {
    default: "block text-sm font-medium",
    inline: "inline-flex items-center gap-2 text-sm font-medium",
    floating:
      "absolute left-2 -top-2 px-1 text-xs font-medium bg-background transition-all duration-200",
  };

  // Size styles mapping
  const sizeStyles: Record<LabelSize, string> = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  // Generate slot classes
  const slots = useMemo<LabelSlots>(
    () => ({
      base: [
        variantStyles[variant],
        sizeStyles[size],
        disabled ? "opacity-50 cursor-not-allowed" : "",
        visuallyHidden ? "sr-only" : "",
        classNames?.base,
        className,
      ]
        .filter(Boolean)
        .join(" "),

      required: ["text-destructive", classNames?.required]
        .filter(Boolean)
        .join(" "),
    }),
    [variant, size, disabled, visuallyHidden, classNames, className]
  );

  const dynamicStyles = useMemo(() => {
    if (!status)
      return {
        color: text_colors[color],
      };
    return {
      color: status_colors[status],
    };
  }, [status, color]);

  // Prop getters
  const getLabelProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "label",
      className: slots.base,
      "data-disabled": disabled || undefined,
      "data-status": status || undefined,
      style: {
        ...dynamicStyles,
        ...props.style,
      },
      ...otherProps,
      ...props,
    }),
    [slots.base, disabled, otherProps, status, color, text_colors]
  );

  const getRequiredIndicatorProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "required-indicator",
      className: slots.required,
      ...props,
    }),
    [slots.required]
  );

  return {
    Component,
    children,
    getLabelProps,
    getRequiredIndicatorProps,
    required,
    slots,
  };
}

export type UseLabelReturn = ReturnType<typeof useLabel>;
