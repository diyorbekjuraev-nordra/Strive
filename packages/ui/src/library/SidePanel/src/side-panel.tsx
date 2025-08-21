"use client";
import { Button } from "@/library/Button";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef } from "react";

// Panel variants using cva for more customization options
const panelVariants = cva(
  "absolute top-0 h-full bg-sidebar z-50 shadow-lg transition-all overflow-hidden",
  {
    variants: {
      position: {
        left: "left-10",
        right: "right-0",
        top: "top-0 left-0 right-0 h-auto w-full",
        bottom: "bottom-0 left-0 right-0 h-auto w-full",
      },
      size: {
        xs: "w-64",
        sm: "w-80",
        md: "w-96",
        lg: "w-1/3",
        xl: "w-1/2",
        full: "w-full",
      },
      fullHeight: {
        true: "h-full",
        false: "",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-xl",
      },
    },
    defaultVariants: {
      position: "right",
      size: "sm",
      fullHeight: true,
      rounded: "none",
    },
  }
);

// Animation duration classes
const DURATION_CLASSES = {
  fast: "duration-150",
  normal: "duration-300",
  slow: "duration-500",
} as const;

// Transform styles based on position - memoized constant
const TRANSFORM_STYLES = {
  left: {
    open: "-translate-x-10",
    closed: "-translate-x-[120%]",
  },
  right: {
    open: "translate-x-0",
    closed: "translate-x-[120%]",
  },
  top: {
    open: "translate-y-0",
    closed: "-translate-y-full",
  },
  bottom: {
    open: "translate-y-0",
    closed: "translate-y-full",
  },
} as const;

// Close button position classes
const CLOSE_BUTTON_POSITIONS = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
} as const;

// Padding classes for reusable components
const PADDING_CLASSES = {
  none: "p-0",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
} as const;

interface SidePanelProps {
  readonly isOpen?: boolean;
  readonly onClose?: () => void;
  readonly children: React.ReactNode;
  readonly position?: "left" | "right" | "top" | "bottom";
  readonly size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  readonly className?: string;
  readonly closeButtonPosition?: "top-left" | "top-right";
  readonly showCloseButton?: boolean;
  readonly closeOnEsc?: boolean;
  readonly closeOnOutsideClick?: boolean;
  readonly withOverlay?: boolean;
  readonly overlayClassName?: string;
  readonly contentClassName?: string;
  readonly fullHeight?: boolean;
  readonly rounded?: "none" | "sm" | "md" | "lg";
  readonly duration?: "fast" | "normal" | "slow";
  readonly closeIcon?: React.ReactNode;
  readonly preventScroll?: boolean;
  readonly style?: React.CSSProperties;
}

const SidePanel = React.memo<SidePanelProps>(
  ({
    isOpen = false,
    onClose,
    children,
    position = "right",
    size = "sm",
    className,
    closeButtonPosition = "top-right",
    showCloseButton = true,
    closeOnEsc = true,
    closeOnOutsideClick = true,
    withOverlay = true,
    overlayClassName,
    contentClassName,
    fullHeight = true,
    rounded = "none",
    duration = "normal",
    closeIcon,
    preventScroll = true,
    style,
  }) => {
    // Use ref for tracking if component is mounted to avoid state updates on unmounted components
    const isMountedRef = useRef(true);

    // Memoized values to prevent recalculations
    const transformClass = useMemo(
      () => TRANSFORM_STYLES[position][isOpen ? "open" : "closed"],
      [position, isOpen]
    );

    const durationClass = useMemo(() => DURATION_CLASSES[duration], [duration]);

    const closeButtonPositionClass = useMemo(
      () => CLOSE_BUTTON_POSITIONS[closeButtonPosition],
      [closeButtonPosition]
    );

    const panelClasses = useMemo(
      () =>
        cn(
          panelVariants({ position, size, fullHeight, rounded }),
          transformClass,
          durationClass,
          "ease-in-out",
          className
        ),
      [
        position,
        size,
        fullHeight,
        rounded,
        transformClass,
        durationClass,
        className,
      ]
    );

    const overlayClasses = useMemo(
      () =>
        cn(
          "fixed inset-0 bg-black/40 z-50 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          durationClass,
          overlayClassName
        ),
      [isOpen, durationClass, overlayClassName]
    );

    // Memoized handlers to prevent unnecessary re-renders
    const handleEscKey = useCallback(
      (event: KeyboardEvent) => {
        if (
          closeOnEsc &&
          isOpen &&
          event.key === "Escape" &&
          isMountedRef.current
        ) {
          onClose?.();
        }
      },
      [closeOnEsc, isOpen, onClose]
    );

    const handleOverlayClick = useCallback(
      (e: React.MouseEvent) => {
        if (closeOnOutsideClick && e.target === e.currentTarget) {
          onClose?.();
        }
      },
      [closeOnOutsideClick, onClose]
    );

    const handleCloseClick = useCallback(() => {
      onClose?.();
    }, [onClose]);

    // Handle ESC key press and body scroll prevention
    useEffect(() => {
      // Prevent body scroll when panel is open
      if (preventScroll && isOpen) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // Return cleanup function to restore original overflow
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [preventScroll, isOpen]);

    useEffect(() => {
      if (closeOnEsc) {
        document.addEventListener("keydown", handleEscKey);
        return () => {
          document.removeEventListener("keydown", handleEscKey);
        };
      }
    }, [closeOnEsc, handleEscKey]);

    // Cleanup ref on unmount
    useEffect(() => {
      return () => {
        isMountedRef.current = false;
      };
    }, []);

    return (
      <>
        {/* Overlay */}
        {withOverlay && isOpen && (
          <div
            className={overlayClasses}
            role="button"
            tabIndex={-1}
            onClick={handleOverlayClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleOverlayClick(e as any);
              }
            }}
            aria-label="Close panel overlay"
          />
        )}

        {/* Panel */}
        <div
          className={panelClasses}
          style={style}
          role="dialog"
          aria-modal={isOpen}
          aria-hidden={!isOpen}
        >
          {/* Close Button */}
          {showCloseButton && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute size-8 rounded-md z-10",
                closeButtonPositionClass
              )}
              onClick={handleCloseClick}
              aria-label="Close panel"
            >
              {closeIcon || <X className="h-4 w-4" />}
            </Button>
          )}

          {/* Panel Content */}
          <div className={cn("h-full flex flex-col", contentClassName)}>
            {children}
          </div>
        </div>
      </>
    );
  }
);

SidePanel.displayName = "SidePanel";

// Optimized PanelHeader Component
interface PanelHeaderProps {
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
  noBorder?: boolean;
  padding?: keyof typeof PADDING_CLASSES;
}

const PanelHeader = React.memo<PanelHeaderProps>(
  ({
    children,
    className,
    sticky = false,
    noBorder = false,
    padding = "md",
  }) => {
    const headerClasses = useMemo(
      () =>
        cn(
          PADDING_CLASSES[padding],
          !noBorder && "border-b border-border",
          sticky &&
            "sticky top-0 dark:bg-[var(--layer-01)] bg-[var(--layer-02)] z-10",
          className
        ),
      [padding, noBorder, sticky, className]
    );

    return <div className={headerClasses}>{children}</div>;
  }
);

PanelHeader.displayName = "PanelHeader";

// Optimized PanelBody Component
interface PanelBodyProps {
  children: React.ReactNode;
  className?: string;
  padding?: keyof typeof PADDING_CLASSES;
  scrollable?: boolean;
}

const PanelBody = React.memo<PanelBodyProps>(
  ({ children, className, padding = "md", scrollable = true }) => {
    const bodyClasses = useMemo(
      () =>
        cn(
          PADDING_CLASSES[padding],
          "flex-1",
          scrollable && "overflow-y-auto",
          className
        ),
      [padding, scrollable, className]
    );

    return <div className={bodyClasses}>{children}</div>;
  }
);

PanelBody.displayName = "PanelBody";

// Optimized PanelFooter Component
interface PanelFooterProps {
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
  noBorder?: boolean;
  padding?: keyof typeof PADDING_CLASSES;
}

const PanelFooter = React.memo<PanelFooterProps>(
  ({
    children,
    className,
    sticky = false,
    noBorder = false,
    padding = "md",
  }) => {
    const footerClasses = useMemo(
      () =>
        cn(
          PADDING_CLASSES[padding],
          !noBorder && "border-t border-border",
          sticky && "sticky bottom-0 bg-sidebar z-10",
          className
        ),
      [padding, noBorder, sticky, className]
    );

    return <div className={footerClasses}>{children}</div>;
  }
);

PanelFooter.displayName = "PanelFooter";

// Optimized PanelDivider Component
interface PanelDividerProps {
  className?: string;
}

const PanelDivider = React.memo<PanelDividerProps>(({ className }) => (
  <div className={cn("h-px w-full bg-border my-4", className)} />
));

PanelDivider.displayName = "PanelDivider";


export { SidePanel, PanelHeader, PanelBody, PanelFooter, PanelDivider };