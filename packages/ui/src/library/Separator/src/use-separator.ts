import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

export type UseSeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  /**
   * The orientation of the separator.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  
  /**
   * Whether the separator is purely decorative.
   * When true, accessibility attributes are omitted.
   * @default true
   */
  decorative?: boolean;
  
  /**
   * Additional class name for the separator
   */
  className?: string;
};

export function useSeparator(props: UseSeparatorProps) {
  const {
    orientation = "horizontal",
    decorative = true,
    className,
    ...otherProps
  } = props;

  const getSeparatorProps = () => ({
    "data-slot": "separator-root",
    "data-orientation": orientation,
    decorative,
    orientation,
    className: cn(
      "bg-border shrink-0",
      {
        "h-px w-full": orientation === "horizontal",
        "h-full w-px": orientation === "vertical",
      },
      className
    ),
    ...otherProps,
  });

  return {
    getSeparatorProps,
    orientation,
    decorative,
  };
}
