import { useState, useEffect } from "react";
import { InlineTextAreaProps } from "../text-area/inline-textarea";
import { FC, useRef } from "react";
import { ClickOutside } from "@/lib/shared/click-outside";
import { cn } from "@/lib/utils";
import { Textarea } from "@/library/Textarea";

export const ExpandableInlineTextarea: FC<InlineTextAreaProps> = ({
  children,
  maxLines = 1,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [value, setValue] = useState(props?.value ?? "");
  const contentRef = useRef<HTMLDivElement>(null);
  const hiddenContentRef = useRef<HTMLDivElement>(null); // New ref for hidden measurement

  // Update value when props change
  useEffect(() => {
    if (props?.value !== undefined) {
      setValue(props.value.trim());
    }
  }, [props?.value]);

  // Check truncation in a hidden element that's always collapsed
  useEffect(() => {
    const checkTruncation = () => {
      if (hiddenContentRef.current) {
        const { scrollHeight, clientHeight } = hiddenContentRef.current;
        setIsTruncated(scrollHeight > clientHeight);
      }
    };

    const timeoutId = setTimeout(checkTruncation, 0);
    window.addEventListener("resize", checkTruncation);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkTruncation);
    };
  }, [value, children]); // Only depend on content that affects truncation

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ClickOutside
      active={open}
      onClick={() => {
        setOpen(false);
        props?.onAcceptValue?.(value.trim());
      }}
    >
      <div
        className={cn(
          "group relative w-full min-h-6 max-w-full",
          props.className
        )}
      >
        {/* Hidden element for measuring truncation */}
        <div
          ref={hiddenContentRef}
          className={cn(
            "break-all whitespace-pre-line absolute opacity-0 pointer-events-none",
            "w-full px-3 py-1",
            "line-clamp-3" // Match your collapsed state styling
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

        {open ? (
          <Textarea
            {...(props.textareaProps ?? {})}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={cn(
              "w-full outline-none h-full px-3 py-1 max-w-full break-all",
              props.textareaProps?.className
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const newValue = e.currentTarget.value;
                setValue(newValue);
                props?.onAcceptValue?.(newValue.trim());
                setOpen(false);
              }
            }}
            autoFocus
          />
        ) : (
          <div
            ref={contentRef}
            className={cn(
              "break-all whitespace-pre-line w-full cursor-pointer hover:bg-[var(--background-hover)] rounded-sm min-h-8 px-3 relative group",
              !isExpanded && "line-clamp-3 leading-7 pt-0.5",
              isExpanded && "py-1.5"
            )}
            onClick={() => setOpen(true)}
            style={{
              WebkitLineClamp: !isExpanded ? maxLines : "unset",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {children}
            {isTruncated && !isExpanded && (
              <span
                className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, var(--background) 70%)",
                }}
              />
            )}
            {isTruncated && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand();
                }}
                
                className={cn(
                  "hidden group-hover:flex absolute right-0 top-0 items-center justify-center text-muted-foreground bg-[var(--layer-01)] text-xs px-2",
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
        )}
      </div>
    </ClickOutside>
  );
};
