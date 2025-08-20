import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils"; 

export type ModalDescriptionProps = React.ComponentProps<typeof DialogPrimitive.Description>;

export function ModalDescription({
  className,
  ...props
}: ModalDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
