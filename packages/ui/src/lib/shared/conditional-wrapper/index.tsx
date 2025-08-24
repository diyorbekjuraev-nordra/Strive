import { JSX } from "react";

interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: (children: React.ReactNode) => JSX.Element;
  children: React.ReactNode;
}

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) =>
  condition ? wrapper(children) : <>{children}</>;

export { ConditionalWrapper, type ConditionalWrapperProps };
