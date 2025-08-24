import { SmilePlus } from "lucide-react";
import { ComponentProps, useState } from "react";
import { Badge } from "@/library/Badge";
import { Button } from "@/library/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/library/Popover";
import { cn } from "@/lib/utils";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
} from "@/library/EmojiPicker";

interface ReactionProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: ComponentProps<typeof Badge>["variant"];
}

const Reaction: React.FC<ReactionProps> = ({
  children,
  variant = "blue",
  ...props
}) => {
  return (
    <Badge
      className={cn("px-[6px] text-xs cursor-pointer", props.className)}
      variant={variant}
      {...(props as any)}
    >
      {children}
    </Badge>
  );
};

interface ReactionsContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  onReactionSelect?: (T: { native: string; shortcodes: string }) => void;
}

const ReactionsContainer: React.FC<ReactionsContainerProps> = ({
  children,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div {...props} className={cn("flex gap-1.5 flex-wrap", props.className)}>
      {children}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger onClick={(e) => e.stopPropagation()} asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-5.5 transition-all duration-200 text-zinc-500 rounded-sm"
          >
            <SmilePlus style={{ width: 12, height: 12 }} />
          </Button>
        </PopoverTrigger>
        {open && (
          <PopoverContent
            side="bottom"
            align="start"
            className="border-none bg-transparent shadow-none p-0 m-0 w-[268px]"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            <EmojiPicker
              className="h-[326px] rounded-lg border shadow-md"
              onEmojiSelect={({ emoji }) =>
                props?.onReactionSelect?.({ native: emoji, shortcodes: emoji })
              }
            >
              <EmojiPickerSearch />
              <EmojiPickerContent />
            </EmojiPicker>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};

export { Reaction, ReactionsContainer, type ReactionProps, type ReactionsContainerProps };
