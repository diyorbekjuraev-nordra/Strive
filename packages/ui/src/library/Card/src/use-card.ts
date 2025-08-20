import * as React from "react";
import { useCallback, useMemo } from "react";
import { LAYER_CLASSNAMES } from "@/lib/shared/layer";

// Hook types
export type CardLayer = 0 | 1 | 2 | 3;

export type CardSize = "sm" | "md" | "lg";

export type CardVariant = "default" | "bordered" | "elevated" | "flat";

export type CardSlots =
  | "card"
  | "header"
  | "title"
  | "description"
  | "action"
  | "content"
  | "footer";

export type SlotsToClasses<T extends string> = Partial<Record<T, string>>;

export type PropGetter<T = Record<string, any>> = (props?: T) => T;

export type UseCardProps = {
  /**
   * The layer level for the card, affecting background and styling.
   * @default 1
   */
  layer?: CardLayer;

  /**
   * Size variant of the card, affecting padding and spacing.
   * @default "md"
   */
  size?: CardSize;

  /**
   * Visual variant of the card.
   * @default "default"
   */
  variant?: CardVariant;

  /**
   * Whether the card should have a border.
   * @default true
   */
  bordered?: boolean;

  /**
   * Whether the card header should have a bottom border.
   * @default false
   */
  headerBordered?: boolean;

  /**
   * Whether the card footer should have a top border.
   * @default false
   */
  footerBordered?: boolean;

  /**
   * Custom border radius for the card.
   */
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Whether the card should be clickable (adds hover effects).
   * @default false
   */
  isClickable?: boolean;

  /**
   * Whether the card is in a disabled state.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Object containing className overrides for different card slots.
   *
   * @example
   * ```tsx
   * classNames={{
   *   card: "my-card-class",
   *   header: "my-header-class",
   *   title: "my-title-class",
   *   content: "my-content-class"
   * }}
   * ```
   */
  classNames?: SlotsToClasses<CardSlots>;

  /**
   * Additional CSS class for the main card element.
   */
  className?: string;


  hoverable?: boolean;
} & React.ComponentProps<"div">;

// Size configurations
const CARD_SIZES = {
  sm: {
    card: "gap-3 py-3",
    header: "px-3 gap-1 bg-transparent",
    content: "px-3 bg-transparent",
    footer: "px-3 bg-transparent",
    title: "text-sm bg-transparent",
    description: "text-xs bg-transparent",
  },
  md: {
    card: "gap-4 py-4",
    header: "px-3 gap-1.5 bg-transparent",
    content: "px-3 bg-transparent",
    footer: "px-3 bg-transparent",
    title: "text-base bg-transparent",
    description: "text-sm bg-transparent",
  },
  lg: {
    card: "gap-6 py-6",
    header: "px-3 gap-2 bg-transparent",
    content: "px-3 bg-transparent",
    footer: "px-3 bg-transparent",
    title: "text-lg bg-transparent",
    description: "text-base bg-transparent",  
  },
} as const;

// Variant configurations
const CARD_VARIANTS = {
  default: "border shadow-sm",
  bordered: "border-2",
  elevated: "border shadow-lg",
  flat: "border-0 shadow-none",
} as const;

// Radius configurations
const CARD_RADIUS = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
} as const;

export const useCard = (props: UseCardProps = {}) => {
  const {
    layer = 1,
    size,
    variant = "default",
    bordered = true,
    headerBordered = false,
    footerBordered = false,
    radius = "xl",
    isClickable = false,
    isDisabled = false,
    classNames,
    className,
    hoverable = false,
    ...otherProps
  } = props;

  const sizeConfig = CARD_SIZES[size || "sm"];

  // Generate slot classes
  const slots = useMemo(() => {
    return {
      card: [
        "text-card-foreground flex flex-col",
        sizeConfig.card,
        CARD_RADIUS[radius],
        bordered && CARD_VARIANTS[variant],
        LAYER_CLASSNAMES[layer],
        hoverable && "hover:bg-[var(--background-hover)]",
        isClickable &&
          !isDisabled &&
          "cursor-pointer hover:shadow-md transition-shadow",
        isDisabled && "opacity-60 pointer-events-none",
        className,
        classNames?.card,
      ]
        .filter(Boolean)
        .join(" "),

      header: [
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start",
        sizeConfig.header,
        "has-[data-slot=card-action]:grid-cols-[1fr_auto]",
        headerBordered && "border-b [&]:pb-6",
        LAYER_CLASSNAMES[layer],
        classNames?.header,
      ]
        .filter(Boolean)
        .join(" "),

      title: [
        "leading-none font-semibold",
        hoverable && "hover:bg-[var(--background-hover)]",
        sizeConfig.title,
        LAYER_CLASSNAMES[layer],
        classNames?.title,
      ]
        .filter(Boolean)
        .join(" "),

      description: [
        "text-muted-foreground",
        hoverable && "hover:bg-[var(--background-hover)]",
        sizeConfig.description,
        LAYER_CLASSNAMES[layer],
        classNames?.description,
      ]
        .filter(Boolean)
        .join(" "),

      action: [
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        classNames?.action,
      ]
        .filter(Boolean)
        .join(" "),

      content: [
        CARD_RADIUS[radius],
        LAYER_CLASSNAMES[layer],
        sizeConfig.content,
        classNames?.content,
      ]
        .filter(Boolean)
        .join(" "),

      footer: [
        "flex items-center",
        sizeConfig.footer,
        footerBordered && "border-t [&]:pt-6",
        hoverable && "hover:bg-[var(--background-hover)]",
        LAYER_CLASSNAMES[layer],
        classNames?.footer,
      ]
        .filter(Boolean)
        .join(" "),
    };
  }, [
    layer,
    size,
    variant,
    bordered,
    headerBordered,
    footerBordered,
    radius,
    isClickable,
    isDisabled,
    className,
    classNames,
    sizeConfig,
    hoverable,
  ]);

  // Prop getters
  const getCardProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "card",
      "data-layer": layer,
      "data-size": size,
      "data-variant": variant,
      "data-clickable": isClickable || undefined,
      "data-disabled": isDisabled || undefined,
      className: slots.card,
      ...otherProps,
      ...props,
    }),
    [slots.card, layer, size, variant, isClickable, isDisabled, otherProps]
  );

  const getHeaderProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "card-header",
      "data-bordered": headerBordered || undefined,
      className: slots.header,

      ...props,
    }),
    [slots.header, headerBordered]
  );

  const getTitleProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "card-title",
      className: slots.title,
      ...props,
    }),
    [slots.title]
  );

  const getDescriptionProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "card-description",
      className: slots.description,
      ...props,
    }),
    [slots.description]
  );

  const getActionProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "card-action",
      className: slots.action,
      ...props,
    }),
    [slots.action]
  );

  const getContentProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "card-content",
      className: slots.content,
      ...props,
    }),
    [slots.content]
  );

  const getFooterProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "card-footer",
      "data-bordered": footerBordered || undefined,
      className: slots.footer,
      ...props,
    }),
    [slots.footer, footerBordered]
  );

  return {
    layer,
    size,
    variant,
    bordered,
    headerBordered,
    footerBordered,
    radius,
    isClickable,
    isDisabled,
    slots,
    getCardProps,
    getHeaderProps,
    getTitleProps,
    getDescriptionProps,
    getActionProps,
    getContentProps,
    getFooterProps,
  };
};
