import { createContext, FC, useContext } from "react";
import { AvatarBase, AvatarFallback, AvatarImage } from "@/library/Avatar";
import { getColorById } from "@/lib/color";
import { cn, getInitials } from "@/lib/utils";
import { Card } from "@/library/Card";
import { Skeleton } from "@/library/Skeleton";
import { TUser } from "@/lib/types/base";

type AppreciationContextValue = {
  isReversed?: boolean;
  alignment?: "left" | "right" | "center";
  maxWidth?: string;
  user?: Partial<TUser>;
};

const AppreciationContext = createContext<AppreciationContextValue>({});

const useAppreciationContext = () => {
  const context = useContext(AppreciationContext);
  return context;
};

type AppreciationProps = {
  isReversed?: boolean;
  alignment?: "left" | "right" | "center";
  maxWidth?: string;
  user?: Partial<TUser>;
  children: React.ReactNode;
  className?: string;
};

const AppreciationRoot: FC<AppreciationProps> = ({
  isReversed = false,
  alignment = "left",
  maxWidth = "50%",
  user,
  children,
  className,
}) => {
  const getAlignmentClass = () => {
    switch (alignment) {
      case "right":
        return "items-end";
      case "center":
        return "items-center";
      default:
        return "items-start";
    }
  };

  const contextValue: AppreciationContextValue = {
    isReversed,
    alignment,
    maxWidth,
    user,
  };

  return (
    <AppreciationContext.Provider value={contextValue}>
      <div className={cn("flex flex-col", getAlignmentClass(), className)}>
        {children}
      </div>
    </AppreciationContext.Provider>
  );
};

// ==============================================
// HEADER COMPONENT
// ==============================================

type AppreciationHeaderProps = {
  statusText?: string;
  className?: string;
  userInfoClassName?: string;
  statusClassName?: string;
  children?: React.ReactNode; // For custom content
};

const AppreciationHeader: FC<AppreciationHeaderProps> = ({
  statusText,
  className,
  userInfoClassName,
  statusClassName,
  children,
}) => {
  const { isReversed, maxWidth, user } = useAppreciationContext();

  // If children are provided, render custom content
  if (children) {
    return (
      <div
        className={cn("flex items-center justify-between", className)}
        style={{ maxWidth }}
      >
        {children}
      </div>
    );
  }

  // Default header rendering
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      style={{ maxWidth }}
    >
      <div
        className={cn("flex items-center gap-2", userInfoClassName, {
          "flex-row-reverse": isReversed,
        })}
      >
        {/* User */}
        {user && (
          <div
            className={cn(
              "flex items-center gap-2",
              isReversed && "flex-row-reverse"
            )}
          >
            <AvatarBase className="size-4">
              <AvatarImage src={String(user.profile_picture_url)} />
              <AvatarFallback
                className={cn("text-[8px]", getColorById(String(user.id)))}
              >
                {getInitials(String(user.username))}
              </AvatarFallback>
            </AvatarBase>
            <span className="text-sm font-medium">{user.username}</span>
          </div>
        )}

        {/* Status Text */}
        {statusText && (
          <span
            className={cn("text-muted-foreground text-xs", statusClassName)}
          >
            {statusText}
          </span>
        )}
      </div>
    </div>
  );
};

// ==============================================
// CONTENT COMPONENT
// ==============================================

type AppreciationContentProps = {
  children: React.ReactNode;
};

const AppreciationContent: FC<AppreciationContentProps> = ({ children }) => {
  const { alignment } = useAppreciationContext();

  return (
    <Card
      className={cn(
        "relative  py-4 my-2 px-4 rounded-md shadow-none gap-1 group group dark:bg-sidebar hover:bg-sidebar dark:hover:bg-[#232529ea] max-w-[49%]",
        alignment === "right" ? "ml-0 mr-4" : "ml-4 mr-0"
      )}
    >
      {children}
      <span
        className={cn(
          "border-l border-border w-[1px] h-full absolute  top-0",
          alignment === "right" ? "-right-2.5" : "-left-2.5"
        )}
      />
    </Card>
  );
};

// ==============================================
// SKELETON LOADING COMPONENTS
// ==============================================

const AppreciationHeaderLoading: FC = () => {
  const { isReversed, maxWidth } = useAppreciationContext();

  return (
    <div
      className={cn("flex items-center justify-between")}
      style={{ maxWidth }}
    >
      <div
        className={cn("flex items-center gap-2", {
          "flex-row-reverse": isReversed,
        })}
      >
        <div
          className={cn("flex items-center gap-2", {
            "flex-row-reverse": isReversed,
          })}
        >
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>

        <Skeleton className="h-2.5 w-20" />
      </div>
    </div>
  );
};

const AppreciationContentLoading: FC = () => {
  const { alignment } = useAppreciationContext();
  const renderTextLines = () => {
    return Array.from({ length: 2 }, (_, index) => (
      <Skeleton
        key={index}
        className={cn("h-3", index === 2 ? "w-3/4" : "w-full")}
      />
    ));
  };

  return (
    <Card
      className={cn(
        "relative py-4 my-2 px-4 rounded-md shadow-none gap-1 group dark:bg-sidebar hover:bg-sidebar dark:hover:bg-[#232529ea] min-w-[50%]",
        alignment === "right" ? "ml-0 mr-4" : "ml-4 mr-0"
      )}
    >
      <div className="space-y-3">
        {/* Title Skeleton */}
        <Skeleton className="h-4 w-2/3" />

        {/* Text Content Skeleton */}
        <div className="space-y-2">{renderTextLines()}</div>

        {/* Badges Skeleton */}
        <div>
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>
      {/* Line */}
      <span
        className={cn(
          "border-l border-border w-[1px] h-full absolute  top-0",
          alignment === "right" ? "-right-2.5" : "-left-2.5"
        )}
      />
    </Card>
  );
};

const AppreciationLoading: FC = () => {
  return (
    <AppreciationRoot>
      <AppreciationHeaderLoading />
      <AppreciationContentLoading />
    </AppreciationRoot>
  );
};

// ==============================================
// COMPOUND COMPONENT EXPORT
// ==============================================

export const Appreciation = Object.assign(AppreciationRoot, {
  Header: AppreciationHeader,
  Content: AppreciationContent,
  HeaderLoading: AppreciationHeaderLoading,
  ContentLoading: AppreciationContentLoading,
  Loading: AppreciationLoading,
});
