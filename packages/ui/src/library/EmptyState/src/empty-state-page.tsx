"use client";
import {
  useEmptyStatePage,
  UseEmptyStatePageProps,
} from "./use-empty-state-page";
import { FC, memo } from "react";
import { Button } from "@/library/Button";
import { InstructionIcon } from "@/lib/shared/icons/instruction";

export type EmptyStatePageProps = UseEmptyStatePageProps;

export const EmptyStatePage: FC<EmptyStatePageProps> = memo((props) => {
  const {
    title,
    description,
    addButtonLabel,
    instructionLabel,
    iconElement,
    buttonIconElement,
    shouldShowAddButton,
    shouldShowInstruction,
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
  } = useEmptyStatePage(props);

  return (
    <div {...getWrapperProps()}>
      <div {...getContentProps()}>
        <div {...getTextContainerProps()}>
          <div {...getIconContainerProps()}>{iconElement}</div>
          <div className="flex flex-col items-center justify-center">
            <h2 {...getTitleProps()}>{title}</h2>
            <p {...getDescriptionProps()}>{description}</p>
          </div>
        </div>
        {shouldShowAddButton && (
          <Button {...getAddButtonProps()} prepend={buttonIconElement}>
            <span className="font-medium">{addButtonLabel}</span>
          </Button>
        )}
      </div>

      {shouldShowInstruction && (
        <div {...getInstructionSectionProps()}>
          <div className="relative flex flex-col">
            <div className="text-xs text-[var(--text-secondary)] mb-2">
              Learn more
            </div>
            <div {...getInstructionCardProps()}>
              <div {...getInstructionCardInnerProps()}>
                <div {...getInstructionIconContainerProps()}>
                  <InstructionIcon />
                </div>
                <div className="text-sm ml-2">
                  <p {...getInstructionTextProps()}>{instructionLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
