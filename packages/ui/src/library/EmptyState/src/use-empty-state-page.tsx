"use client";

import { CirclePlus } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useMatchMedia } from "@/lib/hooks/useMatchMedia";
import { EmptyStateSVG } from "@/lib/shared/icons/empty-state";
import { Button } from "@/library/Button";

// Hook types
export type EmptyStatePageSize = "sm" | "md" | "lg";

export type EmptyStatePageSlots =
  | "wrapper"
  | "content"
  | "iconContainer"
  | "textContainer"
  | "title"
  | "description"
  | "addButton"
  | "instructionSection"
  | "instructionCard"
  | "instructionIconContainer"
  | "instructionText";

export type SlotsToClasses<T extends string> = Partial<Record<T, string>>;

export type PropGetter<T = Record<string, any>> = (props?: T) => T;

export type UseEmptyStatePageProps = {
  /**
   * The main title text for the empty state page.
   */
  title: string;

  /**
   * Descriptive text that provides more context about the empty state.
   */
  description: string;

  /**
   * Custom icon to display instead of the default EmptyStateSVG.
   */
  icon?: React.ReactNode;

  /**
   * Props to pass to the add button component.
   */
  addButtonProps?: React.ComponentProps<typeof Button>;

  /**
   * Text to display on the add button.
   */
  addButtonLabel?: string;

  /**
   * Custom icon to display in the add button.
   * @default CirclePlus icon
   */
  addButtonIcon?: React.ReactNode;

  /**
   * Whether the add button should be disabled.
   * @default false
   */
  disableAddButton?: boolean;

  /**
   * Whether to hide the add button completely.
   * @default false
   */
  hideAddButton?: boolean;

  /**
   * Text to use in the instruction section.
   * Used to generate default instruction label if customInstructionLabel is not provided.
   */
  instruction?: string;

  /**
   * URL to open when the instruction card is clicked.
   * @default "#"
   */
  instructionLink?: string;

  /**
   * Custom label for the instruction card.
   * If not provided, will use "Understanding {instruction}".
   */
  customInstructionLabel?: string;

  /**
   * Whether to hide the instruction section completely.
   * @default false
   */
  hideInstruction?: boolean;

  /**
   * Breakpoint for responsive design (in pixels).
   * @default 1380
   */
  responsiveBreakpoint?: number;

  /**
   * Object containing className overrides for different slots.
   *
   * @example
   * ```tsx
   * classNames={{
   *   wrapper: "my-wrapper-class",
   *   title: "my-title-class",
   *   addButton: "my-button-class",
   *   instructionCard: "my-instruction-class"
   * }}
   * ```
   */
  classNames?: SlotsToClasses<EmptyStatePageSlots>;

  /**
   * Additional CSS class for the main wrapper element.
   */
  className?: string;

  /**
   * Callback function called when the instruction card is clicked.
   * If not provided, will open instructionLink in a new tab.
   */
  onInstructionClick?: () => void;
};

// Size and responsive configurations
const EMPTY_STATE_PAGE_CONFIGS = {
  responsive: {
    large: {
      title: "text-[20px] font-semibold",
      description: "text-[14px]",
      iconSize: "md" as const,
      instructionCard: "h-[72px]",
      instructionIcon: "size-[56px]",
      instructionText: "text-[14px]",
    },
    small: {
      title: "text-[16px] font-semibold",
      description: "text-[12px]",
      iconSize: "sm" as const,
      instructionCard: "h-[60px]",
      instructionIcon: "size-[40px]",
      instructionText: "text-[12px]",
    },
  },
  base: {
    wrapper: "flex flex-1 items-center flex-col justify-center w-full h-full",
    content: "flex flex-1 flex-col items-center justify-center w-full",
    iconContainer: "flex w-fit items-center h-fit justify-center",
    textContainer: "flex flex-col items-center gap-2 w-[500px]",
    titleBase: "text-[var(--text-primary)] mb-1",
    descriptionBase: "text-[var(--text-secondary)] mb-4 text-center",
    addButton: "mb-24",
    instructionSection: "pb-20 cursor-pointer",
    instructionCard: "flex gap-3",
    instructionCardInner:
      "flex items-center gap-2 w-[307px] cursor-pointer border rounded-2xl dark:hover:bg-muted/50 hover:bg-gray-50 transition-colors px-[8px] py-[4px] 2xl:px-[8px] 2xl:py-[8px]",
    instructionIconContainer:
      "flex-shrink-0 rounded-[13px] border flex items-center justify-center overflow-hidden",
    instructionTextContainer: "text-sm ml-2",
    instructionTextBase: "font-medium text-[var(--text-primary)]",
    learnMoreText: "text-xs text-[var(--text-secondary)] mb-2",
  },
} as const;

export const useEmptyStatePage = (props: UseEmptyStatePageProps) => {
  const {
    title,
    description,
    icon,
    addButtonProps,
    addButtonLabel,
    addButtonIcon,
    disableAddButton = false,
    hideAddButton = false,
    instruction,
    instructionLink = "#",
    customInstructionLabel,
    hideInstruction = false,
    responsiveBreakpoint = 1380,
    classNames,
    className,
    onInstructionClick,
  } = props;

  // Responsive detection
  const isLargeScreen = useMatchMedia(responsiveBreakpoint);
  const config = isLargeScreen
    ? EMPTY_STATE_PAGE_CONFIGS.responsive.large
    : EMPTY_STATE_PAGE_CONFIGS.responsive.small;

  // Memoized elements
  const iconElement = useMemo(
    () => icon ?? <EmptyStateSVG size={config.iconSize} />,
    [icon, config.iconSize]
  );

  const buttonIconElement = useMemo(
    () => addButtonIcon ?? <CirclePlus />,
    [addButtonIcon]
  );

  const instructionLabel = useMemo(
    () =>
      customInstructionLabel ??
      (instruction ? `Understanding ${instruction}` : ""),
    [customInstructionLabel, instruction]
  );

  // Handlers
  const handleInstructionClick = useCallback(() => {
    if (onInstructionClick) {
      onInstructionClick();
    } else {
      window.open(instructionLink, "_blank", "noopener,noreferrer");
    }
  }, [onInstructionClick, instructionLink]);

  // Determine visibility
  const shouldShowAddButton = !hideAddButton && addButtonLabel;
  const shouldShowInstruction =
    !hideInstruction && (instruction || customInstructionLabel);

  // Generate slot classes
  const slots = useMemo(() => {
    const base = EMPTY_STATE_PAGE_CONFIGS.base;

    return {
      wrapper: [base.wrapper, className, classNames?.wrapper]
        .filter(Boolean)
        .join(" "),

      content: [base.content, classNames?.content].filter(Boolean).join(" "),

      iconContainer: [base.iconContainer, classNames?.iconContainer]
        .filter(Boolean)
        .join(" "),

      textContainer: [base.textContainer, classNames?.textContainer]
        .filter(Boolean)
        .join(" "),

      title: [base.titleBase, config.title, classNames?.title]
        .filter(Boolean)
        .join(" "),

      description: [
        base.descriptionBase,
        config.description,
        classNames?.description,
      ]
        .filter(Boolean)
        .join(" "),

      addButton: [base.addButton, classNames?.addButton]
        .filter(Boolean)
        .join(" "),

      instructionSection: [
        base.instructionSection,
        classNames?.instructionSection,
      ]
        .filter(Boolean)
        .join(" "),

      instructionCard: [base.instructionCard, classNames?.instructionCard]
        .filter(Boolean)
        .join(" "),

      instructionCardInner: [
        base.instructionCardInner,
        config.instructionCard,
        classNames?.instructionCard,
      ]
        .filter(Boolean)
        .join(" "),

      instructionIconContainer: [
        base.instructionIconContainer,
        config.instructionIcon,
        classNames?.instructionIconContainer,
      ]
        .filter(Boolean)
        .join(" "),

      instructionText: [
        base.instructionTextBase,
        config.instructionText,
        classNames?.instructionText,
      ]
        .filter(Boolean)
        .join(" "),

      instructionTextContainer: [base.instructionTextContainer]
        .filter(Boolean)
        .join(" "),

      learnMoreText: [base.learnMoreText].filter(Boolean).join(" "),
    };
  }, [config, className, classNames]);

  // Prop getters
  const getWrapperProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "wrapper",
      "data-responsive": isLargeScreen ? "large" : "small",
      "data-has-add-button": shouldShowAddButton,
      "data-has-instruction": shouldShowInstruction,
      className: slots.wrapper,
      ...props,
    }),
    [slots.wrapper, isLargeScreen, shouldShowAddButton, shouldShowInstruction]
  );

  const getContentProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "content",
      className: slots.content,
      ...props,
    }),
    [slots.content]
  );

  const getIconContainerProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "icon-container",
      className: slots.iconContainer,
      ...props,
    }),
    [slots.iconContainer]
  );

  const getTextContainerProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "text-container",
      className: slots.textContainer,
      ...props,
    }),
    [slots.textContainer]
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

  const getAddButtonProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "add-button",
      size: "md" as const,
      disabled: disableAddButton,
      className: slots.addButton,
      ...addButtonProps,
      ...props,
    }),
    [slots.addButton, disableAddButton, addButtonProps]
  );

  const getInstructionSectionProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "instruction-section",
      onClick: handleInstructionClick,
      className: slots.instructionSection,
      ...props,
    }),
    [slots.instructionSection, handleInstructionClick]
  );

  const getInstructionCardProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "instruction-card",
      className: slots.instructionCard,
      ...props,
    }),
    [slots.instructionCard]
  );

  const getInstructionCardInnerProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "instruction-card-inner",
      className: slots.instructionCardInner,
      ...props,
    }),
    [slots.instructionCardInner]
  );

  const getInstructionIconContainerProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "instruction-icon-container",
      className: slots.instructionIconContainer,
      ...props,
    }),
    [slots.instructionIconContainer]
  );

  const getInstructionTextProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "instruction-text",
      className: slots.instructionText,
      ...props,
    }),
    [slots.instructionText]
  );

  return {
    title,
    description,
    addButtonLabel,
    instructionLabel,
    isLargeScreen,
    iconElement,
    buttonIconElement,
    shouldShowAddButton,
    shouldShowInstruction,
    slots,
    getWrapperProps,
    getContentProps,
    getIconContainerProps,
    getTextContainerProps,
    getTitleProps,
    getDescriptionProps,
    getAddButtonProps,
    getInstructionSectionProps,
    getInstructionCardProps,
    getInstructionCardInnerProps,
    getInstructionIconContainerProps,
    getInstructionTextProps,
  };
};
