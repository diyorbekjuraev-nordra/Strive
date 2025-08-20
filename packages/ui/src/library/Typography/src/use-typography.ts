import { ReactNode, ElementType, useMemo, useCallback } from "react";
import { STATUS_VARIANTS, TEXT_COLOR_VARIANTS } from "@/lib/types/colors";
import { useColors } from "@/lib/hooks/useColors";
// Base type definitions
type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "title"
  | "body"
  | "small"
  | "caption";

type TypographyWeight = "light" | "normal" | "medium" | "semibold" | "bold";
type TypographyAlign = "left" | "center" | "right" | "justify";
type TypographyTruncate =
  | boolean
  | "single"
  | "multi"
  | { lines?: number; showTooltip?: boolean };

// Slot-based class names
type SlotsToClasses<T extends string> = Partial<Record<T, string>>;

interface TypographyProps {
  /**
   * The typography variant to use.
   * @default "body"
   */
  variant?: TypographyVariant;
  /**
   * The color variant to apply.
   * @default "default"
   */
  color?: TEXT_COLOR_VARIANTS;

  status?: STATUS_VARIANTS;
  /**
   * The font weight to apply.
   * @default "normal"
   */
  weight?: TypographyWeight;
  /**
   * Text alignment.
   * @default "left"
   */
  align?: TypographyAlign;
  /**
   * The component to render as.
   */
  as?: ElementType;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Classname or List of classes to change the classNames of the element.
   *
   * @example
   * ```ts
   * <Typography classNames={{
   *    base: "base-classes",
   *    content: "content-classes"
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<"base" | "content">;
  /**
   * The content to render.
   */
  children?: ReactNode;
  /**
   * Truncate text if it exceeds a certain number of lines.
   * @default false
   */
  truncate?: TypographyTruncate;
}

// Prop getter type (following HeroUI pattern)
type PropGetter<T = Record<string, any>> = (props?: T) => T;

type UseTypographyProps = TypographyProps & Record<string, any>;

function useTypography(originalProps: UseTypographyProps) {
  const { text_colors, status_colors } = useColors();
  const {
    variant = "body",
    color = "primary",
    weight = "normal",
    align = "left",
    as,
    className = "",
    classNames,
    children,
    truncate = false,
    status,
    ...otherProps
  } = originalProps;

  // Variant styles mapping
  const variants: Record<TypographyVariant, string> = useMemo(
    () => ({
      h1: "text-4xl font-bold leading-tight",
      h2: "text-3xl font-bold leading-tight",
      h3: "text-2xl font-semibold leading-snug",
      h4: "text-xl font-semibold leading-snug",
      title: "text-lg font-medium leading-normal",
      body: "text-base leading-relaxed",
      small: "text-sm leading-normal",
      caption: "text-xs leading-tight",
    }),
    []
  );

  // Color styles mapping

  // Weight styles mapping
  const weights: Record<TypographyWeight, string> = useMemo(
    () => ({
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    }),
    []
  );

  // Alignment styles mapping
  const alignments: Record<TypographyAlign, string> = useMemo(
    () => ({
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    }),
    []
  );

  // Default element mapping
  const elementMap: Record<TypographyVariant, ElementType> = useMemo(
    () => ({
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      title: "h5",
      body: "p",
      small: "p",
      caption: "span",
    }),
    []
  );

  // Handle truncation configuration
  const truncateConfig = useMemo(() => {
    if (!truncate) return null;

    if (truncate === true || truncate === "single") {
      return { type: "single", lines: 1, showTooltip: false };
    }

    if (truncate === "multi") {
      return { type: "multi", lines: 3, showTooltip: false };
    }

    if (typeof truncate === "object") {
      return {
        type: truncate.lines === 1 ? "single" : "multi",
        lines: truncate.lines || 3,
        showTooltip: truncate.showTooltip || false,
      };
    }

    return null;
  }, [truncate]);

  const truncateStyles = useMemo(() => {
    if (!truncateConfig) return "";

    if (truncateConfig.type === "single") {
      return "truncate overflow-hidden whitespace-nowrap";
    }

    // Multi-line truncation using line-clamp
    return `overflow-hidden text-ellipsis line-clamp-${truncateConfig.lines}`;
  }, [truncateConfig]);

  const customTruncateStyle = useMemo(() => {
    if (!truncateConfig || truncateConfig.type === "single") return {};

    // Fallback CSS for multi-line truncation
    return {
      display: "-webkit-box",
      WebkitLineClamp: truncateConfig.lines,
      WebkitBoxOrient: "vertical" as const,
      overflow: "hidden",
      textOverflow: "ellipsis",
    };
  }, [truncateConfig]);

  // Generate dynamic styles
  const dynamicColorStyles = useMemo(() => {
    if (!status)
      return {
        color: text_colors[color],
      };
    return {
      color: status_colors[status],
    };
  }, [status, color]);

  // Determine the component to render
  const Component = as || elementMap[variant] || "p";

  // Create slots object
  const slots = useMemo(
    () => ({
      base: [
        variants[variant],
        weights[weight],
        alignments[align],
        classNames?.base,
        className,
        truncateStyles,
      ]
        .filter(Boolean)
        .join(" "),
      content: [classNames?.content].filter(Boolean).join(" "),
    }),
    [
      variants,
      weights,
      alignments,
      variant,
      color,
      weight,
      align,
      classNames,
      className,
      truncateStyles,
    ]
  );

  // Prop getters (following HeroUI pattern)
  const getBaseProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "base",
      "data-variant": variant,
      "data-color": color,
      "data-weight": weight,
      "data-align": align,
      title: children,
      "data-truncate": truncateConfig?.type || "false",
      ...(truncateConfig?.showTooltip && {
        title: typeof children === "string" ? children : "",
      }),
      style: {
        ...customTruncateStyle,
        ...dynamicColorStyles,
        ...otherProps.style,
        ...props.style,
      },
      className: slots.base,
      ...otherProps,
      ...props,
    }),
    [variant, color, weight, align, slots.base, otherProps, truncateConfig]
  );

  const getContentProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "content",
      className: slots.content,
      ...props,
    }),
    [slots.content]
  );

  const getTypographyProps = useCallback<PropGetter>(
    (props = {}) => ({
      as: Component,
      ...getBaseProps(props),
    }),
    [Component, getBaseProps]
  );

  return {
    Component,
    variant,
    color,
    weight,
    align,
    truncate: truncateConfig,
    children,
    slots,
    classNames,
    getBaseProps,
    getContentProps,
    getTypographyProps,
  };
}

export {
  useTypography,
  type TypographyVariant,
  type TypographyWeight,
  type TypographyProps,
};
export type UseTypographyReturn = ReturnType<typeof useTypography>;
