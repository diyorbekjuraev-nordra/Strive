import { Skeleton } from "@/library/Skeleton";
import { FC, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

// ==============================================
// CONTEXT
// ==============================================
type LogContextValue = {
  maxWidth?: string;
};

const LogContext = createContext<LogContextValue>({});

const useLogContext = () => {
  const context = useContext(LogContext);
  return context;
};

// ==============================================
// ROOT COMPONENT
// ==============================================
interface TLogProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const LogRoot: FC<TLogProps> = ({ children, ...props }) => {
  const { maxWidth } = useLogContext();
  return (
    <LogContext.Provider value={{ maxWidth }}>
      <div
        {...props}
        className={cn(
          "w-full group min-h-15 flex flex-col relative",
          props.className
        )}
      >
        {children}
      </div>
    </LogContext.Provider>
  );
};

// ==============================================
// LOG COMPONENT
// ==============================================

interface LogHeaderProps {
  children: React.ReactNode;
}

const LogHeader: FC<LogHeaderProps> = ({ children }) => {
  return (
    <div className="w-full h-7 flex items-center px-2 gap-2">{children}</div>
  );
};

interface LogContentProps {
  children?: React.ReactNode;
  isPointerHidden?: boolean;
}

const LogContent: FC<LogContentProps> = ({ children, isPointerHidden }) => {
  return (
    <div className="flex-1 px-2 flex gap-2 max-w-full truncate break-all whitespace-pre-line line-clamp-3">
      <div className="w-4 flex justify-center">
        {!isPointerHidden && <div className="border-l h-full" />}
      </div>
      <div className="flex-1 truncate ellipsis max-w-full break-all whitespace-pre-line line-clamp-3">
        {children}
      </div>
    </div>
  );
};

// ==============================================
// SKELETON LOADING COMPONENTS
// ==============================================

const LogHeaderLoading: FC = () => {
  return (
    <div className="w-full h-7 flex items-center px-2 gap-2">
      <Skeleton className="h-4 w-24 rounded" />
    </div>
  );
};

const LogContentLoading: FC = () => {
  return (
    <div className="flex-1 px-2 flex gap-2 max-w-full truncate">
      <div className="w-4 flex justify-center">
        <div className="border-l h-full" />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>
    </div>
  );
};

const LogLoading: FC = () => {
  return (
    <>
      <LogHeaderLoading />
      <LogContentLoading />
    </>
  );
};

// ==============================================
// COMPOUND COMPONENT EXPORT
// ==============================================
const Log = Object.assign(LogRoot, {
  Header: LogHeader,
  Content: LogContent,
  HeaderLoading: LogHeaderLoading,
  ContentLoading: LogContentLoading,
  Loading: LogLoading,
});

export {
  type TLogProps,
  type LogHeaderProps,
  type LogContentProps,
  LogRoot,
  Log,
  LogHeader,
  LogContent,
  LogHeaderLoading,
  LogContentLoading,
  LogLoading,
};
