import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { type ComponentPropsWithoutRef, forwardRef, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { TooltipWrapper } from "@/library/Tooltip";
import { Button } from "@/library/Button";
import { Skeleton } from "@/library/Skeleton";

export interface InputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  /**
   * Controls the visual size of the input.
   * - `sm`: Small
   * - `md`: Medium
   * - `lg`: Large
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Allows custom Tailwind/utility class overrides
   * for specific sub-elements of the component.
   */
  classNames?: {
    /** Custom class for the input wrapper container */
    wrapper?: string;
    /** Custom class for the input element */
    input?: string;
    /** Custom class for the error message text */
    errorMessage?: string;
    /** Custom class for the helper text */
    helperText?: string;
  };

  /**
   * Marks the input as invalid (for styling and accessibility).
   * Should be used with `aria-invalid` for WCAG compliance.
   */
  isInvalid?: boolean;

  /**
   * The error message to display when the input is invalid.
   * Will also be linked to the input via `aria-describedby` for screen readers.
   */
  errorMessage?: string;

  /**
   * The text label describing the input.
   * If not visually rendered, it should still be passed for accessibility.
   */
  label?: string;

  /**
   * Additional helper text shown below the input
   * to guide the user. Should be concise and clear.
   */
  helperText?: string;

  /**
   * Makes the input read-only, preventing user edits
   * while still allowing text selection.
   */
  isReadOnly?: boolean;

  /**
   * Additional classes applied directly to the root container.
   */
  className?: string;

  /**
   * Maximum number of characters allowed in the input.
   * Enforced both visually and for screen readers.
   */
  maxLength?: number;

  /**
   * Minimum number of characters required in the input.
   */
  minLength?: number;
}

export function InputBase({
  className,
  size,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground  border flex h-9 w-full min-w-0 rounded-[9px] border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-[var(--interactive)] transition-all focus-visible:ring-ring/50 focus-visible:ring-[0px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      classNames,
      isInvalid,
      errorMessage,
      label,
      helperText,
      id,
      disabled,
      type,
      isReadOnly,
      size = "md",
      className,
      maxLength = 128,
      minLength = 0,
      ...props
    },
    ref
  ) => {
    const [show, setShow] = useState<boolean>(false);
    // Generate an id if not provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div
        className={cn(
          "w-full space-y-1.5 relative text-start",
          classNames?.wrapper
        )}
      >
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

        <InputBase
          {...props}
          type={type === "password" && show ? "text" : type}
          ref={ref}
          id={inputId}
          maxLength={maxLength}
          minLength={minLength}
          disabled={disabled}
          readOnly={isReadOnly}
          className={cn(
            isInvalid &&
              "border-[var(--support-error)] focus-visible:ring-[var(--support-error)]",
            isReadOnly &&
              "opacity-70 cursor-not-allowed shadow-none border focus-visible:border-border",
            disabled && "opacity-70",
            size === "xs" && "h-6 placeholder:text-xs text-xs",
            size === "sm" && "h-7 placeholder:text-sm text-sm",
            size === "md" && "h-8 placeholder:text-sm text-sm",
            size === "lg" && "h-10 placeholder:text-base text-base",
            size === "xl" && "h-12 placeholder:text-base text-base",
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
        {type === "password" && (
          <TooltipWrapper content={show ? "Hide password" : "Show password"}>
            <Button
              type="button"
              className={cn(
                "absolute size-5 rounded-sm right-2.5 top-11 -translate-y-1/2 text-muted-foreground",
                size === "sm" && "top-10",
                size === "md" && "top-11",
                size === "lg" && "top-11.5",
                size === "xl" && "top-12"
              )}
              variant={"ghost"}
              size="icon"
              onClick={() => setShow(!show)}
            >
              {show ? <Eye /> : <EyeClosed />}
            </Button>
          </TooltipWrapper>
        )}

        {helperText && (
          <p
            id={helperId}
            className={cn(
              "text-xs text-muted-foreground mt-0.5 ml-0.5",
              classNames?.helperText
            )}
          >
            {helperText}
          </p>
        )}

        {isInvalid && errorMessage && (
          <div className={cn("min-h-6 relative")}>
            <AnimatePresence mode="wait">
              {isInvalid && errorMessage && (
                <motion.p
                  id={errorId}
                  key="error"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={cn(
                    "text-[var(--support-error)] text-xs text-start",
                    classNames?.errorMessage
                  )}
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  }
);

export interface InputSkeletonProps {
  size?: "sm" | "md" | "lg" | "xl";
}
export const InputSkeleton = ({ size = "md" }: InputSkeletonProps) => {
  return (
    <div className="w-full space-y-1.5 relative text-start">
      <Skeleton
        className={cn(
          "h-9 w-full",
          size === "sm" && "h-7",
          size === "md" && "h-9",
          size === "lg" && "h-10"
        )}
      />
    </div>
  );
};

Input.displayName = "Input";
