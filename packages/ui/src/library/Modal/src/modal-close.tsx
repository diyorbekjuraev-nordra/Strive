import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

export type ModalCloseProps = React.ComponentProps<
  typeof DialogPrimitive.Close
>;

export function ModalClose({ ...props }: ModalCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}
