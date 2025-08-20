"use client";
import * as React from "react";
import { CardLayer, useCard, UseCardProps } from "./use-card";

// Individual component interfaces
export interface CardProps extends UseCardProps {}

export interface CardSubComponentProps extends React.ComponentProps<"div"> {
  layer?: CardLayer;
}

// Main Card component
export function Card({ children, ...props }: CardProps) {
  const { getCardProps } = useCard(props);

  return <div {...getCardProps()}>{children}</div>;
}

// Sub-components that can optionally use the hook context or standalone
export function CardHeader({
  className,
  layer = 1,
  ...props
}: Readonly<CardSubComponentProps>) {
  const { getHeaderProps } = useCard({
    layer,
    classNames: { header: className },
  });

  return <div {...getHeaderProps(props)} />;
}

export function CardTitle({
  className,
  layer = 1,
  ...props
}: Readonly<CardSubComponentProps>) {
  const { getTitleProps } = useCard({
    layer,
    classNames: { title: className },
  });

  return <div {...getTitleProps(props)} />;
}

export function CardDescription({
  className,
  layer = 1,
  ...props
}: Readonly<CardSubComponentProps>) {
  const { getDescriptionProps } = useCard({
    layer,
    classNames: { description: className },
  });

  return <div {...getDescriptionProps(props)} />;
}

export function CardAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { getActionProps } = useCard({ classNames: { action: className } });

  return <div {...getActionProps(props)} />;
}

export function CardContent({
  className,
  layer = 1,
  ...props
}: Readonly<CardSubComponentProps>) {
  const { getContentProps } = useCard({
    layer,
    classNames: { content: className },
  });

  return <div {...getContentProps(props)} />;
}

export function CardFooter({
  className,
  layer = 1,
  ...props
}: Readonly<CardSubComponentProps>) {
  const { getFooterProps } = useCard({
    layer,
    classNames: { footer: className },
  });

  return <div {...getFooterProps(props)} />;
}

// Alternative: Compound component approach using context
export const CardContext = React.createContext<ReturnType<
  typeof useCard
> | null>(null);

export function CardProvider({ children, ...props }: CardProps) {
  const card = useCard(props);

  return (
    <CardContext.Provider value={card}>
      <div {...card.getCardProps()}>{children}</div>
    </CardContext.Provider>
  );
}

// Hook to use card context
export const useCardContext = () => {
  const context = React.useContext(CardContext);
  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }
  return context;
};

// Context-aware components (alternative approach)
export function CardHeaderWithContext({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { getHeaderProps } = useCardContext();

  return <div {...getHeaderProps({ className, ...props })} />;
}

export function CardTitleWithContext({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { getTitleProps } = useCardContext();

  return <div {...getTitleProps({ className, ...props })} />;
}

export function CardDescriptionWithContext({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { getDescriptionProps } = useCardContext();

  return <div {...getDescriptionProps({ className, ...props })} />;
}

export function CardActionWithContext({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { getActionProps } = useCardContext();

  return <div {...getActionProps({ className, ...props })} />;
}

export function CardContentWithContext({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { getContentProps } = useCardContext();

  return <div {...getContentProps({ className, ...props })} />;
}

export function CardFooterWithContext({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { getFooterProps } = useCardContext();

  return <div {...getFooterProps({ className, ...props })} />;
}
