import { cn } from "@/lib/utils";

export type ModalFooterProps = React.ComponentProps<"div">;

export function ModalFooter({ className, ...props }: ModalFooterProps) {
    return (
      <div
        data-slot="dialog-footer"
        className={cn(
          "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end overflow-visible p-1 px-4",
          className
        )}
        {...props}
      />
    );
  }
  