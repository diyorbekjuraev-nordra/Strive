import { Skeleton } from "@/library/Skeleton";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type ButtonSkeletonProps = React.ComponentProps<typeof Skeleton> &
  VariantProps<typeof buttonSkeletonVariants> & {
    hasIconOnly?: boolean;
  };

export const buttonSkeletonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer bg-gray-200 dark:bg-gray-700 animate-pulse",
  {
    variants: {
      variant: {
        default: "rounded-[8px]",
        destructive: "rounded-md",
        outline: "rounded-md border",
        secondary: "rounded-md",
        ghost: "rounded-md",
        link: "rounded-md",
      },
      size: {
        md: "h-9 px-4 py-2 has-[>svg]:px-3 w-[150px]",
        sm: "h-6.5 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export function ButtonSkeleton({
  className,
  size,
  hasIconOnly,
}: ButtonSkeletonProps) {
  const sizeVariant = hasIconOnly ? "icon" : size;
  return (
    <Skeleton
      data-slot="button-skeleton"
      className={cn(buttonSkeletonVariants({ size: sizeVariant, className }))}
    />
  );
}
