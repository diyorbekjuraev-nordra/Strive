import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/library/Skeleton";
import { Button, type ButtonProps } from "@/library/Button";
import { Camera } from "lucide-react";

interface AvatarUploadLoadingProps {
  className?: string;
  uploadButtonProps?: ButtonProps;
  variant?: "rounded" | "circle";
}

const AvatarUploadLoading = ({
  className,
  uploadButtonProps,
  variant = "rounded",
}: Readonly<AvatarUploadLoadingProps>) => {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Avatar Preview */}
      <div className="relative flex items-center gap-2">
        <Skeleton
          className={cn(
            "size-[72px] rounded-2xl",
            variant === "circle" && "rounded-full"
          )}
        />

        {/* Remove Button - only show when file is uploaded */}

        <div className="space-y-1">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-4 w-[170px] rounded" />
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              prepend={<Camera />}
              isDisabled
              {...uploadButtonProps}
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AvatarUploadLoading };
