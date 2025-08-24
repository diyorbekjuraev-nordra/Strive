import React, {
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  memo,
  JSX,
} from "react";
import { Badge } from "@/library/Badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/library/HoverCard";
import { cn } from "@/lib/utils";

type TInlineRecordRendererProps<T> = {
  /** Records to render inline */
  records: T[];
  /** Render a single record; receives (record, index) */
  renderItem: (record: T, index: number) => React.ReactNode;
  /** Enable “Show more / Show less” inline expansion */
  isExpandable?: boolean;
  /** Rendered when there are zero records */
  emptyStateRenderer?: () => React.ReactNode;
  /** Optional css hooks */
  classNames?: { container?: string };
  /** Stable key extractor; default: record["id"] or index */
  keyExtractor?: (record: T, index: number) => React.Key;
  /** Minimum number of items to remain visible even on tiny widths (default 1) */
  minVisibleItems?: number;
  /** Enable verbose console debug logs */
  debug?: boolean;
};

const DEFAULT_MIN_VISIBLE = 1;

const InlineRecordRendererInner = memo(function InlineRecordRenderer<T>({
  records,
  renderItem,
  isExpandable = false,
  emptyStateRenderer,
  classNames,
  keyExtractor,
  minVisibleItems = DEFAULT_MIN_VISIBLE,
  debug = false,
}: TInlineRecordRendererProps<T>) {
  const [showMore, setShowMore] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number>(
    Math.min(records.length, Math.max(0, minVisibleItems))
  );

  const log = (...args: unknown[]) => {
    if (debug) console.debug("[InlineRecordRenderer]", ...args);
  };

  // Stable key extraction
  const getKey = useCallback(
    (rec: T, index: number) => {
      if (keyExtractor) return keyExtractor(rec, index);
      const maybeId = (rec as { id: React.Key })?.id;
      return maybeId ?? index;
    },
    [keyExtractor]
  );

  // Core measurement: how many items fit including "+N" badge reservation
  const measureVisibleItems = useCallback(() => {
    const container = containerRef.current;
    const ghost = ghostRef.current;
    if (!container || !ghost) {
      log("skip measure (missing refs)");
      return;
    }

    const containerWidth = container.offsetWidth;
    const items = Array.from(
      ghost.querySelectorAll<HTMLElement>("[data-record-item]")
    );
    if (items.length === 0) {
      setVisibleCount(0);
      log("no items; visibleCount=0");
      return;
    }

    // Compute badge width once
    const badge = ghost.querySelector<HTMLElement>("[data-counter-item]");
    const badgeWidth = badge?.offsetWidth ?? 0;

    let totalWidth = 0;
    let visible = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      // Tailwind gap-2 => 8px between items
      const itemWidth = item.offsetWidth + (i > 0 ? 8 : 0);

      // Reserve space for the "+N" counter if there will be hidden items
      const willNeedCounter = i < items.length - 1;
      const requiredWidth =
        totalWidth + itemWidth + (willNeedCounter ? badgeWidth : 0);

      if (requiredWidth <= containerWidth) {
        totalWidth += itemWidth;
        visible++;
      } else {
        break;
      }
    }

    const nextVisible = Math.max(minVisibleItems, visible);
    setVisibleCount(nextVisible);
    log("measured", {
      containerWidth,
      items: items.length,
      badgeWidth,
      totalWidth,
      nextVisible,
    });
  }, [minVisibleItems, log]);

  // Measure before paint to avoid flicker
  useLayoutEffect(() => {
    let raf = 0;

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measureVisibleItems);
    };

    // If fonts API present, wait for fonts to stabilize on first measure
    // (prevents under-measuring due to fallback fonts)
    const fontsReady = (document as any)?.fonts?.ready;
    if (fontsReady && typeof fontsReady.then === "function") {
      (fontsReady as Promise<unknown>).finally(schedule);
    } else {
      schedule();
    }

    return () => cancelAnimationFrame(raf);
  }, [measureVisibleItems, records.length]);

  // Observe container size changes (covers viewport & parent layout changes)
  useLayoutEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      log("ResizeObserver not available; skipping observer setup");
      return;
    }

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(measureVisibleItems);
    });

    if (containerRef.current) ro.observe(containerRef.current);

    return () => ro.disconnect();
  }, [measureVisibleItems, log]);

  const hiddenCount = Math.max(0, records.length - visibleCount);
  const hiddenRecords = records.slice(visibleCount);

  return (
    <div className={cn("w-full relative group", { "py-1": showMore })}>
      {/* Visible inline row */}
      <div
        ref={containerRef}
        className={cn(
          "flex items-center gap-2 overflow-hidden w-full",
          classNames?.container
        )}
      >
        {records.slice(0, visibleCount).map((record, i) => (
          <div
            key={getKey(record, i)}
            data-record-item
            className="flex-shrink-0"
          >
            {renderItem(record, i)}
          </div>
        ))}

        {records.length === 0 && (
          <div className="flex-shrink-0 text-muted-foreground text-sm flex items-center justify-center text-center mt-1">
            {emptyStateRenderer?.() ?? "No data"}
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
                {hiddenRecords.map((record, idx) => (
                  <div key={getKey(record, visibleCount + idx)}>
                    {renderItem(record, visibleCount + idx)}
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>

      {/* Expanded block */}
      {showMore && (
        <div className="flex gap-1 flex-wrap mt-2">
          {hiddenRecords.map((record, idx) => (
            <div key={getKey(record, visibleCount + idx)}>
              {renderItem(record, visibleCount + idx)}
            </div>
          ))}
        </div>
      )}

      {/* Ghost for measurement only */}
      <div
        ref={ghostRef}
        className="absolute opacity-0 pointer-events-none w-full left-0 top-0 flex gap-2"
        aria-hidden="true"
      >
        {records.map((record, i) => (
          <div
            key={getKey(record, i)}
            data-record-item
            className="flex-shrink-0"
          >
            {renderItem(record, i)}
          </div>
        ))}
        <div data-counter-item>
          <Badge variant="outline" className="size-6.5 mb-0.5">
            +{records.length}
          </Badge>
        </div>
      </div>

      {/* Expand / collapse control */}
      {hiddenCount > 0 && isExpandable && (
        <div className="absolute opacity-0 group-hover:opacity-100 top-0 -right-1 rounded-lg">
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setShowMore((s) => !s);
              }
            }}
            aria-expanded={showMore}
            aria-label="Toggle show more"
            className="whitespace-nowrap cursor-pointer text-muted-foreground bg-[var(--layer-02)] text-xs px-2 rounded-tr-sm rounded-br-sm hover:bg-[var(--background-hover)] transition-colors py-2 flex items-center rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              setShowMore((s) => !s);
            }}
          >
            {showMore ? "Show less" : "Show more"}
          </div>
        </div>
      )}
    </div>
  );
});

const InlineRecordRenderer = memo(InlineRecordRendererInner) as <T>(
  props: TInlineRecordRendererProps<T>
) => JSX.Element;

export { InlineRecordRenderer, type TInlineRecordRendererProps };
