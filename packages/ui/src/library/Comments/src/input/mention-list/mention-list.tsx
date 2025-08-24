import * as React from "react";
import { Skeleton } from "@/library/Skeleton";
import { AvatarBase, AvatarFallback, AvatarImage } from "@/library/Avatar";
import { useCommentStore } from "../../../store";
import { getInitials } from "@/lib/utils";
import { getDeterministicColor } from "@/lib/color";
import { TUser } from "@/lib/types/base";

interface MentionListProps {
  items: TUser[];
  command: (item: { id: string; label: string }) => void;
  size?: "xs" | "sm" | "md" | "lg";
  classNames?: {
    wrapper?: string;
    item?: string;
    avatar?: string;
  };
}

interface MentionListRef {
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => boolean;
}

type Size = "xs" | "sm" | "md" | "lg";

const sizeClasses: Record<Size, string> = {
  xs: "h-6",
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
} as const;

const MentionList = React.memo(
  React.forwardRef<MentionListRef, MentionListProps>(
    ({ items, command }, ref) => {
      const { input } = useCommentStore();
      const [selectedIndex, setSelectedIndex] = React.useState(0);

      const selectItem = React.useCallback(
        (index: number) => {
          const item = items[index];
          if (item) {
            command({
              id: String(item?.user_profiles?.id),
              label: String(item?.user_profiles?.username),
            });
          }
        },
        [items, command]
      );

      const upHandler = React.useCallback(() => {
        setSelectedIndex(
          (selectedIndex) => (selectedIndex + items.length - 1) % items.length
        );
      }, [items.length]);

      const downHandler = React.useCallback(() => {
        setSelectedIndex((selectedIndex) => (selectedIndex + 1) % items.length);
      }, [items.length]);

      const enterHandler = React.useCallback(() => {
        selectItem(selectedIndex);
      }, [selectItem, selectedIndex]);

      React.useEffect(() => {
        setSelectedIndex(0);
      }, [items]);

      React.useImperativeHandle(ref, () => ({
        onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "ArrowUp") {
            upHandler();
            return true;
          }
          if (event.key === "ArrowDown") {
            downHandler();
            return true;
          }
          if (event.key === "Enter") {
            enterHandler();
            return true;
          }
          return false;
        },
      }));

      return (
        <div className="rounded-[8px] bg-[var(--layer-01)] border">
          <div
            className="background w-[300px] max-h-[400px] rounded-[8px] flex flex-col overflow-y-auto p-1 custom__scrollbar"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                upHandler();
              }
              if (e.key === "ArrowDown") {
                e.preventDefault();
                downHandler();
              }
              if (e.key === "Enter") {
                e.preventDefault();
                enterHandler();
              }
            }}
          >
            {(() => {
              if (input.isMentionLoading) {
                return Array.from({ length: 3 }).map((_, index) => (
                  <div
                    className={
                      "flex gap-2 p-2 rounded-sm bg_hover cursor-pointer items-center"
                    }
                    key={index}
                  >
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="w-[40%] h-4" />
                  </div>
                ));
              }

              if (items?.length) {
                return items.map((item, index) => (
                  <button
                    className={`flex gap-2 p-2 rounded-sm bg_hover cursor-pointer items-center ${
                      index === selectedIndex
                        ? "bg-[var(--background-selected)]"
                        : ""
                    }`}
                    key={item.id ?? index}
                    onClick={() => selectItem(index)}
                  >
                    <AvatarBase className="min-w-4 min-h-4 max-w-4 max-h-4 rounded-full">
                      <AvatarImage
                        src={item?.user_profiles?.profile_picture_url ?? ""}
                        className="rounded-full"
                      />
                      <AvatarFallback
                        style={{
                          backgroundColor: getDeterministicColor(
                            String(item?.user_profiles?.id ?? "")
                          ),
                        }}
                        className="min-w-4 min-h-4 max-w-4 max-h-4 text-xs text-white text-xs font-medium rounded-full"
                      >
                        {getInitials(
                          String(item?.user_profiles?.username ?? "")
                        )}
                      </AvatarFallback>
                    </AvatarBase>
                    <h3 className="text-sm">{item?.user_profiles?.username}</h3>
                  </button>
                ));
              }

              return (
                <div className="w-full h-full flex items-center justify-center">
                  <h3 className="text-center text-sm text__secondary">
                    No result
                  </h3>
                </div>
              );
            })()}
          </div>
        </div>
      );
    }
  )
);

export { MentionList, type MentionListProps, type MentionListRef };
