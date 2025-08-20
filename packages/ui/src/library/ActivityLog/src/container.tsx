import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/library/Collapsible";
import { Skeleton } from "@/library/Skeleton";
import { Badge } from "@/library/Badge";
import { Separator } from "@/library/Separator";
import { useState, FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityContainerProps {
  badgeContent: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const ActivityContainer: FC<ActivityContainerProps> = ({
  badgeContent,
  children,
  defaultOpen,
}: ActivityContainerProps) => {
  const [open, setOpen] = useState<boolean>(defaultOpen || false);

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

interface ActivityContainerLoadingProps {
  children?: React.ReactNode;
}

const ActivityContainerLoading: FC<ActivityContainerLoadingProps> = ({
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
  type ActivityContainerProps,
  ActivityContainer,
  ActivityContainerLoading,
  type ActivityContainerLoadingProps,
};
