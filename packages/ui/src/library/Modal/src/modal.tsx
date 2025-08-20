import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

export type ModalProps = React.ComponentProps<typeof DialogPrimitive.Root>;

export function Modal({ ...props }: ModalProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}
