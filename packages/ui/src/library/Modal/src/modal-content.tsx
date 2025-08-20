import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ModalPortal } from "./modal-portal";
import { ModalOverlay } from "./modal-overlay";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

export interface ModalContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content> {
  readonly classNames?: {
    content?: string;
    closeButton?: string;
  };
}

export function ModalContent({
  className,
  children,
  classNames,
  ...props
}: ModalContentProps) {
  return (
    <ModalPortal data-slot="dialog-portal">
      <ModalOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "dark:bg-[var(--layer-01)] bg-[var(--layer-02)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border shadow-lg duration-200  sm:max-w-lg rounded-[16px] px-0.5 py-0.5", 
          className,
          classNames?.content 
        )} 
        {...props}
      >
        <div className="rounded-[16px] border">{children}</div>
        <DialogPrimitive.Close
          className={cn(
            "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
            classNames?.closeButton
          )}
        >
          <XIcon className="cursor-pointer" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </ModalPortal>
  );
}
