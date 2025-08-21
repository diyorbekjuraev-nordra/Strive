import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/library/Dropdown";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  CircleCheck,
} from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Typography } from "@/library/Typography";

type SortValue = {
  column: string;
  order: "asc" | "desc";
};

export interface SortOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SortProps {
  /** Current sort value */
  value: SortValue;
  /** Called when sort changes */
  onChange: (value: SortValue) => void;
  /** Column options (e.g. Name, Role, Created At) */
  options: SortOption[];
  /** Order options (default: Asc/Desc) */
  orderOptions?: SortOption[];
  /** Width & style overrides */
  className?: string;

  size?: "sm" | "md" | "lg";
}

const defaultOrderOptions: SortOption[] = [
  { value: "asc", label: "Ascending", icon: ArrowUpNarrowWide },
  { value: "desc", label: "Descending", icon: ArrowDownWideNarrow },
];

function Sort({
  value,
  onChange,
  options,
  orderOptions = defaultOrderOptions,
  className,
  size = "sm",
}: SortProps) {
  const activeColumn = useMemo(
    () => options.find((opt) => opt.value === value.column),
    [options, value.column]
  );

  const getSize = useMemo(() => {
    switch (size) {
      case "sm":
        return "h-6";
      case "md":
        return "h-7";
      case "lg":
        return "h-8";
      default:
        return "h-7";
    }
  }, [size]);

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "w-full h-7 px-2 outline-0 rounded-[10px] border py-2 flex items-center justify-center cursor-pointer data-[state=open]:bg-[var(--background-selected)]",
            getSize
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2 flex-nowrap">
            {value.order === "asc" ? (
              <ArrowUpNarrowWide className="h-3.5 w-3.5 mr-0 text-muted-foreground" />
            ) : (
              <ArrowDownWideNarrow className="h-3.5 w-3.5 mr-0 text-muted-foreground" />
            )}
            <div className="flex items-center">
              <span className="text-muted-foreground font-medium text-sm whitespace-nowrap">
                Sorted by
              </span>
              <span className="text-[var(--text-primary)] font-medium ml-1 text-sm whitespace-nowrap">
                {activeColumn?.label ?? "—"}
              </span>
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[230px] rounded-[10px] shadow-lg border-[0.5px]"
          side="bottom"
          align="start"
        >
          {/* Column options */}
          <ScrollArea className="max-h-[250px] flex flex-col overflow-y-auto">
            {options.map((opt) => (
              <DropdownMenuItem
                className="cursor-pointer py-[4.7px]"
                key={opt.value}
                onClick={() => onChange({ ...value, column: opt.value })}
              >
                <div className="flex items-center gap-3">
                  {opt.icon && <opt.icon className="h-4 w-4" />}
                  <div className="grid">
                    <Typography
                      as="span"
                      className="text-sm font-medium"
                      truncate
                    >
                      {opt?.label}
                    </Typography>
                  </div>
                </div>
                {opt.value === value.column && (
                  <CircleCheck className="ml-auto text-[var(--interactive)]" />
                )}
              </DropdownMenuItem>
            ))}
          </ScrollArea>

          <DropdownMenuSeparator />

          {/* Order options */}
          {orderOptions.map((opt) => (
            <DropdownMenuItem
              className="cursor-pointer"
              key={opt.value}
              onClick={() =>
                onChange({ ...value, order: opt.value as "asc" | "desc" })
              }
            >
              <div className="flex items-center gap-3">
                {opt.icon && <opt.icon className="h-4 w-4" />}
                <span className="text-sm font-medium">{opt.label}</span>
              </div>
              {opt.value === value.order && (
                <CircleCheck className="ml-auto text-[var(--interactive)]" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { type SortProps, Sort };
