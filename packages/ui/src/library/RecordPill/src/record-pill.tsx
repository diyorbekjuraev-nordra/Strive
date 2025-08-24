import React, { FC, KeyboardEvent } from "react";
import { AvatarBase, AvatarImage, AvatarFallback } from "@/library/Avatar";
import { getColorById } from "@/lib/color";
import { cn } from "@/lib/utils";
import { Typography } from "@/library/Typography";

type Size = "xs" | "sm" | "md" | "lg";

interface RecordPillProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  label: string;
  avatarUrl?: string;
  onClick?: () => void;
  classNames?: {
    container?: string;
    avatarWrapper?: string;
    avatar?: string;
    avatarImage?: string;
    avatarFallback?: string;
    label?: string;
  };
  size?: Size;
}

const RecordPill: FC<RecordPillProps> = (props) => {
  const {
    id,
    label,
    avatarUrl,
    onClick,
    classNames,
    size = "md",
    ...rest
  } = props;

  const sizeMap: Record<Size, string> = {
    xs: "h-[22px]",
    sm: "h-[24px]",
    md: "h-[26px]",
    lg: "h-[28px]",
  };

  return (
    <div
      {...rest}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === "Enter") {
          onClick?.();
        }
      }}
      className={cn(
        "flex items-center rounded-[12px] px-0.5 pr-1 py-[1px] gap-1 border border-border shadow-black/5 max-w-fit bg-[var(--background-selected)]/20 hover:bg-[var(--background-hover)] transition-background duration-300 cursor-pointer",
        sizeMap[size],
        classNames?.container
      )}
    >
      <div className={cn("flex -space-x-1", classNames?.avatarWrapper)}>
        <AvatarBase className={cn("size-5", classNames?.avatar)}>
          <AvatarImage
            src={avatarUrl ?? ""}
            alt={label}
            className={cn(
              "border-2 border-background hover:z-10",
              classNames?.avatarImage
            )}
          />
          <AvatarFallback
            className={cn(
              getColorById(id?.toString()),
              "text-[10px] border flex items-center justify-center",
              classNames?.avatarFallback
            )}
          >
            {label?.charAt(0)?.toUpperCase() ?? "N"}
          </AvatarFallback>
        </AvatarBase>
      </div>
      <Typography
        variant="body"
        truncate
        className={cn(
          "text-[14px] max-w-[200px] select-none",
          classNames?.label
        )}
      >
        {label ?? "No Record label"}
      </Typography>
    </div>
  );
};

export { RecordPill, type RecordPillProps };
