"use client"
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { Bell, Loader } from "lucide-react";
import { TooltipWrapper } from "@/library/Tooltip";
import { useButton, type UseButtonProps } from "./use-button";

export type ButtonProps = UseButtonProps & {
  /**
   * Button content, usually text and/or child elements.
   */
  children?: React.ReactNode;
};

export function Button({
  children,
  iconDescription = "Icon description here",
  tooltipAlignment,
  tooltipPosition,
  prepend,
  append,
  asChild = false,
  ...props
}: ButtonProps) {
  const {
    Component,
    isLoading,
    withBadge,
    hasIconOnly,
    badgeCount,
    getBaseProps,
    getContentProps,
  } = useButton(props);

  // Use Slot if asChild is true, otherwise use the Component from hook
  const Comp = asChild ? Slot : Component;

  const renderContent = () => {
    if (withBadge) {
      return (
        <>
          <Bell />
          <div className="size-4.5 absolute -top-1 -right-1 rounded-full bg-[var(--interactive)] text-white text-xs flex items-center justify-center">
            {badgeCount}
          </div>
        </>
      );
    }

    return (
      <>
        {!isLoading && prepend}
        <span {...getContentProps()}>
          {isLoading ? props.loadingContent ?? "Loading..." : children}
        </span>
        {!isLoading && append}
        {isLoading &&
          (props.loadingIndicator ?? <Loader className="animate-spin" />)}
      </>
    );
  };

  const buttonElement = <Comp {...getBaseProps()}>{renderContent()}</Comp>;

  // Wrap with tooltip if it's an icon-only button or has a badge
  return hasIconOnly || withBadge ? (
    <TooltipWrapper
      content={iconDescription}
      side={tooltipPosition}
      alignment={tooltipAlignment}
    >
      {buttonElement}
    </TooltipWrapper>
  ) : (
    buttonElement
  );
}
