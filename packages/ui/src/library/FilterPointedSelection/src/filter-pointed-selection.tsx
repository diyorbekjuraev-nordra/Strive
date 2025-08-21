"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/library/Dropdown";
import { Button } from "@/library/Button/src/button";
import { Sliders, CircleCheck } from "lucide-react";
import type { FilterOption } from "./use-filter-pointed-selection";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Separator } from "@/library/Separator";

export interface FilterPointedSelectionProps {
  options: FilterOption[];
  selectedValue?: string;
  onFilterChange?: (value: string) => void;
  buttonText?: string;
  filterLabel?: string;
  classNames?: {
    button?: string;
    dropdown?: string;
    dropdownItem?: string;
    dropdownItemActive?: string;
  };
  triggerIcon?: React.ReactNode;
  disabled?: boolean;
}

export const FilterPointedSelection = ({
  options,
  selectedValue,
  onFilterChange,
  buttonText = "Filter",
  filterLabel = "Filter By",
  classNames,
  triggerIcon = <Sliders />,
}: FilterPointedSelectionProps) => {
  const [open, setOpen] = useState(false);

  const handleFilterChange = (value: string) => {
    onFilterChange?.(value);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button prepend={triggerIcon} variant="outline" className="relative">
          {buttonText}
          {selectedValue && (
            <span className="absolute right-[-2px] top-[2px] -translate-y-1/2 size-2 rounded-full bg-[var(--interactive)]"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("w-[190px] gap-0 px-0 rounded-md", classNames?.dropdown)}
        align="start"
      >
        <div>
          <div className="flex items-center justify-between p-1">
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              {filterLabel}
            </DropdownMenuLabel>
            <Button
              variant="ghost"
              size="sm"
              disabled={!selectedValue}
              onClick={() => {
                onFilterChange?.("");
                setOpen(false);
              }}
            >
              Reset
            </Button>
          </div>
          <Separator />
          <div className="py-1">
            {options?.map((item) => (
              <DropdownMenuItem
                key={item.label}
                onClick={() => {
                  handleFilterChange(item?.value);
                }}
                className={cn(
                  "flex items-center justify-between mx-1",
                  classNames?.dropdownItem
                )}
              >
                {item.label}

                {item.value === selectedValue && (
                  <CircleCheck
                    style={{ width: 14, height: 14 }}
                    className="text-[var(--interactive)]"
                  />
                )}
              </DropdownMenuItem>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
