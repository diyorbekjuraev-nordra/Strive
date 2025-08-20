import { useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { type InputProps } from "@/library/Input";

// Hook types
export type SearchInputSize = "xs" | "sm" | "md" | "lg";

export type SearchInputSlots =
  | "wrapper"
  | "input"
  | "searchIcon"
  | "clearButton";

export type SlotsToClasses<T extends string> = Partial<Record<T, string>>;

export type PropGetter<T = Record<string, any>> = (props?: T) => T;

export type UseSearchInputProps = {
  /**
   * The size of the search input, affecting padding, height, and icon positioning.
   * @default "sm"
   */
  size?: SearchInputSize;

  /**
   * The current value of the search input.
   */
  value?: string;

  /**
   * Callback function called when the clear button is clicked.
   * If not provided, the clear button will not be shown.
   */
  onClear?: () => void;

  /**
   * Placeholder text for the input field.
   * @default "Search"
   */
  placeholder?: string;

  /**
   * Whether the clear button should be shown even when onClear is provided.
   * @default true
   */
  showClearButton?: boolean;

  /**
   * Object containing className overrides for different search input slots.
   *
   * @example
   * ```tsx
   * classNames={{
   *   wrapper: "my-wrapper-class",
   *   input: "my-input-class",
   *   searchIcon: "my-search-icon-class",
   *   clearButton: "my-clear-button-class"
   * }}
   * ```
   */
  classNames?: SlotsToClasses<SearchInputSlots>;

  /**
   * Additional CSS class for the wrapper element.
   */
  className?: string;
} & Omit<InputProps, "size" | "className">;

// Size configurations
const SEARCH_INPUT_SIZES = {
  xs: {
    searchIcon: "absolute left-2 h-4 w-4 text-muted-foreground top-1",
    input: "pl-8",
    clearButton: "absolute !size-4 rounded-sm right-2 top-1",
  },
  sm: {
    searchIcon: "absolute left-2 h-4 w-4 text-muted-foreground top-1.5",
    input: "pl-8",
    clearButton: "absolute !size-5 rounded-sm right-2 top-1",
  },
  md: {
    searchIcon: "absolute left-2 h-4 w-4 text-muted-foreground top-2",
    input: "pl-8",
    clearButton: "absolute !size-6 rounded-sm right-2 top-1",
  },
  xl: {
    searchIcon: "absolute left-2 h-4 w-4 text-muted-foreground top-1.5",
    input: "pl-8",
    clearButton: "absolute !size-6 rounded-sm right-2 top-1",
  },
  lg: {
    searchIcon: "absolute left-2 h-4 w-4 text-muted-foreground top-3",
    input: "pl-8",
    clearButton: "absolute !size-6 rounded-sm right-2 top-2",
  },
} as const;

export const useSearchInput = (props: UseSearchInputProps) => {
  const {
    size = "sm",
    value,
    onClear,
    placeholder = "Search",
    showClearButton = true,
    classNames,
    className,
    ...inputProps
  } = props;

  // Determine if clear button should be visible
  const shouldShowClearButton = Boolean(
    onClear && showClearButton && value && value.length > 0
  );

  // Handle clear button click
  const handleClear = useCallback(() => {
    onClear?.();
  }, [onClear]);

  // Generate slot classes
  const slots = useMemo(() => {
    const sizeConfig = SEARCH_INPUT_SIZES[size];

    return {
      wrapper: cn("relative", className, classNames?.wrapper),
      input: cn(sizeConfig.input, classNames?.input),
      searchIcon: cn(sizeConfig.searchIcon, classNames?.searchIcon),
      clearButton: cn(sizeConfig.clearButton, classNames?.clearButton),
    };
  }, [size, className, classNames]);

  // Prop getters
  const getWrapperProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "wrapper",
      "data-size": size,
      "data-has-value": Boolean(value),
      "data-has-clear": shouldShowClearButton,
      className: slots.wrapper,
      ...props,
    }),
    [slots.wrapper, size, value, shouldShowClearButton]
  );

  const getInputProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "input",
      size,
      className: slots.input,
      placeholder,
      value,
      ...inputProps,
      ...props,
    }),
    [slots.input, size, placeholder, value, inputProps]
  );

  const getSearchIconProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "search-icon",
      className: slots.searchIcon,
      ...props,
    }),
    [slots.searchIcon]
  );

  const getClearButtonProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "clear-button",
      onClick: handleClear,
      variant: "outline" as const,
      hasIconOnly: true,
      iconDescription: "Clear search",
      className: slots.clearButton,
      ...props,
    }),
    [slots.clearButton, handleClear]
  );

  return {
    size,
    value,
    shouldShowClearButton,
    slots,
    getWrapperProps,
    getInputProps,
    getSearchIconProps,
    getClearButtonProps,
  };
};
