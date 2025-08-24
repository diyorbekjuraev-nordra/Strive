import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverItem,
  PopoverTrigger,
  type PopoverContentProps,
  type TPopoverItem,
} from "../../Popover";
import { Separator } from "../../Separator";
import {
  FixedSizeList as List,
  type ListChildComponentProps,
} from "react-window";
import { SearchInput, SearchInputProps } from "@/library/SearchInput";
import { Popover as PopoverPrimitive } from "radix-ui";
import { isFunction } from "lodash";
import {
  ComboBoxEmptyStateRenderer,
  ComboBoxFooterRenderer,
  ComboBoxLoadingRenderer,
  ComboBoxOptionRenderer,
  IComboBoxItemRenderer,
  IComboBoxFooterRendererProps,
} from "./default-renderers";

/**
 * Props for ComboBox component
 */
type TComboBoxProps<T> = {
  /** List of options to display */
  options: T[];
  /** Marks an item as active (e.g., preselected) */
  isItemActive?: (option: T) => boolean;
  /** Selection mode (default: "single") */
  selectionMode?: "single" | "multiple";

  /** Fired when search input changes */
  onSearchChange?: (search: string) => void;

  /** Custom renderer for trigger button */
  triggerRenderer?: (trigger: React.ReactNode) => React.ReactNode;
  /** Custom renderer for each option row */
  optionRenderer?: (option: IComboBoxItemRenderer<T>) => React.ReactNode;
  /** Custom renderer for item display */
  itemRenderer?: (option: T) => React.ReactNode;
  /** Custom renderer for empty state */
  emptyStateRenderer?: (ctx: { search: string }) => React.ReactNode;
  /** Custom renderer for loading state */
  loadingRenderer?: () => React.ReactNode;

  /** Footer action callback */
  onFooterAction?: (ctx: { search: string }) => void;
  /** Custom footer renderer */
  footerRenderer?: (props: IComboBoxFooterRendererProps) => React.ReactNode;

  /** Footer mode (none, fixed, dynamic) */
  footerMode?: "none" | "fixed" | "dynamic";

  /** Title for fixed footer */
  fixedFooterTitle?: string;

  /** Loading state */
  isLoading?: boolean;

  /** Infinite scroll settings */
  infiniteScrollEnabled?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;

  /** Selection callback */
  onSelect?: (option: T) => void;

  /** Popover configuration */
  popoverProps?: React.ComponentProps<typeof PopoverPrimitive.Root>;
  popoverTriggerProps?: React.ComponentProps<typeof PopoverPrimitive.Trigger>;
  popoverContentProps?: PopoverContentProps;
  popoverItemProps?: TPopoverItem;
  searchInputProps?: SearchInputProps;

  /** Open/close state (controlled or uncontrolled) */
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  /** Virtualized list dimensions */
  listHeight?: number;
  itemSize?: number;

  /** Trigger content */
  trigger?: React.ReactNode;
};

const ComboBox = <T,>(props: TComboBoxProps<T>) => {
  const {
    options,
    infiniteScrollEnabled,
    isFetchingNextPage,
    fetchNextPage,
    listHeight = 256,
    itemSize = 33,
    onSelect,
    isItemActive,
    selectionMode = "single",
    trigger,
    triggerRenderer,
    itemRenderer,
    onFooterAction,
    optionRenderer = ComboBoxOptionRenderer,
    emptyStateRenderer = ComboBoxEmptyStateRenderer,
    loadingRenderer = ComboBoxLoadingRenderer,
    footerRenderer = ComboBoxFooterRenderer,
    footerMode = "dynamic",
    fixedFooterTitle,
    searchInputProps,
    popoverProps,
    popoverTriggerProps,
    popoverContentProps = {
      align: "start",
    },
    popoverItemProps,
    defaultOpen,
    open,
    onOpenChange,
    isLoading,
    onSearchChange,
  } = props;
  const [openState, setOpenState] = useState<boolean>(
    open || defaultOpen || false
  );

  const [search, setSearch] = React.useState("");

  // SELECT HANDLER
  const onSelectHandler = (option: T) => {
    if (selectionMode === "single") {
      onSelect?.(option);
      setOpenState(false);
    } else {
      onSelect?.(option);
    }
  };

  return (
    <Popover
      {...popoverProps}
      open={openState}
      onOpenChange={isFunction(onOpenChange) ? onOpenChange : setOpenState}
    >
      <PopoverTrigger
        className="w-full min-h-8 rounded-sm hover:bg-[var(--background-hover)] px-3 py-1"
        {...popoverTriggerProps}
        asChild
      >
        {triggerRenderer?.(trigger) || trigger}
      </PopoverTrigger>
      <PopoverContent
        {...popoverContentProps}
        className="p-0 rounded-lg w-[320px]"
      >
        {/* COMBOBOX HEADER  */}
        <div className="h-8">
          <SearchInput
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              isFunction(onSearchChange) && onSearchChange(e.target.value);
            }}
            onClear={() => {
              setSearch("");
              isFunction(onSearchChange) && onSearchChange("");
            }}
            className="h-fit mt-1"
            classNames={{
              input:
                "rounded-none border-none focus-visible:border-none focus-visible:outline-0 focus-visible:ring-[0] pr-8 shadow-none",
            }}
            {...searchInputProps}
          />
        </div>
        {/* COMBOBOX SEPARATOR */}
        <Separator />

        {/* COMBOBOX LOADING STATE */}
        {isLoading && isFunction(loadingRenderer) && loadingRenderer()}

        {/* COMBOBOX OPTIONS */}
        <div className="p-0.5">
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
              className="smooth__scrollbar"
            >
              {({ index, style }: ListChildComponentProps) => {
                const option = options[index];
                return (
                  <div style={style}>
                    {optionRenderer({
                      option,
                      onSelectHandler,
                      isItemActive,
                      popoverItemProps,
                      itemRenderer,
                      selectionMode,
                    })}
                  </div>
                );
              }}
            </List>
          )}
        </div>

        {/* COMBOBOX INFINITE SCROLL LOADING */}
        {infiniteScrollEnabled &&
          isFetchingNextPage &&
          isFunction(loadingRenderer) &&
          loadingRenderer()}

        {/* COMBOBOX EMPTY STATE */}
        {options.length === 0 &&
          !isLoading &&
          !isFetchingNextPage &&
          isFunction(emptyStateRenderer) &&
          emptyStateRenderer({ search })}

        {/* COMBOBOX FOOTER */}
        {footerMode !== "none" && (
          <>
            {isFunction(footerRenderer) &&
              footerRenderer({
                search,
                onFooterAction,
                footerMode,
                fixedFooterTitle,
              })}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export { ComboBox, type TComboBoxProps };
