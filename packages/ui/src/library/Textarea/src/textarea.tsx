
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/library/Skeleton";

export interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  ref?: React.RefObject<HTMLTextAreaElement>;
  /**
   * Custom class names for different parts of the component.
   * Useful for styling without overriding the core component logic.
   */
  classNames?: {
    /** Class name applied to the textarea wrapper element. */
    wrapper?: string;
    /** Class name applied directly to the <textarea> element. */
    input?: string;
    /** Class name applied to the error message text. */
    errorMessage?: string;
  };

  /**
   * Marks the textarea as invalid.
   * Used to apply error styles and aria attributes for accessibility.
   */
  isInvalid?: boolean;

  /**
   * Error message text displayed when `isInvalid` is true.
   */
  errorMessage?: string;

  /**
   * Label text displayed above or beside the textarea.
   */
  label?: string;

  /**
   * Helper text providing additional context or instructions for the user.
   */
  helperText?: string;

  /**
   * Additional class name applied to the root element for extra styling.
   */
  className?: string;

  /**
   * Maximum number of characters allowed in the textarea.
   */
  maxLength?: number;

  /**
   * Minimum number of characters required in the textarea.
   */
  minLength?: number;
}

function TextareaBase({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input  placeholder:text-muted-foreground focus-visible:border-[var(--border-interactive)] focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[0px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}


export const Textarea = ({
  classNames,
  isInvalid,
  errorMessage,
  label,
  helperText,
  id,
  disabled,
  className,
  maxLength = 128,
  minLength = 0,
  ...props
}: TextAreaProps) => {
  // Generate an id if not provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className={cn("w-full space-y-1.5 text-start", classNames?.wrapper)}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium block ml-0.5",
            disabled && "text-muted-foreground opacity-70",
            isInvalid && "text-[var(--support-error)]"
          )}
        >
          {label}
        </label>
      )}

      <TextareaBase
        {...props}
        id={inputId}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        className={cn(
          isInvalid &&
            "border-[var(--support-error)] focus-visible:ring-[var(--support-error)]",
          disabled && "opacity-70",
          classNames?.input,
          className
        )}
        aria-invalid={isInvalid}
        aria-describedby={
          isInvalid && errorMessage
            ? errorId
            : helperText
            ? helperId
            : undefined
        }
      />

      {helperText && (
        <p
          id={helperId}
          className={cn(
            "text-xs text-muted-foreground ml-0.5",
            disabled && "opacity-70"
          )}
        >
          {helperText}
        </p>
      )}

      {isInvalid && errorMessage && (
        <div className={cn("min-h-6 relative")}>
          <AnimatePresence mode="wait">
            {isInvalid && errorMessage ? (
              <motion.p
                id={errorId}
                key="error"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={cn(
                  "text-[var(--support-error)] text-sm text-start",
                  classNames?.errorMessage
                )}
              >
                {errorMessage}
              </motion.p>
            ) : helperText ? (
              <motion.p
                id={helperId}
                key="helper"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="text-muted-foreground text-sm"
              >
                {helperText}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export interface TextareaSkeletonProps {
  className?: string;
  label?: string;
  hideLabel?: boolean;
}

export const TextareaSkeleton = ({
  className,
  label,
  hideLabel,
}: TextareaSkeletonProps) => {
  return (
    <div className={cn("w-full space-y-1.5 text-start", className)}>
      {!hideLabel && (
        <label htmlFor="message" className="text-sm font-medium block ml-0.5">
          {label}
        </label>
      )}
      <Skeleton className="min-h-16 w-full" />
    </div>
  );
};

Textarea.displayName = "TextArea";
