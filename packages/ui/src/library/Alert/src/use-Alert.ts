import { useCallback, useMemo, type ReactNode } from "react";
export type PropGetter<T = Record<string, any>> = (props?: T) => T;

export interface UseAlertProps {
  startContent?: ReactNode;

  endContent?: ReactNode;

  /**
   * Whether the alert is visible.
   * @default false
   */
  isVisible?: boolean;

  /**
   * Icon to be displayed in the alert - overrides the default icon
   */
  icon?: ReactNode;

  status?: "warning" | "success" | "error" | "info";

  customIcon?: ReactNode;

  classNames?: {
    base?: string;
    content?: string;
    iconWrapper?: string;
  };
}

export const useAlertProps = (props: UseAlertProps) => {
  const { classNames } = props;

  const slots = useMemo(
    () => ({
      base: [].filter(Boolean).join(" "),
      content: [classNames?.content].filter(Boolean).join(" "),
    }),
    [classNames?.content]
  );

  const getIconWrapperProps = useCallback<PropGetter>(
    () => ({
      className: "",
    }),
    [slots]
  );

  const getAlertIconProps = useCallback<PropGetter>(
    () => ({
      className: "",
    }),
    [slots]
  );

  return {
    getIconWrapperProps,
    getAlertIconProps,
  };
};
