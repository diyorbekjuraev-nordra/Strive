"use client";

import React, { memo, useCallback, useMemo, useState } from "react";
import { Card, type CardProps } from "@/library/Card";
import { Button } from "@/library/Button";
import { TooltipWrapper } from "@/library/Tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/library/Popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/library/Dropdown";
import { Skeleton } from "@/library/Skeleton";
import { ThreadOpener } from "@/library/ThreadOpener";
import { AvatarBase, AvatarFallback, AvatarImage } from "@/library/Avatar";
import { cn, getInitials } from "@/lib/utils";
import { getDeterministicColor } from "@/lib/color";
import { formatTimestamp } from "@/lib";
import type { TUser } from "@/lib/types/base";
import {
  Reply,
  SmilePlus,
  CircleCheck,
  EllipsisVertical,
  Trash,
  Clock,
} from "lucide-react";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
} from "@/library/EmojiPicker";

/** ———————————————————————————————————————————————————————————————
 * Types
 * ——————————————————————————————————————————————————————————————— */
export type ReactionPayload = { native: string; shortcodes: string };

type CommonCommentFields = {
  /** Comment/Reply author */
  user: Partial<TUser>;
  /** ISO string or Date-compatible string */
  date: string;
  /** Controls the small actions bar (reply/emoji/resolve/etc.) */
  disableHoverableActions?: boolean;
  /** Extra action nodes rendered in the hover bar */
  hoverableActions?: React.ReactNode[];
  /** Pending state (optimistic UI) */
  isPending?: boolean;
  /** Resolve UX */
  isResolved?: boolean;
  onResolve?: () => void;
  disableResolve?: boolean;
  /** Delete UX */
  onRemove?: () => void;
  disableDelete?: boolean;
  /** Reaction UX */
  onReactionSelect?: (payload: ReactionPayload) => void;
  /** Who resolved this comment (legacy prop name kept for compatibility) */
  user_resolved?: Partial<TUser> | null; // deprecated: prefer resolvedBy
  /** Current viewer (used to show "You") */
  currentUserId?: string;
};

export type CommentProps = CommonCommentFields &
  Omit<CardProps, "children" | "className"> & {
    children?: React.ReactNode;
    /** Adjust left padding of content area */
    variant?: "default" | "main";
    customHeader?: React.ReactNode;
    renderThread?: boolean;
    /** When true, the “Resolved by …” label shows above */
    showResolvedBanner?: boolean;
    /** Deprecated alias; kept for compatibility */
    hoverActionVisible?: boolean;
    className?: string;
    cardProps?: CardProps;
  };

export type ReplyCommentProps = CommonCommentFields & {
  children?: React.ReactNode;
  /** Hide the left vertical pointer line */
  isPointerHidden?: boolean;
  className?: string;
};

/** ———————————————————————————————————————————————————————————————
 * Helpers & shared UI
 * ——————————————————————————————————————————————————————————————— */
const ICON_SIZE = 14;

function useSafeFormattedDate(date: string) {
  return useMemo(() => {
    const d = new Date(date);
    return Number.isNaN(d.getTime()) ? "" : formatTimestamp(d);
  }, [date]);
}

const AvatarMini = ({ user }: { user: Partial<TUser> }) => {
  const initials = getInitials(String(user?.username || user?.email || "?"));
  const bg = getDeterministicColor(String(user?.id ?? initials));
  return (
    <AvatarBase className="size-4">
      <AvatarImage
        src={String(user?.profile_picture_url || "")}
        alt={String(user?.username || "User")}
      />
      <AvatarFallback
        style={{ backgroundColor: bg }}
        className="text-[8px] text-white"
      >
        {initials}
      </AvatarFallback>
    </AvatarBase>
  );
};

const PendingBadge = () => (
  <div className="absolute bottom-2 right-2 flex gap-1 items-center">
    <Clock size={12} className="text-muted-foreground animate-spin" />
    <span className="text-xs text-muted-foreground">Pending</span>
  </div>
);

type HoverActionsProps = {
  showReply?: boolean;
  onReply?: () => void;
  onResolve?: () => void;
  onRemove?: () => void;
  onReactionSelect?: (payload: ReactionPayload) => void;
  disableDelete?: boolean;
  disableResolve?: boolean;
  isResolved?: boolean;
  extraActions?: React.ReactNode[];
};

/** Uses CSS only for visibility: hidden by default; visible on hover/focus within the card */
const HoverActions = memo(function HoverActions({
  showReply = false,
  onReply,
  onResolve,
  onRemove,
  onReactionSelect,
  disableDelete,
  disableResolve,
  isResolved,
  extraActions = [],
}: HoverActionsProps) {
  const [reactionOpen, setReactionOpen] = useState(false);

  const handleReactionSelect = useCallback(
    ({ emoji }: { emoji: string }) => {
      onReactionSelect?.({ native: emoji, shortcodes: emoji });
      setReactionOpen(false);
    },
    [onReactionSelect]
  );

  return (
    <div
      className={cn(
        "absolute top-2 right-2 hidden",
        "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 flex",
        "bg-[var(--background)] border rounded-sm items-center p-0.5"
      )}
    >
      {showReply && (
        <TooltipWrapper content="Reply in thread">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Reply in thread"
            className="size-7 transition-all duration-200 text-zinc-500 rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              onReply?.();
            }}
          >
            <Reply size={ICON_SIZE} />
          </Button>
        </TooltipWrapper>
      )}

      <TooltipWrapper content="Add reaction">
        <Popover open={reactionOpen} onOpenChange={setReactionOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Add reaction"
              className="size-7 transition-all duration-200 text-zinc-500 rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <SmilePlus size={ICON_SIZE} />
            </Button>
          </PopoverTrigger>

          {reactionOpen && (
            <PopoverContent
              side="bottom"
              align="start"
              className="border-none bg-transparent shadow-none p-0 m-0 w-fit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Keep your existing EmojiPicker API */}
              <div className="h-[326px] rounded-lg border shadow-md overflow-hidden bg-background">
                {/* Replace with your EmojiPicker components */}
                {/* Example wire-up; ensure these are controlled inside EmojiPicker */}
                <EmojiPicker
                  onEmojiSelect={({ emoji }) => handleReactionSelect({ emoji })}
                >
                  <EmojiPickerSearch />
                  <EmojiPickerContent />
                </EmojiPicker>
              </div>
            </PopoverContent>
          )}
        </Popover>
      </TooltipWrapper>

      {!disableResolve && (
        <TooltipWrapper content={isResolved ? "Re-open" : "Resolve"}>
          <Button
            variant="ghost"
            size="icon"
            aria-label={isResolved ? "Re-open comment" : "Resolve comment"}
            className="size-7 transition-all duration-200 text-zinc-500 rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              onResolve?.();
            }}
          >
            <CircleCheck
              size={ICON_SIZE}
              className={cn(isResolved && "stroke-sidebar fill-zinc-500")}
            />
          </Button>
        </TooltipWrapper>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="More actions"
            className="size-7 transition-all duration-200 text-zinc-500 rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <EllipsisVertical size={ICON_SIZE} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-[10px]">
          <DropdownMenuItem
            disabled={disableDelete}
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            variant="destructive"
          >
            <Trash size={ICON_SIZE} />
            <span className="text-xs  ml-2">Delete comment</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {extraActions.map((node, i) => (
        <div key={i}>{node}</div>
      ))}
    </div>
  );
});

/** ———————————————————————————————————————————————————————————————
 * Comment (root)
 * ——————————————————————————————————————————————————————————————— */
const CommentComponent: React.FC<CommentProps> = ({
  user,
  date,
  children,
  variant = "default",
  customHeader,
  renderThread,
  onResolve,
  onRemove,
  onReactionSelect,
  isResolved,
  isPending,
  disableDelete,
  disableResolve,
  disableHoverableActions,
  hoverableActions = [],
  user_resolved,
  currentUserId,
  showResolvedBanner = true,
  className,
  // legacy prop kept but unused (visibility is CSS-based now)
  hoverActionVisible: _legacyHoverActionVisible,
  ...cardProps
}) => {
  const ts = useSafeFormattedDate(date);
  const resolvedByName =
    currentUserId && user_resolved?.id === currentUserId
      ? "You"
      : user_resolved?.username || "Someone";

  return (
    <Card
      size="sm"
      className={cn(
        "px-2 !py-2 !gap-2 shadow-none gap-0 bg-transparent hover:bg-[var(--background-hover)] cursor-pointer relative group",
        isPending && "opacity-70",
        className
      )}
    >
      {showResolvedBanner && isResolved && (
        <h3 className="text-xs text-muted-foreground">
          Resolved by {resolvedByName}
        </h3>
      )}

      {customHeader ?? (
        <div className="w-full h-7 flex items-center gap-2 relative">
          <AvatarMini user={user} />
          <h3 className="text-sm font-semibold">
            {user?.username || "Unknown user"}
          </h3>
          {ts && <h3 className="text-xs text-muted-foreground">{ts}</h3>}
        </div>
      )}

      <div className={cn(variant !== "default" && "pl-6")}>{children}</div>

      {renderThread && (
        <div className="pl-4 pt-2">
          <ThreadOpener className="h-7">
            <div className="bg-[var(--support-error)] size-4 rounded-full" />
          </ThreadOpener>
        </div>
      )}

      {!disableHoverableActions && (
        <HoverActions
          showReply={true}
          onReply={undefined /* wire if needed */}
          onResolve={onResolve}
          onRemove={onRemove}
          onReactionSelect={onReactionSelect}
          disableDelete={disableDelete}
          disableResolve={disableResolve}
          isResolved={isResolved}
          extraActions={hoverableActions}
        />
      )}

      {isPending && <PendingBadge />}
    </Card>
  );
};

export const Comment = memo(CommentComponent);

/** ———————————————————————————————————————————————————————————————
 * ReplyComment
 * ——————————————————————————————————————————————————————————————— */
const ReplyCommentComponent: React.FC<ReplyCommentProps> = ({
  user,
  date,
  children,
  isPointerHidden,
  onResolve,
  onRemove,
  onReactionSelect,
  isResolved,
  isPending,
  disableDelete,
  disableResolve,
  disableHoverableActions,
  hoverableActions = [],
  user_resolved,
  currentUserId,
  className,
  ...divProps
}) => {
  const ts = useSafeFormattedDate(date);
  const resolvedByName =
    currentUserId && user_resolved?.id === currentUserId
      ? "You"
      : user_resolved?.username || "Someone";

  return (
    <div
      {...divProps}
      className={cn(
        "w-full group min-h-15 flex flex-col relative",
        isPending && "opacity-70",
        className
      )}
    >
      {isResolved && !disableResolve && (
        <h3 className="text-xs text-muted-foreground pl-8">
          Resolved by {resolvedByName}
        </h3>
      )}

      <div className="w-full h-7 flex items-center px-2 gap-2">
        <AvatarMini user={user} />
        <h3 className="text-sm font-semibold">
          {user?.username || "Unknown user"}
        </h3>
        {ts && <h3 className="text-xs text-muted-foreground">{ts}</h3>}
      </div>

      {!disableHoverableActions && (
        <HoverActions
          onResolve={onResolve}
          onRemove={onRemove}
          onReactionSelect={onReactionSelect}
          disableDelete={disableDelete}
          disableResolve={disableResolve}
          isResolved={isResolved}
          extraActions={hoverableActions}
        />
      )}

      <div className="flex-1 px-2 flex gap-2">
        <div className="w-4 flex justify-center">
          {!isPointerHidden && <div className="border-l h-full" />}
        </div>
        <div className="flex-1">{children}</div>
      </div>

      {isPending && <PendingBadge />}
    </div>
  );
};

export const ReplyComment = memo(ReplyCommentComponent);

/** ———————————————————————————————————————————————————————————————
 * Skeletons
 * ——————————————————————————————————————————————————————————————— */
export const CommentLoading: React.FC<{ className?: string }> = ({
  className,
}) => (
  <Card
    className={cn(
      "p-2 shadow-none gap-0 bg-transparent cursor-pointer hover:bg-sidebar relative group",
      className
    )}
  >
    <div className="w-full h-7 flex items-center gap-2 relative">
      <Skeleton className="size-4 rounded-full" />
      <Skeleton className="h-4 w-16 rounded" />
      <Skeleton className="h-3 w-10 rounded ml-2" />
    </div>
    <div className="pl-6 pt-1 flex flex-col gap-1">
      <Skeleton className="h-4 w-11/12 rounded" />
      <Skeleton className="h-4 w-8/12 rounded" />
    </div>
  </Card>
);

export const ReplyCommentLoading: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div
    className={cn("w-full group min-h-15 flex flex-col relative", className)}
  >
    <div className="w-full h-7 flex items-center px-2 gap-2">
      <Skeleton className="size-4 rounded-full" />
      <Skeleton className="h-4 w-16 rounded" />
      <Skeleton className="h-3 w-10 rounded ml-2" />
    </div>
    <div className="flex-1 px-2 flex gap-2">
      <div className="w-4 flex justify-center">
        <div className="border-l h-full" />
      </div>
      <div className="flex-1 flex flex-col gap-1 pt-1">
        <Skeleton className="h-4 w-10/12 rounded" />
        <Skeleton className="h-4 w-7/12 rounded" />
      </div>
    </div>
  </div>
);
