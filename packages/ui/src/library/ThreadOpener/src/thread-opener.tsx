import { cn } from "@/lib/utils";
import { LAYER_VARIANTS } from "@/lib/types/colors";
import { LAYER_CLASSNAMES } from "@/lib/shared/layer";

interface ThreadOpenerProps extends React.HTMLAttributes<HTMLDivElement> {
  layer?: LAYER_VARIANTS;
}

const ThreadOpener: React.FC<ThreadOpenerProps> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        "px-2 py-1.5 rounded-sm w-full flex items-center gap-2 group",
        LAYER_CLASSNAMES[props.layer || 1],
        props.className
      )}
      role="button"
      tabIndex={0}
      onKeyUp={(e: any) => {
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
