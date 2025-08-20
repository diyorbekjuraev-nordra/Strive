"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import {
  useSeparator,
  type UseSeparatorProps as SeparatorProps,
} from "./use-separator";

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  const { getSeparatorProps } = useSeparator({
    orientation,
    decorative,
    className,
    ...props,
  });

  return <SeparatorPrimitive.Root {...getSeparatorProps()} />;
}
