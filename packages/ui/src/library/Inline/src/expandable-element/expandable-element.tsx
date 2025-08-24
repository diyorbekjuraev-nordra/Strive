import * as React from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ExpandableElementProps {
  children: React.ReactNode;
  maxHeight?: number;
  className?: string;
}

const ExpandableElement = ({
  children,
  maxHeight = 25, // Default max height for one line
  className = "",
}: ExpandableElementProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenContentRef = useRef<HTMLDivElement>(null); // New ref for hidden measurement

  useEffect(() => {
    const checkOverflow = () => {
      if (hiddenContentRef.current) {
        const { scrollHeight, clientHeight } = hiddenContentRef.current;
        setIsOverflowing(scrollHeight > clientHeight);
      }
    };

    // Initial check
    checkOverflow();

    // Add resize observer to handle window resizing
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (hiddenContentRef.current) {
      resizeObserver.observe(hiddenContentRef.current);
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [children, hiddenContentRef]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={cn(
        "px-3 py-1 relative group hover:bg-[var(--background-hover)] rounded-sm",
        className
      )}
    >
      {/* Hidden Container */}
      <div
        ref={hiddenContentRef}
        className={cn(
          "overflow-hidden transition-all duration-200 absolute opacity-0 pointer-events-none",
          {
            "max-h-[40px]": true,
          }
        )}
        style={{
          maxHeight: `${maxHeight}px`,
          overflow: "hidden",
        }}
      >
        <div className="flex flex-wrap gap-1">{children}</div>
      </div>

      <div
        ref={containerRef}
        className={cn(
          "overflow-hidden transition-all duration-200 group relative py-0.5",
          {
            "max-h-[40px]": !isExpanded,
          }
        )}
        style={{
          maxHeight: isExpanded ? "none" : `${maxHeight}px`,
        }}
      >
        <div className="flex flex-wrap gap-1">{children}</div>
      </div>
      {isOverflowing && !isExpanded && (
        <span
          className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none rounded-tr-sm rounded-br-sm"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--background) 70%)",
          }}
        />
      )}

      {isOverflowing && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand();
          }}
          className={cn(
            "hidden group-hover:flex absolute right-0 top-0 items-center justify-center text-muted-foreground bg-[var(--layer-01)] text-xs px-2 cursor-pointer rounded-tr-sm rounded-br-sm",
            {
              "h-full": !isExpanded,
              "h-fit p-2": isExpanded,
            }
          )}
        >
          {isExpanded ? "Show less" : "Show all"}
        </div>
      )}
    </div>
  );
};

export { ExpandableElement, type ExpandableElementProps };
