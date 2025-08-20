import React, { forwardRef } from "react";
import { ExternalLink } from "lucide-react";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Whether the link is external
   * @default false
   */
  isExternal?: boolean;
  /**
   * Whether to show the external link icon
   * @default false
   */
  showAnchorIcon?: boolean;
  /**
   * Custom anchor icon component
   */
  anchorIcon?: React.ReactNode;
  /**
   * Link variant styles
   */
  variant?: "default";
  /**
   * Link size
   */
  size?: "sm" | "md" | "lg";
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      isExternal = false,
      showAnchorIcon = false,
      anchorIcon = <ExternalLink className="inline w-4 h-4 ml-1" />,
      variant = "default",
      size = "md",
      className = "",
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    // Variant styles
    const variantStyles = {
      default:
        "text-[var(--link-primary)] hover:text-[var(--link-primary-hover)] hover:underline focus:ring-[var(--link-primary)]",
    };

    // Size styles
    const sizeStyles = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    const combinedClassName = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className,
    ].join(" ");

    // Handle external link props
    const externalProps = isExternal
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

    return (
      <a ref={ref} className={combinedClassName} {...externalProps} {...props}>
        {children}
        {showAnchorIcon && anchorIcon}
      </a>
    );
  }
);

Link.displayName = "Link";
