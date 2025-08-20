import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

export type ModalPortalProps = React.ComponentProps<
  typeof DialogPrimitive.Portal
>;

export function ModalPortal({ ...props }: ModalPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}
