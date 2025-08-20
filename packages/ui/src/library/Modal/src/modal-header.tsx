import { cn } from "@/lib/utils";

export type ModalHeaderProps = React.ComponentProps<"div">;

export function ModalHeader({ className, ...props }: ModalHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left px-4 py-2.5", className)}
      {...props}
    />
  );
}
