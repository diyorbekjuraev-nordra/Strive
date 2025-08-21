"use client";

import {
  formatBytes,
  useFileUpload,
  type FileWithPreview,
} from "@/lib/hooks/useFileUpload";
import { Alert, AlertDescription, AlertTitle } from "@/library/Alert";
import { Button, type ButtonProps } from "@/library/Button";
import { Camera, Trash, TriangleAlert } from "lucide-react";
import { Typography } from "@/library/Typography";
import { cn } from "@/lib/utils";
import { AvatarBase, AvatarFallback } from "@/library/Avatar";

interface AvatarUploadProps {
  maxSize?: number;
  className?: string;
  onFileChange?: (file: FileWithPreview | null) => void;
  defaultAvatar?: string;
  name?: string;
  variant?: "rounded" | "circle";
  title?: string;
  shortDescription?: string;
  removeButtonProps?: ButtonProps;
  uploadButtonProps?: ButtonProps;
}

function AvatarUpload({
  maxSize = 2 * 1024 * 1024, // 2MB
  className,
  onFileChange,
  defaultAvatar,
  name,
  variant = "rounded",
  title = "Profile Picture",
  shortDescription = "We only support PNGs, JPEGs and GIFs under",
  removeButtonProps,
  uploadButtonProps,
}: Readonly<AvatarUploadProps>) {
  const [
    { files, isDragging, errors },
    {
      removeFile,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept: "image/*",
    multiple: false,
    onFilesChange: (files) => {
      onFileChange?.(files[0] || null);
    },
  });

  const avatarClassName = cn(
    "size-[72px] rounded-2xl",
    variant === "circle" && "rounded-full"
  );

  const currentFile = files[0];
  const previewUrl = currentFile?.preview || defaultAvatar;

  const handleRemove = () => {
    if (currentFile) {
      removeFile(currentFile.id);
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Avatar Preview */}
      <div className="relative flex items-center gap-2">
        <AvatarBase className={avatarClassName}>
          <div
            className={cn(
              "group/avatar size-[72px] relative cursor-pointer overflow-hidden border border-dashed transition-colors group",
              isDragging
                ? "border-[var(--interactive)] bg-[var(--interactive)/5]"
                : "border-muted-foreground/25 hover:border-muted-foreground/20",
              previewUrl && "border-solid",
              variant === "circle" ? "rounded-full" : "rounded-2xl"
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={openFileDialog}
            role="button"
            tabIndex={0}
            aria-label="Upload avatar"
            aria-describedby="avatar-upload-description"
            aria-pressed={isDragging}
            aria-disabled={isDragging}
            aria-live="polite"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openFileDialog();
              }
            }}
          >
            <input {...getInputProps()} className="sr-only" />

            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Avatar"
                className="h-full w-full object-cover group-hover:opacity-70 opacity-100 transition-opacity duration-300"
              />
            ) : (
              <AvatarFallback
                color="primary"
                className={cn(
                  "flex size-[72px] h-full w-full text-2xl items-center justify-center group-hover:opacity-0 opacity-100 transition-opacity duration-300 bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
                  variant === "circle" ? "rounded-full" : "rounded-2xl"
                )}
              >
                {name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
            <div className="absolute inset-0 flex items-center justify-center object-cover group-hover:opacity-100 opacity-0 transition-opacity duration-300">
              <Camera className="size-6" width={24} height={24} color="#ccc" />
            </div>
          </div>
        </AvatarBase>

        {/* Remove Button - only show when file is uploaded */}

        <div className="space-y-0.5">
          <div>
            <Typography as="p" color="primary" className="text-sm font-medium">
              {title}
            </Typography>
            <Typography as="p" color="secondary" className="text-xs">
              {shortDescription} {formatBytes(maxSize)}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={openFileDialog}
              prepend={<Camera />}
              {...uploadButtonProps}
            >
              Upload
            </Button>
            {currentFile && (
              <Button
                variant="destructive-outline"
                onClick={handleRemove}
                className="size-6"
                hasIconOnly
                aria-label="Remove avatar"
                {...removeButtonProps}
              >
                <Trash className="size-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Upload Instructions */}

      {/* Error Messages */}
      {errors?.length > 0 && (
        <Alert variant="destructive" className="mt-2">
          <TriangleAlert />
          <AlertTitle>File upload error(s)</AlertTitle>
          <AlertDescription>
            {errors?.map((error, index) => (
              <p key={index} className="last:mb-0">
                {error}
              </p>
            ))}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export { AvatarUpload, type AvatarUploadProps };
