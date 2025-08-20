"use client";
import {
  ForwardRefExoticComponent,
  memo,
  RefAttributes,
  useCallback,
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

// Adjust import path as needed
import {
  Grid,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  SquareLibrary,
  SquareCheck,
  LucideProps,
} from "lucide-react";

// Generic interfaces for any type of data
interface GroupOption {
  type?: "separator";
  value: string;
  label?: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

interface ViewSettingsProps {
  // Group settings
  groupedBy?: string;
  groupOptions?: GroupOption[];
  currentGroup?: GroupOption;
  onGroupChange?: (groupValue: string) => void;

  // Completed/hidden items toggle
  showCompleted?: boolean;
  onToggleCompleted?: (show: boolean) => void;
  completedLabel?: string; // e.g., "Show completed tasks", "Show archived items", etc.
  completedIcon?: React.ComponentType<{ className?: string }>;

  // Customization
  triggerLabel?: string;
  groupByLabel?: string;
  className?: string;
  align?: "start" | "center" | "end";
}

// Separate memoized components for better performance
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
  }) => {
    const handleBackClick = useCallback(() => {
      onBack();
    }, [onBack]);

    const renderedGroups = useMemo(() => {
      return groupOptions.map((group, index) => {
        if (group.type === "separator") {
          return <Separator key={`separator-${index}`} className="my-1" />;
        }

        return (
          <PopoverItem
            className="cursor-pointer px-1"
            key={group.value}
            onClick={() => onGroupSelect(group?.value)}
          >
            <div className="flex items-center gap-3 w-full">
              {group.icon && <group.icon className="h-4 w-4" />}
              <Typography
                as="span"
                color="primary"
                truncate
                className="text-sm"
              >
                {group.label}
              </Typography>
              {group.value === groupedBy && (
                <CircleCheck className="ml-auto text-[var(--interactive)] h-4 w-4" />
              )}
            </div>
          </PopoverItem>
        );
      });
    }, [groupOptions, groupedBy, onGroupSelect]);

    return (
      <>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            onClick={handleBackClick}
            aria-label="Back to settings"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-xs text-muted-foreground font-medium">
            {groupByLabel}
          </div>
        </div>
        <Separator className="my-1" />
        {renderedGroups}
      </>
    );
  }
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
  }: {
    currentGroup?: GroupOption;
    showCompleted: boolean;
    completedLabel: string;
    completedIcon: React.ComponentType<{ className?: string }>;
    groupByLabel: string;
    onShowGroupSelect: () => void;
    onToggleCompleted: () => void;
  }) => {
    const handleGroupSelectClick = useCallback(() => {
      onShowGroupSelect();
    }, [onShowGroupSelect]);

    const handleToggleClick = useCallback(() => {
      onToggleCompleted();
    }, [onToggleCompleted]);

    return (
      <>
        <PopoverItem
          className="cursor-pointer justify-between px-1"
          onClick={handleGroupSelectClick}
        >
          <div className="flex items-center gap-3">
            <SquareLibrary className="h-4 w-4" />
            <div className="flex items-center gap-1">
              <Typography
                as="span"
                color="primary"
                truncate
                className="text-sm"
              >
                {groupByLabel}
              </Typography>
              <Typography as="span" color="helper" truncate className="text-xs">
                {currentGroup?.label}
              </Typography>
            </div>
          </div>
          <ChevronRight className="ml-auto h-4 w-4" />
        </PopoverItem>
        <Separator className="my-1" />
        <PopoverItem
          onClick={handleToggleClick}
          className="cursor-pointer px-1"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 cursor-pointer">
              <CompletedIcon className="h-4 w-4" />
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {completedLabel}
              </span>
            </div>
            <Switch
              checked={showCompleted}
              size="sm"
              className="bg-[var(--layer-01)]"
            />
          </div>
        </PopoverItem>
      </>
    );
  }
);

MainSettingsContent.displayName = "MainSettingsContent";

const ViewSettings = memo<ViewSettingsProps>(
  ({
    // Group settings
    groupedBy = "",
    groupOptions = [],
    currentGroup,
    onGroupChange,

    // Completed/hidden items
    showCompleted = false,
    onToggleCompleted,
    completedLabel = "Show completed items",
    completedIcon: CompletedIcon = SquareCheck,

    // Customization
    triggerLabel = "View settings",
    groupByLabel = "Grouped by",
    className = "",
    align = "end",
  }) => {
    const [showGroupSelect, setShowGroupSelect] = useState(false);

    // Memoized event handlers to prevent unnecessary re-renders
    const handleTriggerClick = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
    }, []);

    const handleShowGroupSelect = useCallback(() => {
      setShowGroupSelect(true);
    }, []);

    const handleHideGroupSelect = useCallback(() => {
      setShowGroupSelect(false);
    }, []);

    const handleGroupSelect = useCallback(
      (value: string) => {
        onGroupChange?.(value);
        setShowGroupSelect(false);
      },
      [onGroupChange]
    );

    const handleToggleCompleted = useCallback(() => {
      onToggleCompleted?.(!showCompleted);
    }, [onToggleCompleted, showCompleted]);

    // Memoize the content to prevent unnecessary re-renders
    const popoverContent = useMemo(() => {
      if (showGroupSelect) {
        return (
          <GroupSelectContent
            groupOptions={groupOptions}
            groupedBy={groupedBy}
            onGroupSelect={handleGroupSelect}
            onBack={handleHideGroupSelect}
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
          groupByLabel={groupByLabel}
          onShowGroupSelect={handleShowGroupSelect}
          onToggleCompleted={handleToggleCompleted}
        />
      );
    }, [
      showGroupSelect,
      groupOptions,
      groupedBy,
      currentGroup,
      showCompleted,
      completedLabel,
      CompletedIcon,
      groupByLabel,
      handleGroupSelect,
      handleHideGroupSelect,
      handleShowGroupSelect,
      handleToggleCompleted,
    ]);

    return (
      <Popover>
        <PopoverTrigger
          className={`h-7 px-2 outline-0 rounded-md border py-2 flex items-center justify-center cursor-pointer shadow-xs ${className} data-[state=open]:bg-[var(--layer-01)]`}
          onClick={handleTriggerClick}
          aria-label={triggerLabel}
        >
          <div className="flex items-center gap-2">
            <Grid className="h-[14px] w-[14px] text-muted-foreground" />
            <span className="text-[var(--text-primary)] font-medium text-sm whitespace-nowrap">
              {triggerLabel}
            </span>
            <ChevronDown className="h-[14px] w-[14px] text-muted-foreground" />
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
export type { ViewSettingsProps, GroupOption };
