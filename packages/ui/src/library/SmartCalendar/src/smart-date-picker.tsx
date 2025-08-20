"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/library/Popover";
import { useState, useRef, FC } from "react";
import { Button } from "@/library/Button";
import { CalendarIcon, CornerDownLeft } from "lucide-react";
import { Kbd } from "@/library/Kbd";
import { Calendar } from "@/library/Calendar";
import { DateRange } from "react-day-picker";
import { Input } from "@/library/Input";
import * as chrono from "chrono-node";

const default_dates = [
  {
    label: "Today",
    date: new Date(),
  },
  {
    label: "Tomorrow",
    date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
  },
  {
    label: "Next week",
    date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7),
  },
];

const parseNaturalDates = (text: string) => {
  const results = chrono.parse(text);
  return results.map((result) => ({
    start: result.start?.date(),
    end: result.end?.date(),
    text: result.text,
  }));
};

type SmartDateSelectorProps = React.HTMLAttributes<HTMLInputElement> & {
  onReset?: () => void;
  calendarProps?: React.ComponentProps<typeof Calendar>;
  clickableDates?: { label: string; date: DateRange | Date }[];
  onDateClicked?: (date: DateRange | Date) => void;
  onChronoParsed?: (date: DateRange | Date) => void;
  disableNoDateButton?: boolean;
};

const SmartDateSelector: FC<SmartDateSelectorProps> = ({
  children,
  clickableDates = default_dates,
  ...props
}) => {
  const [dateSelectorOpen, setDateSelectorOpen] = useState<boolean>(false);
  const ref = useRef<null | HTMLInputElement>(null);

  return (
    <Popover open={dateSelectorOpen} onOpenChange={setDateSelectorOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[268px] p-2" align="start">
        <div className="relative flex-1">
          <Kbd className="absolute right-2 top-1" size="sm">
            <CornerDownLeft
              className="text-muted-foreground"
              style={{ width: 12, height: 12 }}
            />
          </Kbd>
          <Input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const result = parseNaturalDates(String(ref.current?.value));

                if (result[0] && props?.calendarProps?.mode === "range") {
                  props?.onChronoParsed?.({
                    ...(props.calendarProps?.selected ?? {}),
                    to: result[0].end ?? new Date(),
                    from: result[0].start ?? new Date(),
                  });
                }
              }
            }}
            ref={ref}
            autoFocus
            placeholder="Next Tuesday..."
            className="h-8 pr-8"
          />
        </div>
        <div
          className="w-full"
          onClick={(e) => e.stopPropagation()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
            }
          }}
        >
          <Calendar {...props.calendarProps} className="w-full" />
        </div>

        <div className="flex gap-1 flex-wrap">
          {clickableDates.map((date) => (
            <Button
              onClick={() => props?.onDateClicked?.(date.date)}
              key={date.label}
              size="sm"
              variant="outline"
              className="h-5 text-xs px-1"
              prepend={<CalendarIcon style={{ width: 12, height: 12 }} />}
            >
              {date.label}
            </Button>
          ))}
          {!props?.disableNoDateButton && (
            <Button
              onClick={() => {
                props?.onReset?.();
                setDateSelectorOpen(false);
              }}
              size="sm"
              variant="outline"
              className="h-5 text-xs px-1"
              prepend={<CalendarIcon style={{ width: 12, height: 12 }} />}
            >
              No Date
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { parseNaturalDates, SmartDateSelector, type SmartDateSelectorProps };
