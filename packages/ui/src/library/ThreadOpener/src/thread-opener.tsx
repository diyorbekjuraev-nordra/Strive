import { cn } from "@/lib/utils";

interface ThreadOpenerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ThreadOpener: React.FC<ThreadOpenerProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        "px-2 py-1.5 rounded-sm w-full flex items-center gap-2 group bg-[var(--layer-01)]",
        props.className
      )}
      role="button"
      tabIndex={0}
      onKeyUp={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
          props?.onClick?.(e);
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
        props?.onClick?.(e);
      }}
    >
      {children}
      <h3 className="text-xs text-muted-foreground transition-all">
        View Thread
      </h3>
    </div>
  );
};

export { ThreadOpener };
