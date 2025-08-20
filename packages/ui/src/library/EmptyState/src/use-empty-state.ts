import { useCallback, useMemo } from "react";

// Hook types
export type EmptyStateSize = "sm" | "md" | "lg";

export type EmptyStateSlots =
  | "wrapper"
  | "svg"
  | "content"
  | "title"
  | "description"
  | "action";

export type SlotsToClasses<T extends string> = Partial<Record<T, string>>;

export type PropGetter<T = Record<string, any>> = (props?: T) => T;

export type UseEmptyStateProps = {
  /**
   * The main title text for the empty state.
   * @default "Nothing in here"
   */
  title?: string;

  /**
   * Descriptive text that provides more context about the empty state.
   * @default "Some description should be provided here, if needed..."
   */
  description?: string;

  /**
   * Whether to show an action button in the empty state.
   * @default false
   */
  hasAction?: boolean;

  /**
   * Text to display on the action button when `hasAction` is true.
   * @default "Action Text"
   */
  actionText?: string;

  /**
   * Size of the SVG icon, affecting its dimensions and spacing.
   * @default "md"
   */
  svgSize?: EmptyStateSize;

  /**
   * Callback function called when the action button is clicked.
   * Only relevant when `hasAction` is true.
   */
  onAction?: () => void;

  /**
   * Additional props to pass to the action button.
   * Useful for customizing button variant, size, or other properties.
   */
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;

  /**
   * Object containing className overrides for different empty state slots.
   *
   * @example
   * ```tsx
   * classNames={{
   *   wrapper: "my-wrapper-class",
   *   title: "my-title-class",
   *   description: "my-description-class",
   *   action: "my-action-class"
   * }}
   * ```
   */
  classNames?: SlotsToClasses<EmptyStateSlots>;

  /**
   * Additional CSS class for the main wrapper element.
   */
  className?: string;

  /**
   * Whether to show the SVG icon.
   * @default true
   */
  showIcon?: boolean;

  /**
   * Custom icon to use instead of the default EmptyStateSVG.
   */
  customIcon?: React.ReactNode;
};

// Size configurations for different elements
export const EMPTY_STATE_SIZES = {
  sm: {
    wrapper: "gap-3",
    content: "gap-1.5",
    title: "text-base font-medium",
    description: "text-xs max-w-[250px]",
  },
  md: {
    wrapper: "gap-4",
    content: "gap-2",
    title: "text-lg font-medium",
    description: "text-sm max-w-[300px]",
  },
  lg: {
    wrapper: "gap-6",
    content: "gap-3",
    title: "text-xl font-semibold",
    description: "text-base max-w-[400px]",
  },
} as const;

export const useEmptyState = (props: UseEmptyStateProps) => {
  const {
    title = "Nothing in here",
    description = "Some description should be provided here, if needed...",
    hasAction = false,
    actionText = "Action Text",
    svgSize = "md",
    onAction,
    buttonProps,
    classNames,
    className,
    showIcon = true,
    customIcon,
  } = props;

  // Handle action button click
  const handleAction = useCallback(() => {
    onAction?.();
  }, [onAction]);

  // Determine if action should be shown
  const shouldShowAction = hasAction && actionText;

  // Generate slot classes based on size
  const slots = useMemo(() => {
    const sizeConfig = EMPTY_STATE_SIZES[svgSize];

    return {
      wrapper: [
        "flex items-center justify-center flex-col",
        sizeConfig.wrapper,
        className,
        classNames?.wrapper,
      ]
        .filter(Boolean)
        .join(" "),

      svg: [classNames?.svg].filter(Boolean).join(" "),

      content: [
        "flex flex-col justify-center items-center",
        sizeConfig.content,
        classNames?.content,
      ]
        .filter(Boolean)
        .join(" "),

      title: [sizeConfig.title, "text-foreground", classNames?.title]
        .filter(Boolean)
        .join(" "),

      description: [
        sizeConfig.description,
        "text-muted-foreground text-center",
        shouldShowAction ? "mb-4" : "",
        classNames?.description,
      ]
        .filter(Boolean)
        .join(" "),

      action: [classNames?.action].filter(Boolean).join(" "),
    };
  }, [svgSize, className, classNames, shouldShowAction]);

  // Prop getters
  const getWrapperProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "wrapper",
      "data-size": svgSize,
      "data-has-action": shouldShowAction,
      "data-has-icon": showIcon,
      className: slots.wrapper,
      ...props,
    }),
    [slots.wrapper, svgSize, shouldShowAction, showIcon]
  );

  const getSvgProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "svg",
      size: svgSize,
      className: slots.svg,
      ...props,
    }),
    [slots.svg, svgSize]
  );

  const getContentProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "content",
      className: slots.content,
      ...props,
    }),
    [slots.content]
  );

  const getTitleProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "title",
      className: slots.title,
      ...props,
    }),
    [slots.title]
  );

  const getDescriptionProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "description",
      className: slots.description,
      ...props,
    }),
    [slots.description]
  );

  const getActionProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "action",
      onClick: handleAction,
      className: slots.action,
      ...buttonProps,
      ...props,
    }),
    [slots.action, handleAction, buttonProps]
  );

  return {
    title,
    description,
    actionText,
    svgSize,
    showIcon,
    customIcon,
    shouldShowAction,
    slots,
    getWrapperProps,
    getSvgProps,
    getContentProps,
    getTitleProps,
    getDescriptionProps,
    getActionProps,
  };
};
