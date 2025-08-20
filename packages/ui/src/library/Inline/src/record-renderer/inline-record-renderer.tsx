import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import { Badge } from "@/library/Badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/library/HoverCard";
import { isFunction } from "lodash";
import { cn } from "@/lib/utils";

type TInlineRecordRendererProps<T extends any> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
  isExpandable?: boolean;
  emptyStateRenderer?: () => React.ReactNode;
  classNames?: {
    container?: string;
  };
};

const InlineRecordRenderer = memo(
  ({
    records,
    renderItem,
    isExpandable = false,
    emptyStateRenderer,
    classNames,
  }: TInlineRecordRendererProps<any>) => {
    const [showMore, setShowMore] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const ghostRef = useRef<HTMLDivElement>(null);
    const [visibleCount, setVisibleCount] = useState(records.length);

    const measureVisibleItems = useCallback(() => {
      const container = containerRef.current;
      const ghost = ghostRef.current;

      if (!container || !ghost) return;

      const containerWidth = container.offsetWidth;
      const items = Array.from(
        ghost.querySelectorAll("[data-record-item]")
      ) as HTMLElement[];

      if (items.length === 0) return;

      let totalWidth = 0;
      let visibleItems = 0;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemWidth = item.offsetWidth + (i > 0 ? 8 : 0);

        const willNeedCounter = i < items.length - 1;
        const badge = ghost.querySelector("[data-counter-item]") as HTMLElement;
        const badgeWidth = badge?.offsetWidth ?? 0;

        const requiredWidth =
          totalWidth + itemWidth + (willNeedCounter ? badgeWidth : 0);

        if (requiredWidth <= containerWidth) {
          totalWidth += itemWidth;
          visibleItems++;
        } else {
          break;
        }
      }

      setVisibleCount(Math.max(1, visibleItems));
    }, [records]);

    useEffect(() => {
      measureVisibleItems();
    }, [records, measureVisibleItems]);

    useEffect(() => {
      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(() => measureVisibleItems());
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, [measureVisibleItems]);

    useEffect(() => {
      const handleResize = () => {
        requestAnimationFrame(() => measureVisibleItems());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [measureVisibleItems]);

    const hiddenCount = records.length - visibleCount;
    const hiddenRecords = records.slice(visibleCount);

    return (
      <div
        className={cn("w-full relative group", {
          "py-1": showMore,
        })}
      >
        <div
          ref={containerRef}
          className={cn(
            "flex items-center gap-2 overflow-hidden w-full",
            classNames?.container
          )}
        >
          {records?.slice(0, visibleCount).map((record) => (
            <div key={record?.id} data-record-item className="flex-shrink-0">
              {renderItem(record)}
            </div>
          ))}

          {!Boolean(records.length) && (
            <div className="flex-shrink-0 text-muted-foreground text-sm flex items-center justify-center text-center mt-1">
              {isFunction(emptyStateRenderer)
                ? emptyStateRenderer()
                : "No data"}
            </div>
          )}

          {hiddenCount > 0 && !showMore && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="flex-shrink-0" data-counter-item>
                  <Badge variant="outline" className="size-6.5 mb-0.5">
                    +{hiddenCount}
                  </Badge>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto max-w-md p-1 bg-sidebar max-h-[200px] overflow-y-auto">
                <div className="flex flex-col gap-1">
                  {hiddenRecords.map((record) => renderItem(record))}
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>

        {showMore && (
          <div className="flex  gap-1 flex-wrap mt-2">
            {hiddenRecords.map((record) => renderItem(record))}
          </div>
        )}

        <div
          ref={ghostRef}
          className="absolute opacity-0 pointer-events-none w-full left-0 top-0 flex gap-2"
          aria-hidden
        >
          {records.map((record) => (
            <div key={record.id} data-record-item className="flex-shrink-0">
              {renderItem(record)}
            </div>
          ))}
          <div data-counter-item>
            <Badge variant="outline" className="size-6.5 mb-0.5">
              +{records.length}
            </Badge>
          </div>
        </div>

        {hiddenCount > 0 && isExpandable && (
          <div className="absolute opacity-0 group-hover:opacity-100 top-0 -right-1  rounded-lg">
            <div
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setShowMore(!showMore);
                }
              }}
              aria-expanded={showMore}
              aria-label="Toggle show more"
              className="whitespace-nowrap cursor-pointer text-muted-foreground bg-[var(--layer-02)] text-xs px-2  rounded-tr-sm rounded-br-sm hover:bg-[var(--background-hover)] transition-colors py-2 flex items-center rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                setShowMore(!showMore);
              }}
            >
              {showMore ? "Show less" : "Show more"}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export { InlineRecordRenderer, type TInlineRecordRendererProps };
