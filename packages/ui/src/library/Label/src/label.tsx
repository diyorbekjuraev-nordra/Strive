"use client";
import { useLabel, type UseLabelProps as LabelProps } from "./use-label";

export const Label = (props: LabelProps) => {
  const {
    Component,
    children,
    getLabelProps,
    getRequiredIndicatorProps, 
    required,
  } = useLabel(props);

  return (
    <Component {...getLabelProps()}>
      {children}
      {required && (
        <span {...getRequiredIndicatorProps()} aria-hidden="true">
          *
        </span>
      )}
    </Component>
  );
};
