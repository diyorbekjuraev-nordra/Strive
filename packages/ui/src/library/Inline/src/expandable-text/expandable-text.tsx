import { FC, useState, useRef, useEffect, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Props for ExpandableText component.
 */
type ExpandableTextProps = {
  /** Content to display (typically text but can include inline nodes). */
  children: ReactNode;
  /** Custom class names for the wrapper. */
  className?: string;
  /** Maximum number of lines before truncation occurs. Default: 1 */
  maxLines?: number;

  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

/**
 * ExpandableText
 *
 * Displays text truncated to a given number of lines. If the content exceeds
 * the limit, a "Show all / Show less" toggle appears.
 *
 * Features:
 * - Automatically detects truncation
 * - Expands/collapses content on toggle
 * - Responsive (rechecks on resize)
 */
const ExpandableText: FC<ExpandableTextProps> = ({
  children,
  maxLines = 1,
  className,
  size = "md",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const hiddenContentRef = useRef<HTMLDivElement>(null);

  /**
   * Check if the content overflows the defined maxLines.
   * Runs initially and on window resize.
   */
  useEffect(() => {
    const checkTruncation = () => {
      if (!hiddenContentRef.current) return;
      const { scrollHeight, clientHeight } = hiddenContentRef.current;
      setIsTruncated(scrollHeight > clientHeight);
    };

    const timeoutId = setTimeout(checkTruncation, 0);
    window.addEventListener("resize", checkTruncation);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkTruncation);
    };
  }, [children, maxLines]);

  /** Toggle between expanded and collapsed states. */
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <div className={cn("group relative w-full min-h-6 max-w-full", className)}>
      {/* Hidden element used only for measuring truncation */}
      <HiddenMeasurementBlock ref={hiddenContentRef} maxLines={maxLines}>
        {children}
      </HiddenMeasurementBlock>

      <DisplayContent
        isExpanded={isExpanded}
        isTruncated={isTruncated}
        maxLines={maxLines}
        onToggle={toggleExpand}
        size={size}
      >
        {children}
      </DisplayContent>
    </div>
  );
};

/**
 * Hidden block for detecting text truncation.
 * Uses the same line-clamp and layout styles as the collapsed state.
 */
const HiddenMeasurementBlock = forwardRef<
  HTMLDivElement,
  { children: ReactNode; maxLines: number }
>(({ children, maxLines }, ref) => (
  <div
    ref={ref}
    className={cn(
      "break-all whitespace-pre-line absolute opacity-0 pointer-events-none",
      "w-full px-3 py-1 line-clamp-3"
    )}
    style={{
      WebkitLineClamp: maxLines,
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    }}
  >
    {children}
  </div>
));
HiddenMeasurementBlock.displayName = "HiddenMeasurementBlock";

const sizeVariants: Record<"xs" | "sm" | "md" | "lg" | "xl", string> = {
  xs: "min-h-2 text-xs px-1.5 leading-4",
  sm: "min-h-4 text-sm px-1.5 leading-5",
  md: "min-h-6 text-base px-1.5 leading-6",
  lg: "min-h-8 text-base px-1.5 leading-8",
  xl: "min-h-8.5 text-lg px-1.5 leading-8",
};
/**
 * Renders the visible text content with expand/collapse toggle.
 */
const DisplayContent: FC<{
  children: ReactNode;
  isExpanded: boolean;
  isTruncated: boolean;
  maxLines: number;
  onToggle: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}> = ({
  children,
  isExpanded,
  isTruncated,
  maxLines,
  onToggle,
  size = "md",
}) => {
  return (
    <div
      className={cn(
        "break-all whitespace-pre-line w-full cursor-pointer rounded-sm min-h-8 px-3 relative group hover:bg-[var(--background-hover)]",
        sizeVariants[size],
        !isExpanded && "line-clamp-3 leading-7 pt-0.5",
        isExpanded && "py-1.5"
      )}
      style={{
        WebkitLineClamp: !isExpanded ? maxLines : "unset",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {children}

      {/* Fading overlay (when truncated and collapsed) */}
      {isTruncated && !isExpanded && <FadeOverlay />}

      {/* Toggle button */}
      {isTruncated && (
        <ToggleButton isExpanded={isExpanded} onToggle={onToggle} />
      )}
    </div>
  );
};

/** Fading gradient overlay when text is truncated. */
const FadeOverlay = () => (
  <span
    className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none"
    style={{
      background:
        "linear-gradient(90deg, transparent 0%, var(--background) 70%)",
    }}
  />
);

/** Expand/Collapse toggle button. */
const ToggleButton: FC<{ isExpanded: boolean; onToggle: () => void }> = ({
  isExpanded,
  onToggle,
}) => (
  <div
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    className={cn(
      "hidden group-hover:flex absolute right-0 top-0 items-center justify-center text-xs px-2 text-muted-foreground bg-[var(--layer-01)]",
      {
        "h-full": !isExpanded,
        "h-fit p-2": isExpanded,
      }
    )}
  >
    {isExpanded ? "Show less" : "Show all"}
  </div>
);

export { ExpandableText, type ExpandableTextProps };
