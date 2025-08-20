import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

export type ModalTriggerProps = React.ComponentProps<
  typeof DialogPrimitive.Trigger
>;

export function ModalTrigger({ ...props }: ModalTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}
