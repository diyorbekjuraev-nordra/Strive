"use client";

import {
  ForwardRefExoticComponent,
  memo,
  RefAttributes,
  useMemo,
  useState,
} from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverItem,
} from "@/library/Popover";
import { Button } from "@/library/Button";
import { Separator } from "@/library/Separator";
import { Switch } from "@/library/Switch";
import { Typography } from "@/library/Typography";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid,
  CircleCheck,
  SquareLibrary,
  SquareCheck,
  EllipsisVertical,
  GripVertical,
  Plus,
  CircleMinus,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sortable,
  SortableContent,
  SortableItem,
  SortableItemHandle,
  SortableOverlay,
} from "@/library/Sortable";
import { ScrollArea } from "@/library/ScrollArea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/library/Dropdown";
import { Input } from "@/library/Input";
import Image from "next/image";
import { SearchInput } from "@/library/SearchInput";

// ---------- Types ----------
interface GroupOption {
  type?: "separator";
  value: string;
  label?: string;
  icon?: ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

interface ColumnOption {
  value: string;
  label: string;
  icon?: ForwardRefExoticComponent<any>;
}

interface ViewSettingsProps {
  // Group settings
  groupedBy?: string;
  groupOptions?: GroupOption[];
  currentGroup?: GroupOption;
  onGroupChange?: (groupValue: string) => void;

  // Completed toggle
  isVisibleCompletedOption?: boolean;
  showCompleted?: boolean;
  onToggleCompleted?: (show: boolean) => void;
  completedLabel?: string;
  completedIcon?: React.ComponentType<{ className?: string }>;

  // Sortable columns
  enableSortable?: boolean;
  sortableColumns?: ColumnOption[];
  allColumns?: ColumnOption[];
  onColumnsReorder?: (cols: ColumnOption[]) => void;
  onAddColumn?: (col: ColumnOption) => void;
  onRemoveColumn?: (col: ColumnOption) => void;

  // Customization
  triggerLabel?: string;
  groupByLabel?: string;
  groupedByLabel?: string;
  className?: string;
  align?: "start" | "center" | "end";
  size?: "sm" | "md" | "lg";
}

// ---------- Subcomponents ----------
const GroupSelectContent = memo(
  ({
    groupOptions,
    groupedBy,
    onGroupSelect,
    onBack,
    groupByLabel,
  }: {
    groupOptions: GroupOption[];
    groupedBy: string;
    onGroupSelect: (value: string) => void;
    onBack: () => void;
    groupByLabel: string;
  }) => (
    <>
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6"
          onClick={onBack}
          aria-label="Back to settings"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-xs text-muted-foreground font-medium">
          {groupByLabel}
        </div>
      </div>
      <Separator className="my-1" />
      {groupOptions.map((group, i) =>
        group.type === "separator" ? (
          <Separator key={`sep-${i}`} className="my-1" />
        ) : (
          <PopoverItem
            key={group.value}
            className="cursor-pointer px-1"
            onClick={() => onGroupSelect(group.value)}
          >
            <div className="flex items-center gap-3 w-full">
              {group.icon && <group.icon className="h-4 w-4" />}
              <Typography as="span" color="primary" className="text-sm">
                {group.label}
              </Typography>
              {group.value === groupedBy && (
                <CircleCheck className="ml-auto text-[var(--interactive)] h-4 w-4" />
              )}
            </div>
          </PopoverItem>
        )
      )}
    </>
  )
);
GroupSelectContent.displayName = "GroupSelectContent";

const MainSettingsContent = memo(
  ({
    currentGroup,
    showCompleted,
    completedLabel,
    completedIcon: CompletedIcon,
    groupByLabel,
    onShowGroupSelect,
    onToggleCompleted,
    isVisibleCompletedOption,
  }: {
    currentGroup?: GroupOption;
    showCompleted: boolean;
    completedLabel: string;
    completedIcon: React.ComponentType<{ className?: string }>;
    groupByLabel: string;
    onShowGroupSelect: () => void;
    onToggleCompleted: () => void;
    isVisibleCompletedOption: boolean;
  }) => (
    <>
      <PopoverItem
        className="cursor-pointer justify-between px-1 h-[28px]"
        onClick={onShowGroupSelect}
      >
        <div className="flex items-center gap-3">
          <SquareLibrary className="h-4 w-4" />
          <div className="flex items-center gap-1">
            <Typography as="span" color="primary" className="text-sm">
              {groupByLabel}
            </Typography>
            <Typography as="span" color="helper" className="text-xs">
              {currentGroup?.label}
            </Typography>
          </div>
        </div>
        <ChevronRight className="ml-auto h-4 w-4" />
      </PopoverItem>
      {isVisibleCompletedOption && <Separator className="my-1" />}
      {isVisibleCompletedOption && (
        <PopoverItem
          className="cursor-pointer px-1"
          onClick={onToggleCompleted}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <CompletedIcon className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">
                {completedLabel}
              </span>
            </div>
            <Switch checked={showCompleted} size="sm" />
          </div>
        </PopoverItem>
      )}
    </>
  )
);
MainSettingsContent.displayName = "MainSettingsContent";

const SortableColumnsContent = ({
  existingColumns,
  notExistingColumns,
  searchedColumns,
  onAddColumn,
  onRemoveColumn,
  onReorder,
}: {
  existingColumns: ColumnOption[];
  notExistingColumns: ColumnOption[];
  searchedColumns: ColumnOption[];
  onAddColumn: (col: ColumnOption) => void;
  onRemoveColumn: (col: ColumnOption) => void;
  onReorder: (cols: ColumnOption[]) => void;
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <Sortable
      value={existingColumns}
      getItemValue={(item) => item.value}
      onValueChange={(changes) => onReorder(changes)}
    >
      {showAdd ? (
        <>
          <div className="flex items-center gap-2 py-0.5">
            <Button
              size="icon"
              variant="ghost"
              className="size-5"
              onClick={() => setShowAdd(false)}
              aria-label="Back to settings"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </Button>
            <div className="text-xs text-muted-foreground font-medium">
              Add Column
            </div>
          </div>

          <div className="relative border-b pb-2">
            <SearchInput
              placeholder="Search columns..."
              value={search}
              onClear={() => setSearch("")}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ScrollArea className="max-h-[300px] smooth__scrollbar">
            {searchedColumns.length ? (
              searchedColumns.map((col) => (
                <PopoverItem
                  key={col.value}
                  onClick={() => {
                    onAddColumn(col);
                    setShowAdd(false);
                  }}
                >
                  <div className="flex items-center gap-3 w-full">
                    {col.icon && col.value !== "x_url" && (
                      <col.icon className="h-4 w-4" />
                    )}
                    {col.value === "x_url" && (
                      <Image
                        src="/icons/x.svg"
                        width={14}
                        height={14}
                        alt="x"
                        className="invert-60"
                      />
                    )}
                    <span className="text-sm font-medium">{col.label}</span>
                  </div>
                </PopoverItem>
              ))
            ) : (
              <div className="w-full h-10 flex items-center justify-center">
                <h3 className="text-sm text-muted-foreground">No Columns</h3>
              </div>
            )}
          </ScrollArea>
        </>
      ) : (
        <>
          <SortableContent asChild>
            <ScrollArea className="max-h-[300px] smooth__scrollbar">
              {!existingColumns?.length && (
                <div className="w-full h-10 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    No Columns
                  </span>
                </div>
              )}
              {existingColumns?.map((col) => (
                <SortableItem value={col.value} asChild key={col.value}>
                  <PopoverItem className="flex items-center justify-between h-8">
                    <div className="flex items-center gap-2 w-full">
                      <SortableItemHandle asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-5 rounded px-1"
                        >
                          <GripVertical />
                        </Button>
                      </SortableItemHandle>
                      {col.icon && col.value !== "x_url" && (
                        <col.icon className="h-4 w-4" />
                      )}
                      {col.value === "x_url" && (
                        <Image
                          src="/icons/x.svg"
                          width={14}
                          height={14}
                          alt="x"
                          className="invert-60"
                        />
                      )}
                      <div className="grid">
                        <Typography
                          as="span"
                          color="primary"
                          truncate
                          className="text-sm font-medium"
                        >
                          {col.label}
                        </Typography>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button className="size-5 rounded px-1" variant="ghost">
                          <EllipsisVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => onRemoveColumn(col)}
                        >
                          <CircleMinus /> Remove column
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </PopoverItem>
                </SortableItem>
              ))}
            </ScrollArea>
          </SortableContent>

          {Boolean(notExistingColumns.length) && (
            <>
              <Separator className="my-1" />
              <PopoverItem
                className="cursor-pointer justify-between px-1"
                onClick={() => setShowAdd(true)}
              >
                <div className="flex items-center gap-3">
                  <Plus className="h-4 w-4" />
                  Add Column
                </div>
                <ChevronRight className="ml-auto h-4 w-4" />
              </PopoverItem>
            </>
          )}
        </>
      )}
      <SortableOverlay>
        <div className="flex items-center gap-2 px-1 justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 min-w-5 rounded-sm bg-[var(--background-hover)]" />
            <div className="h-6 min-w-4 rounded-sm bg-[var(--background-hover)]" />
            <div className="h-6 w-30 rounded-sm bg-[var(--background-hover)]" />
          </div>
          <div className="h-6 min-w-6 rounded-sm bg-[var(--background-hover)]" />
        </div>
      </SortableOverlay>
    </Sortable>
  );
};

// ---------- Main ViewSettings ----------
const ViewSettings = memo<ViewSettingsProps>(
  ({
    groupedBy = "",
    groupOptions = [],
    currentGroup,
    onGroupChange,
    showCompleted = false,
    onToggleCompleted,
    completedLabel = "Show completed",
    completedIcon: CompletedIcon = SquareCheck,
    enableSortable = false,
    sortableColumns = [],
    allColumns = [],
    onColumnsReorder,
    onAddColumn,
    onRemoveColumn,
    triggerLabel = "View settings",
    groupedByLabel = "Grouped by",
    groupByLabel = "Group by",
    className,
    align = "end",
    size = "md",
    isVisibleCompletedOption = true,
  }) => {
    const [showGroupSelect, setShowGroupSelect] = useState(false);

    const sizeMap: Record<NonNullable<ViewSettingsProps["size"]>, string> = {
      sm: "h-6.5 px-2",
      md: "h-8 px-2",
      lg: "h-[40px] px-2",
    };

    const popoverContent = useMemo(() => {
      if (enableSortable && sortableColumns && allColumns) {
        const notExisting = allColumns.filter(
          (c) => !sortableColumns.some((ex) => ex.value === c.value)
        );
        const searched = notExisting; // search handled inside
        return (
          <SortableColumnsContent
            existingColumns={sortableColumns}
            notExistingColumns={notExisting}
            searchedColumns={searched}
            onAddColumn={onAddColumn!}
            onRemoveColumn={onRemoveColumn!}
            onReorder={onColumnsReorder!}
          />
        );
      }

      if (showGroupSelect) {
        return (
          <GroupSelectContent
            groupOptions={groupOptions}
            groupedBy={groupedBy}
            onGroupSelect={(val) => {
              onGroupChange?.(val);
              setShowGroupSelect(false);
            }}
            onBack={() => setShowGroupSelect(false)}
            groupByLabel={groupByLabel}
          />
        );
      }

      return (
        <MainSettingsContent
          currentGroup={currentGroup}
          showCompleted={showCompleted}
          completedLabel={completedLabel}
          completedIcon={CompletedIcon}
          groupByLabel={groupedByLabel}
          onShowGroupSelect={() => setShowGroupSelect(true)}
          onToggleCompleted={() => onToggleCompleted?.(!showCompleted)}
          isVisibleCompletedOption={isVisibleCompletedOption}
        />
      );
    }, [
      enableSortable,
      sortableColumns,
      allColumns,
      showGroupSelect,
      groupedBy,
      currentGroup,
      showCompleted,
    ]);

    return (
      <Popover>
        <PopoverTrigger
          className={cn(
            "h-7 px-2 outline-0 rounded-md border py-2 flex items-center justify-center cursor-pointer shadow-xs data-[state=open]:bg-[var(--background-selected)]",
            className,
            sizeMap[size]
          )}
          aria-label={triggerLabel}
        >
          <div className="flex items-center gap-2">
            <Grid className="h-[14px] w-[14px] text-muted-foreground" />
            <span className="text-sm font-medium">{triggerLabel}</span>
            <ChevronDown className="h-[14px] w-[14px]" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[257px] rounded-[10px] shadow-lg border-[0.5px] px-1 py-1"
          align={align}
        >
          {popoverContent}
        </PopoverContent>
      </Popover>
    );
  }
);

ViewSettings.displayName = "ViewSettings";

export { ViewSettings };
export type { ViewSettingsProps, GroupOption, ColumnOption };
