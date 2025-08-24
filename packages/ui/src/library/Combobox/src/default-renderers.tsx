// COMBOBOX DEFAULT RENDERERS
import { Typography } from "@/library/Typography";
import { generateUniqueIds } from "@/lib";
import { PopoverItem } from "../../Popover";
import { Skeleton } from "../../Skeleton";
import { CircleCheck, SearchX } from "lucide-react";
import { Checkbox } from "@/library/Checkbox";
import { Separator } from "../../Separator";

// COMBOBOX EMPTY STATE RENDERER
const ComboBoxEmptyStateRenderer = (props: { search: string }) => {
  const { search } = props;
  return (
    <div className="flex flex-col items-center justify-center w-full py-2 space-y-2">
      {Boolean(search) && (
        <div className="flex items-center justify-center rounded-md size-10 border">
          <SearchX color="var(--text-helper)" />
        </div>
      )}
      <Typography color="primary" className="text-sm px-4 items-center">
        No options found {search ? "for “" + search + "”" : ""}
      </Typography>
      {Boolean(search) && (
        <Typography color="helper" className="text-xs">
          Try to change the search
        </Typography>
      )}
    </div>
  );
};

// COMBOBOX LOADING RENDERER
const ComboBoxLoadingRenderer = () => {
  return (
    <div>
      {generateUniqueIds(5).map((_, i) => (
        <PopoverItem
          key={i}
          className="flex items-center w-full h-full justify-between"
        >
          <Skeleton className="w-full h-5" />
        </PopoverItem>
      ))}
    </div>
  );
};

//  COMBOBOX ITEM RENDERER
interface IComboBoxItemRenderer<T> {
  option: T;
  selectionMode: "single" | "multiple";
  onSelectHandler: (option: T) => void;
  isItemActive?: (option: T) => boolean;
  popoverItemProps?: React.ComponentProps<typeof PopoverItem>;
  itemRenderer?: (option: T) => React.ReactNode;
}

const ComboBoxOptionRenderer = <T,>(props: IComboBoxItemRenderer<T>) => {
  const {
    option,
    onSelectHandler,
    isItemActive,
    popoverItemProps,
    itemRenderer,
    selectionMode,
  } = props;
  return (
    <PopoverItem
      onClick={() => onSelectHandler(option)}
      className="flex items-center w-full h-full justify-between"
      {...popoverItemProps}
    >
      <div className="flex-1 grid">{itemRenderer?.(option)}</div>
      {selectionMode === "single" ? (
        isItemActive?.(option) && (
          <CircleCheck
            className="text-[var(--interactive)]"
            style={{ width: 14, height: 14 }}
            strokeWidth={1.5}
          />
        )
      ) : (
        <Checkbox
          size="sm"
          className="rounded-md"
          checked={isItemActive?.(option)}
        />
      )}
    </PopoverItem>
  );
};

// COMBOBOX FOOTER RENDERER
interface IComboboxFooterTriggerProps {
  search: string;
}

const ComboboxFooterTrigger = (props: IComboboxFooterTriggerProps) => {
  const { search } = props;
  return <PopoverItem>+ Create {search}</PopoverItem>;
};

interface IComboBoxFooterRendererProps {
  search: string;
  onFooterAction?: (option: { search: string }) => void;
  footerMode?: "dynamic" | "fixed";
  fixedFooterTitle?: string;
}
const ComboBoxFooterRenderer = (props: IComboBoxFooterRendererProps) => {
  const { search, onFooterAction, footerMode, fixedFooterTitle } = props;

  if (footerMode === "fixed") {
    return (
      <div>
        <Separator />
        <PopoverItem
          onClick={() => onFooterAction?.({ search })}
          className="flex items-center w-full h-full justify-between rounded-none rounded-b-md"
        >
          <div className="w-full h-full grid">
            <Typography
              className="text-sm font-medium"
              truncate
              color="primary"
            >
              {fixedFooterTitle}
            </Typography>
          </div>
        </PopoverItem>
      </div>
    );
  }
  return (
    footerMode === "dynamic" &&
    search && (
      <>
        <Separator />
        <PopoverItem
          onClick={() => onFooterAction?.({ search })}
          className="flex items-center w-full h-full justify-between rounded-none rounded-b-md"
        >
          <div className="w-full h-full grid">
            <Typography
              className="text-sm font-medium"
              truncate
              color="primary"
            >
              + Create {search}
            </Typography>
          </div>
        </PopoverItem>
      </>
    )
  );
};

export {
  ComboBoxEmptyStateRenderer,
  ComboBoxLoadingRenderer,
  ComboBoxOptionRenderer,
  ComboBoxFooterRenderer,
  ComboboxFooterTrigger,
  type IComboboxFooterTriggerProps,
  type IComboBoxFooterRendererProps,
  type IComboBoxItemRenderer,
};
