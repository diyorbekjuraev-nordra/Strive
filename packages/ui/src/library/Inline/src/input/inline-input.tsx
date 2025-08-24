"use client";
import { Input } from "@/library/Input";
import { ClickOutside } from "@/lib/shared/click-outside";
import { cn } from "@/lib/utils";
import { ComponentProps, FC, useEffect, useRef, useState } from "react";

type InlineInputProps = {
  children: React.ReactNode;
  className?: string;
  inputProps?: ComponentProps<typeof Input>;
  onAcceptValue?: (value: string) => void;
  value?: string;
  maxLines?: number;
};

const InlineInput: FC<InlineInputProps> = ({ children, ...props }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props?.value ?? "");

  useEffect(() => {
    if (props?.value) {
      setValue(props.value);
    }
  }, [props?.value]);

  return (
    <ClickOutside
      active={open}
      onClick={() => {
        setOpen(false);
        props?.onAcceptValue?.(value.trim());
      }}
    >
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!open) {
              setOpen(true);
            }
          }
        }}
        aria-expanded={open}
        aria-label="Edit content"
        className={cn(
          "cursor-pointer justify-between focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex  items-center gap-2 rounded-sm  text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-[var(--background-hover)] w-full min-h-6 max-w-full",
          props.className,
          {
            "px-3 py-1": !open,
            "border-none": open,
          }
        )}
        onClick={() => {
          if (!open) {
            setOpen(true);
          }
        }}
      >
        {open ? (
          <Input
            {...(props.inputProps ?? {})}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={cn(
              "w-full outline-none h-full",
              props.inputProps?.className
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props?.onAcceptValue?.(value.trim());
                setOpen(false);
              }
            }}
            autoFocus
          />
        ) : (
          <span className="truncate">{children}</span>
        )}
      </div>
    </ClickOutside>
  );
};

const ExpandableInlineInput: FC<InlineInputProps> = ({
  children,
  maxLines = 1,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [value, setValue] = useState(props?.value ?? "");
  const contentRef = useRef<HTMLDivElement>(null);
  const hiddenContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props?.value) {
      setValue(props.value);
    }
  }, [props?.value, open]);

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
  }, [value, children, open]); // Only depend on content that affects truncation

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
        // onClick={() => {
        // 	if (!open) {
        // 		setOpen(true);
        // 	}
        // }}
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
          <Input
            {...(props.inputProps ?? {})}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={cn(
              "w-full outline-none h-full break-all",
              props.inputProps?.className
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props?.onAcceptValue?.(value.trim());
                setOpen(false);
              }
            }}
            autoFocus
          />
        ) : (
          <div
            ref={contentRef}
            className={cn(
              "break-all whitespace-pre-line w-full cursor-pointer hover:bg-[var(--background-hover)]  rounded-sm min-h-8 px-3 relative group",
              !isExpanded && "line-clamp-3 leading-7 pt-0.5",
              isExpanded && "py-1.5"
            )}
            onClick={() => setOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!open) {
                  setOpen(true);
                }
              }
            }}
            aria-expanded={open}
            aria-label="Edit content"
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
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleExpand();
                  }
                }}
                aria-expanded={isExpanded}
                aria-label="Toggle expanded view"
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

export { ExpandableInlineInput, InlineInput, type InlineInputProps };
