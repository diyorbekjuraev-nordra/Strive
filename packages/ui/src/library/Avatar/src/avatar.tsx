"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@/lib/utils";
import { AvatarImage } from "./avatar-image";
import { AvatarFallback } from "./avatar-fallback";
import { AvatarProps, useAvatar } from "./use-avatar";

export function AvatarBase({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

export const Avatar = (props: AvatarProps) => {
  const { getBaseProps, getImgProps, getFallbackProps } = useAvatar(props);
  return (
    <AvatarBase {...getBaseProps()}>
      <AvatarImage {...getImgProps()} />
      <AvatarFallback {...getFallbackProps()} />
    </AvatarBase>
  );
};
