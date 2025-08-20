import * as React from "react";

export type SlotsToClasses<T extends string> = Partial<Record<T, string>>;
// Prop getter type (following HeroUI pattern)
export type PropGetter<T = Record<string, any>> = (props?: T) => T;

export type AvatarVariant = "default" | "rounded" | "square";

export type AvatarColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  /**
   * Ref to the DOM node.
   */
  ref?: React.Ref<HTMLSpanElement | null>;
  /**
   * Ref to the Image DOM node.
   */
  imgRef?: React.Ref<HTMLImageElement>;
  /**
   * The name of the person in the avatar. -
   * if **src** has loaded, the name will be used as the **alt** attribute of the **img**
   * - If **src** is not loaded, the name will be used to create the initials
   */
  name?: string;
  /**
   * Image source.
   */
  src?: string;
  /**
   * Image alt text.
   */
  alt?: string;

  /**
   * Whether the avatar can be focused.
   * @default false
   */
  isFocusable?: boolean;

  /**
   * If `false`, the avatar will show the background color while loading.
   */
  showFallback?: boolean;
  /**
   * Function to get the initials to display
   */
  getInitials?: (name: string) => string;
  /**
   * Custom fallback component.
   */
  fallback?: string;
  /**
   * Function called when image failed to load
   */
  onError?: () => void;

  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;

  /**
   * Classname or List of classes to change the classNames of the avatar.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Avatar classNames={{
   *    base:"base-classes",
   *    img: "image-classes",
   *    name: "name-classes",
   *    icon: "icon-classes",
   *    fallback: "fallback-classes"
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<"base" | "img" | "name" | "icon" | "fallback">;

  /**
   * The variant to apply.
   * @default "default"
   */
  variant?: AvatarVariant;

  /**
   * The color to apply.
   * @default "default"
   */
  color?: AvatarColor;

  /**
   * If `true`, the avatar will be disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * The size to apply.
   * @default "md"
   */
  size?: AvatarSize;
}

export type UseAvatarProps = AvatarProps & Omit<AvatarProps, "children">;

export const useAvatar = (props: UseAvatarProps) => {
  const {
    name,
    src,
    getInitials,
    fallback,
    classNames,
    variant = "default",
    color = "default",
    size = "md",
    isDisabled,
  } = props;

  const [hasError, setHasError] = React.useState(false);

  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (!imgRef.current) return;
    imgRef.current.onerror = () => {
      setHasError(true);
    };
  }, []);

  const getInitialsText = React.useMemo(() => {
    if (fallback)
      return getInitials?.(fallback) || fallback.charAt(0).toUpperCase();
    return "";
  }, [fallback, getInitials]);

  const variants: Record<AvatarVariant, string> = React.useMemo(
    () => ({
      default: "",
      rounded: "rounded-full",
      square: "rounded-[10px]",
    }),
    [variant]
  );

  const colors: Record<AvatarColor, string> = React.useMemo(
    () => ({
      default:
        "bg-gray-200 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300",
      primary:
        "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
      secondary:
        "bg-lime-100 text-lime-700 dark:bg-lime-500/20 dark:text-lime-300",
      success:
        "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
      warning:
        "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
      error: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
    }),
    [variant, color]
  );

  const sizes: Record<AvatarSize, string> = React.useMemo(
    () => ({
      sm: "size-4 text-[8px]",
      md: "size-6 text-[12px]",
      lg: "size-8 text-[16px]",
      xl: "size-10 text-[20px]",
    }),
    [variant, color, size]
  );

  const disabled = React.useMemo(() => {
    return isDisabled && "cursor-not-allowed opacity-50";
  }, [isDisabled]);

  // Create slots object
  const slots = React.useMemo(
    () => ({
      base: [
        variants[variant],
        colors[color],
        sizes[size],
        classNames?.base,
        disabled,
      ]
        .filter(Boolean)
        .join(" "),
      img: [variants[variant], colors[color], sizes[size], classNames?.img]
        .filter(Boolean)
        .join(" "),
      name: [classNames?.name].filter(Boolean).join(" "),
      icon: [classNames?.icon].filter(Boolean).join(" "),
      fallback: [
        variants[variant],
        colors[color],
        sizes[size],
        classNames?.fallback,
        disabled,
      ]
        .filter(Boolean)
        .join(" "),
    }),
    [variants, colors, sizes, variant, color, size, classNames]
  );

  // Prop getters (following HeroUI pattern)
  const getBaseProps = React.useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "avatar",
      "data-variant": variant,
      "data-color": color,
      title: name,
      "data-truncate": "false",
      style: {
        ...props.style,
      },
      className: slots.base,
      ...props,
    }),
    []
  );

  const getImgProps = React.useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "img",
      "data-variant": variant,
      "data-color": color,
      title: name,
      "data-truncate": "false",
      src: src ?? "",
      style: {
        ...props.style,
      },
      className: slots.img,
      ...props,
    }),
    []
  );

  const getFallbackProps = React.useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "fallback",
      "data-variant": variant,
      "data-color": color,
      title: name,
      "data-truncate": "false",
      style: {
        ...props.style,
      },
      children: getInitialsText,
      className: slots.fallback,
      ...props,
    }),
    []
  );

  return {
    getBaseProps,
    getImgProps,
    getFallbackProps,
    imgRef,
    hasError,
  };
};
