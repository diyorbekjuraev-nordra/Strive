import { CircleCheck, Search, X } from "lucide-react";
import * as React from "react";
import { type ComponentProps, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Input } from "@/library/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverItem,
} from "@/library/Popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/library/Badge";
import { Button } from "@/library/Button";
import { ScrollArea } from "@/library/ScrollArea";
import { Skeleton } from "@/library/Skeleton";
import { FixedSizeList as List } from "react-window";

type InlineRecordSelectProps<T> = {
  trigger?: React.ReactNode;
  className?: string;
  inputProps?: ComponentProps<typeof Input>;
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
  selectedItems?: Partial<T>[];
  getItemId?: (option: Partial<T>) => string | number;
  onRemove?: (option: Partial<T>) => void;
  selectedItemsRenderer?: (option: Partial<T>) => React.ReactNode;
  selectedItemRenderClassName?: string;
  /** 👇 new props for virtualization */
  itemSize?: number;
  listHeight?: number;
};

function InlineRecordSelect<T>({
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
  triggerClassName,
  selectedItems,
  getItemId,
  onRemove,
  selectedItemsRenderer,
  selectedItemRenderClassName,
  itemSize = 36, // 👈 default row height
  listHeight = 256, // 👈 max list height
}: InlineRecordSelectProps<T>) {
  const { ref, inView } = useInView();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    if (inView && infiniteScrollEnabled) {
      fetchNextPage?.();
    }
  }, [infiniteScrollEnabled, inView, fetchNextPage]);

  const onSelectHandler = (option: T) => {
    if (selection === "single") {
      onSelect?.(option);
      setOpen(false);
    }
    if (selection === "multiple") {
      onSelect?.(option);
    }
  };

  const filteredOptions = React.useMemo(() => {
    if (!options) return [];

    if (selection === "single" || !selectedItems?.length) {
      return options;
    }

    if (getItemId) {
      const selectedIds = new Set(selectedItems.map(getItemId));
      return options.filter((option) => !selectedIds.has(getItemId(option)));
    }

    return options.filter((option) => !selectedItems.includes(option));
  }, [options, selectedItems, selection, getItemId]);

  /** 👇 Virtualized Row renderer */
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const option = filteredOptions[index];
    return (
      <div style={style}>
        <PopoverItem
          key={getItemId?.(option) ?? index}
          onClick={() => onSelectHandler(option)}
          className="flex items-center w-full h-full justify-between"
        >
          <div className="flex-1">{itemRenderer?.(option)}</div>
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
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        onWheel={(e) => e.stopPropagation()}
        className="w-[320px] p-0 rounded-md"
        align="start"
        style={contentStyle}
      >
        {/* Search Input */}
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

        {/* Selected Tags */}
        {Boolean(selectedItems?.length) && (
          <ScrollArea className="max-h-36 overflow-y-auto">
            <div className="border-b">
              <div className="flex flex-wrap gap-1 p-1">
                {selectedItems?.map((item, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={selectedItemRenderClassName}
                  >
                    <span>{selectedItemsRenderer?.(item)}</span>
                    <Button
                      onClick={() => onRemove?.(item)}
                      size="icon"
                      variant="ghost"
                      className="rounded-full p-0.5 cursor-pointer size-4"
                    >
                      <X size={12} strokeWidth={2} className="size-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollArea>
        )}

        {/* Options with virtualization */}
        <div className="flex flex-col gap-1 p-1 max-h-64 overflow-y-auto">
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => (
              <PopoverItem
                key={i}
                className="flex items-center w-full h-full justify-between"
              >
                <Skeleton className="w-full h-5" />
              </PopoverItem>
            ))}

          {filteredOptions.length > 0 && (
            <List
              height={Math.min(listHeight, filteredOptions.length * itemSize)}
              itemCount={filteredOptions.length}
              itemSize={itemSize}
              width="100%"
            >
              {Row}
            </List>
          )}

          {/* Infinite scroll sentinel */}
          {infiniteScrollEnabled && !isFetchingNextPage && (
            <div ref={ref}>
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

          {/* Empty state */}
          {filteredOptions.length === 0 && !isLoading && (
            <div className="w-full h-7 flex items-center justify-center py-6 px-2">
              <h3 className="text-sm text-muted-foreground">No results</h3>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { InlineRecordSelect, type InlineRecordSelectProps };
