"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/library/Badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/library/Collapsible";
import { Separator } from "@/library/Separator";
import { Skeleton } from "@/library/Skeleton";

interface AppreciationsContainerProps {
  badgeContent: React.ReactNode;
  children: React.ReactNode;
}
const AppreciationsContainer: FC<AppreciationsContainerProps> = ({
  badgeContent,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="rounded-sm flex gap-2 w-full items-center justify-between p-2 font-medium  transition-colors cursor-pointer hover:bg-muted/40">
        <Badge className="" variant="outline">
          {badgeContent}
        </Badge>
        <Separator className="flex-1" />
        <ChevronRight
          className={cn(
            "size-4 transition-transform duration-200",
            open && "rotate-90"
          )}
        />
      </CollapsibleTrigger>

      <AnimatePresence>
        {open && (
          <CollapsibleContent forceMount asChild className="p-2">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {children}
            </motion.div>
          </CollapsibleContent>
        )}
      </AnimatePresence>
    </Collapsible>
  );
};

interface AppreciationsContainerLoadingProps {
  children?: React.ReactNode;
}

const AppreciationsContainerLoading: FC<AppreciationsContainerLoadingProps> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="rounded-sm flex gap-2 w-full items-center justify-between p-2 font-medium  transition-colors cursor-pointer hover:bg-muted/40">
        {/* Badge Skeleton */}
        <Skeleton className="h-6 w-20 rounded" />
        <Separator className="flex-1" />
        <ChevronRight
          className={cn(
            "size-4 transition-transform duration-200",
            open && "rotate-90"
          )}
        />
      </CollapsibleTrigger>

      <AnimatePresence>
        {open && (
          <CollapsibleContent forceMount asChild className="p-2">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {children}
            </motion.div>
          </CollapsibleContent>
        )}
      </AnimatePresence>
    </Collapsible>
  );
};

export {
  AppreciationsContainer,
  AppreciationsContainerLoading,
  type AppreciationsContainerProps,
  type AppreciationsContainerLoadingProps,
};
