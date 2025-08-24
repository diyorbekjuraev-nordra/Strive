"use client";
import { ComponentProps, FC, useEffect, useRef, useState } from "react";
import { ClickOutside } from "@/lib/shared/click-outside";
import { cn } from "@/lib/utils";
import { Textarea } from "@/library/Textarea";

type InlineTextAreaProps = {
  children: React.ReactNode;
  className?: string;
  textareaProps?: ComponentProps<typeof Textarea>;
  onAcceptValue?: (value: string) => void;
  value?: string;
  maxLines?: number;
};

const InlineTextarea: FC<InlineTextAreaProps> = ({ children, ...props }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props?.value ?? "");

  useEffect(() => {
    if (props?.value) {
      setValue(props.value);
    }
  }, [props?.value]);

  return (
    <ClickOutside
      active={open}
      onClick={() => {
        setOpen(false);
        props?.onAcceptValue?.(value.trim());
      }}
    >
      <div
        className={cn(
          "cursor-pointer justify-between focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/40 data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:!text-destructive-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex  items-center gap-2 rounded-sm  text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-[var(--background-hover)] w-full min-h-6 max-w-full",
          props.className,
          {
            "px-3 py-1": !open,
          }
        )}
        onClick={() => {
          if (!open) {
            setOpen(true);
          }
        }}
      >
        {open ? (
          <Textarea
            {...(props.textareaProps ?? {})}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={cn(
              "w-full outline-none h-full px-3 py-1 break-all",
              props.textareaProps?.className
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props?.onAcceptValue?.(value.trim());
                setOpen(false);
              }
            }}
            autoFocus
          />
        ) : (
          <span className="break-all whitespace-pre-line w-full">
            {children}
          </span>
        )}
      </div>
    </ClickOutside>
  );
};

export { InlineTextarea, type InlineTextAreaProps };
