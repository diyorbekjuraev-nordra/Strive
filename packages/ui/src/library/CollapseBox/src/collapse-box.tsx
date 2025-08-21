"use client";
import React, { useState, createContext, useContext } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

// Context to share "open" state
type CollapseContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};
const CollapseContext = createContext<CollapseContextType | null>(null);

const useCollapse = () => {
  const ctx = useContext(CollapseContext);
  if (!ctx)
    throw new Error(
      "CollapseBox components must be used inside <CollapseBox.Container>"
    );
  return ctx;
};

interface ContainerProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Container (root wrapper, supports controlled & uncontrolled)
 */
const Container = ({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  className,
}: ContainerProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (val: boolean) => {
    if (!isControlled) setUncontrolledOpen(val);
    onOpenChange?.(val);
  };

  return (
    <CollapseContext.Provider value={{ open, setOpen }}>
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className={cn("rounded-md border h-fit", className)}
      >
        {children}
      </Collapsible>
    </CollapseContext.Provider>
  );
};

/**
 * Trigger (header)
 */
interface TriggerProps {
  children: React.ReactNode;
  className?: string;
  hasIndicator?: boolean;
  indicatorRenderer?: React.ReactNode;
  classNames?: {
    trigger?: string;
    triggerContent?: string;
    triggerIcon?: string;
  };
}

const Trigger = ({
  children,
  className,
  classNames,
  hasIndicator = true,
  indicatorRenderer = <ChevronDown className="w-4 h-4 text-muted-foreground" />,
}: TriggerProps) => {
  const { open } = useCollapse();
  return (
    <CollapsibleTrigger
      className={cn(
        "flex w-full items-center justify-between py-2 px-3 font-medium transition-colors cursor-pointer hover:bg-muted/40 gap-2",
        classNames?.trigger,
        className
      )}
    >
      <div className={cn("flex-1", classNames?.triggerContent)}>{children}</div>
      {hasIndicator && (
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {indicatorRenderer}
        </motion.div>
      )}
    </CollapsibleTrigger>
  );
};

interface ContentProps {
  children: React.ReactNode;
  classNames?: {
    content?: string;
    contentWrapper?: string;
  };
}

/**
 * Content (animated body)
 */
const Content = ({ children, classNames }: ContentProps) => {
  const { open } = useCollapse();

  return (
    <AnimatePresence>
      {open && (
        <CollapsibleContent
          forceMount
          asChild
          className={cn("border-t bg-muted/20", classNames?.content)}
        >
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div
              className={cn(
                "py-2 px-3 flex flex-col items-start gap-2",
                classNames?.contentWrapper
              )}
            >
              {children}
            </div>
          </motion.div>
        </CollapsibleContent>
      )}
    </AnimatePresence>
  );
};

// Attach compound components
const CollapseBox = {
  Container,
  Trigger,
  Content,
};

export {
  CollapseBox,
  type TriggerProps,
  type ContentProps,
  type ContainerProps,
};
