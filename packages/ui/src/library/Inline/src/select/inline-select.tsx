"use client";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverItem,
} from "@/library/Popover";
import { Input } from "@/library/Input";
import { Search, CircleCheck } from "lucide-react";
import { Skeleton } from "@/library/Skeleton";
import { InlineInput } from "@/library/Inline/src/input/inline-input";
import { cn } from "@/lib/utils";
import {
  FixedSizeList as List,
  type ListChildComponentProps,
} from "react-window";
import { useInView } from "react-intersection-observer";

type InlineSelectProps<T> = {
  trigger?: React.ReactNode;
  className?: string;
  inputProps?: React.ComponentProps<typeof Input>;
  options?: T[];
  isLoading?: boolean;
  infiniteScrollEnabled?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  itemRenderer?: (option: T) => React.ReactNode;
  onSelect?: (option: T) => void;
  itemActive?: (option: T) => boolean;
  footerTrigger?: (option: { search: string }) => void;
  renderFooter?: boolean;
  footerRenderer?: (option: { search: string }) => React.ReactNode;
  selection?: "single" | "multiple";
  contentStyle?: React.CSSProperties;
  disabled?: boolean;
  triggerClassName?: string;
  controlledOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  renderFooterInput?: boolean;
  footerInputRenderer?: () => React.ReactNode;
  footerInputProps?: Partial<React.ComponentProps<typeof InlineInput>>;
  footerInputTrigger?: (value: string) => void;
  renderTrigger?: (trigger: React.ReactNode) => React.ReactNode;
  classNames?: {
    trigger?: string;
    input?: string;
    popover?: string;
    popoverContent?: string;
    popoverItem?: string;
  };
  itemSize?: number;
  listHeight?: number;
};

function InlineSelect<T>({
  trigger,
  options = [],
  inputProps,
  isLoading,
  infiniteScrollEnabled,
  isFetchingNextPage,
  fetchNextPage,
  itemRenderer,
  onSelect,
  itemActive,
  renderFooter,
  footerTrigger,
  footerRenderer,
  contentStyle,
  selection = "single",
  disabled,
  triggerClassName,
  renderFooterInput,
  footerInputTrigger,
  footerInputRenderer,
  footerInputProps,
  renderTrigger,
  itemSize = 33,
  listHeight = 256,
}: Readonly<InlineSelectProps<T>>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const onSelectHandler = (option: T) => {
    if (selection === "single") {
      onSelect?.(option);
      setOpen(false);
    } else {
      onSelect?.(option);
    }
  }; 

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          "w-full min-h-8 rounded-sm hover:bg-[var(--background-hover)] px-3 py-1",
          triggerClassName
        )}
        asChild
      >
        {renderTrigger?.(trigger) || trigger}
      </PopoverTrigger>

      <PopoverContent
        onWheel={(e) => e.stopPropagation()}
        className="w-[320px] p-0 rounded-md"
        align="start"
        style={contentStyle} 
      >
        {/* Search Bar */}
        <div className="relative border-b">
          <Search
            size={16}
            strokeWidth={1.5}
            className="absolute left-2 top-2.5 text-zinc-500"
          />
          <Input
            {...inputProps}
            placeholder={inputProps?.placeholder || "Search..."}
            className="outline-none border-none focus-visible:border-none focus-visible:outline-0 focus-visible:ring-[0] shadow-none pl-7"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              inputProps?.onChange?.(e);
            }}
          />
        </div>

        {/* List Content */}
        <div className="flex flex-col gap-1 p-1 max-h-64 overflow-y-auto relative">
          {/* Loading State */}
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <PopoverItem
                key={i}
                className="flex items-center w-full h-full justify-between"
              >
                <Skeleton className="w-full h-5" />
              </PopoverItem>
            ))}

          {/* Virtualized Options */}
          {options.length > 0 && (
            <List
              height={listHeight}
              itemCount={options.length}
              itemSize={itemSize}
              width={"100%"}
              onItemsRendered={({ visibleStopIndex }) => {
                if (
                  infiniteScrollEnabled &&
                  !isFetchingNextPage &&
                  visibleStopIndex >= options.length - 1
                ) {
                  fetchNextPage?.();
                }
              }}
            >
              {({ index, style }: ListChildComponentProps) => {
                const option = options[index];
                return (
                  <div style={style}>
                    <PopoverItem
                      onClick={() => onSelectHandler(option)}
                      className="flex items-center w-full h-full justify-between"
                    >
                      <div className="flex-1 max-w-[85%]">
                        {itemRenderer?.(option)}
                      </div>
                      {itemActive?.(option) && (
                        <CircleCheck
                          className="text-[var(--interactive)]"
                          style={{ width: 14, height: 14 }}
                          strokeWidth={1.5}
                        />
                      )}
                    </PopoverItem>
                  </div>
                );
              }}
            </List>
          )}

          {/* Infinite Scroll Loading */}
          {infiniteScrollEnabled && isFetchingNextPage && (
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <PopoverItem
                  key={i}
                  className="flex items-center w-full h-full justify-between"
                >
                  <Skeleton className="w-full h-5" />
                </PopoverItem>
              ))}
            </div>
          )}

          {/* Empty State */}
          {options.length === 0 && !isLoading && (
            <div className="w-full h-7 flex items-center px-2">
              <h3 className="text-sm text-muted-foreground">No results</h3>
            </div>
          )}

          {/* Footer Renderer */}
          {renderFooter && (
            <PopoverItem
              onClick={() => footerTrigger?.({ search })}
              className="flex items-center w-full h-full justify-between"
            >
              <div className="w-full h-full">
                {footerRenderer?.({ search })}
              </div>
            </PopoverItem>
          )}

          {/* Footer Input */}
          {renderFooterInput && (
            <div className="sticky -bottom-1 right-0 bg-popover dark:bg-sidebar h-fit">
              <InlineInput
                value={search}
                {...footerInputProps}
                onAcceptValue={(value) => {
                  footerInputTrigger?.(value);
                  setOpen(false);
                }}
                className={cn("min-h-7", footerInputProps?.className)}
              >
                <div>{footerInputRenderer?.()}</div>
              </InlineInput>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ExpandableInlineSelect<T>({
  trigger,
  options,
  inputProps,
  isLoading,
  infiniteScrollEnabled,
  isFetchingNextPage,
  fetchNextPage,
  itemRenderer,
  onSelect,
  itemActive,
  renderFooter,
  footerTrigger,
  footerRenderer,
  contentStyle,
  selection = "single",
  disabled,
  renderFooterInput,
  footerInputTrigger,
  footerInputRenderer,
  footerInputProps,
  triggerClassName,
  renderTrigger,
}: Readonly<InlineSelectProps<T>>) {
  const { ref, inView } = useInView();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    if (inView && infiniteScrollEnabled) {
      fetchNextPage?.();
    }
  }, [infiniteScrollEnabled, inView]);

  const onSelectHandler = (option: T) => {
    if (selection === "single") {
      onSelect?.(option);
      setOpen(false);
    }

    if (selection === "multiple") {
      onSelect?.(option);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "w-full min-h-8 rounded-sm hover:bg-[var(--background-hover)]",
          triggerClassName
        )}
        disabled={disabled}
      >
        {renderTrigger?.(trigger) || (
          <ExpandableTrigger>{trigger}</ExpandableTrigger>
        )}
      </PopoverTrigger>
      <PopoverContent
        onWheel={(e) => {
          e.stopPropagation();
        }}
        style={contentStyle}
        className="w-[320px] p-0 rounded-md"
        align="start"
      >
        <div className="relative border-b">
          <Search
            size={16}
            strokeWidth={1.5}
            className="absolute left-2 top-2.5 text-zinc-500"
          />
          <Input
            {...inputProps}
            placeholder={inputProps?.placeholder || "Search..."}
            className="outline-none border-none focus-visible:border-none focus-visible:outline-0 focus-visible:ring-[0] shadow-none pl-7"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              inputProps?.onChange?.(e);
            }}
          />
        </div>
        <div className="flex flex-col gap-1 p-1 max-h-64 overflow-y-auto relative">
          {isLoading &&
            Array.from({ length: 5 }).map(() => (
              <PopoverItem className="flex items-center w-full h-full justify-between">
                <Skeleton className="w-full h-5" />
              </PopoverItem>
            ))}

          {options?.map((option) => (
            <PopoverItem
              onClick={() => onSelectHandler(option)}
              className="flex items-center w-full h-full justify-between"
            >
              <div className="flex-1 max-w-[85%]">{itemRenderer?.(option)}</div>

              {itemActive?.(option) && (
                <CircleCheck
                  className="text-[var(--interactive)]"
                  style={{ width: 14, height: 14 }}
                  strokeWidth={1.5}
                />
              )}
            </PopoverItem>
          ))}

          {/* Infinite Scroll Trigger */}
          {infiniteScrollEnabled && !isFetchingNextPage && (
            <div ref={ref}>
              {Array.from({ length: 5 }).map(() => (
                <PopoverItem className="flex items-center w-full h-full justify-between">
                  <Skeleton className="w-full h-5" />
                </PopoverItem>
              ))}
            </div>
          )}

          {/* Infinite Scroll Loading */}
          {infiniteScrollEnabled && isFetchingNextPage && (
            <div>
              {Array.from({ length: 5 }).map(() => (
                <PopoverItem className="flex items-center w-full h-full justify-between">
                  <Skeleton className="w-full h-5" />
                </PopoverItem>
              ))}
            </div>
          )}

          {/* Empty State */}
          {options?.length === 0 && !isLoading && (
            <div className="w-full h-7 flex items-center px-2">
              <h3 className="text-sm text-muted-foreground">No results</h3>
            </div>
          )}

          {renderFooter && (
            <PopoverItem
              onClick={() => footerTrigger?.({ search })}
              className="flex items-center w-full h-full justify-between"
            >
              <div className="w-full h-full">
                {footerRenderer?.({ search })}
              </div>
            </PopoverItem>
          )}

          {renderFooterInput && (
            <div className="sticky -bottom-1 right-0 bg-popover dark:bg-sidebar h-fit">
              <InlineInput
                value={search}
                {...footerInputProps}
                onAcceptValue={(value) => {
                  footerInputTrigger?.(value);
                  setOpen(false);
                }}
                className={cn("min-h-7", footerInputProps?.className)}
              >
                <div>{footerInputRenderer?.()}</div>
              </InlineInput>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface ExpandableTagsProps {
  children: React.ReactNode;
  maxHeight?: number;
  className?: string;
}

const ExpandableTrigger = ({
  children,
  maxHeight = 25, // Default max height for one line
  className = "",
}: Readonly<ExpandableTagsProps>) => {
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
    <div className={cn("px-3 py-1 relative group", className)}>
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
      {isOverflowing && (
        <div
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

export {
  InlineSelect,
  ExpandableTrigger,
  ExpandableInlineSelect,
  type InlineSelectProps,
  type ExpandableTagsProps,
};
