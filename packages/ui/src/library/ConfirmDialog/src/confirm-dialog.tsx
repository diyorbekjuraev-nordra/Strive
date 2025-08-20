"use client";
import React, {
  useState,
  useCallback,
  useMemo,
  useContext,
  createContext,
  memo,
} from "react";
import { type ReactNode, type ComponentPropsWithRef } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@/library/AlertDialog";
import { Button } from "@/library/Button";

export interface CustomActionsProps {
  confirm: () => void;
  cancel: () => void;
  config: ConfirmOptions;
  setConfig: ConfigUpdater;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export type ConfigUpdater = (
  config: ConfirmOptions | ((prev: ConfirmOptions) => ConfirmOptions)
) => void;

export type LegacyCustomActions = (
  onConfirm: () => void,
  onCancel: () => void
) => ReactNode;

export type EnhancedCustomActions = (props: CustomActionsProps) => ReactNode;

export interface ConfirmResult {
  confirmed: boolean;
  close: () => void;
}

export interface ConfirmOptions {
  title?: ReactNode;
  description?: ReactNode;
  contentSlot?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  loadingIcon?: ReactNode;
  disableCancelOnLoading?: boolean;
  customActions?: LegacyCustomActions | EnhancedCustomActions;
  confirmButton?: ComponentPropsWithRef<typeof Button>;
  cancelButton?: ComponentPropsWithRef<typeof Button> | null;
  alertDialogOverlay?: ComponentPropsWithRef<typeof AlertDialogOverlay>;
  alertDialogContent?: ComponentPropsWithRef<typeof AlertDialogContent>;
  alertDialogHeader?: ComponentPropsWithRef<typeof AlertDialogHeader>;
  alertDialogTitle?: ComponentPropsWithRef<typeof AlertDialogTitle>;
  alertDialogDescription?: ComponentPropsWithRef<typeof AlertDialogDescription>;
  alertDialogFooter?: ComponentPropsWithRef<typeof AlertDialogFooter>;
}

export interface ConfirmDialogState {
  isOpen: boolean;
  config: ConfirmOptions;
  resolver: ((value: ConfirmResult) => void) | null;
  isLoading: boolean;
}

export interface ConfirmContextValue {
  confirm: ConfirmFunction;
  updateConfig: ConfigUpdater;
  setLoading: (loading: boolean) => void;
}

export interface ConfirmFunction {
  (options: ConfirmOptions): Promise<ConfirmResult>;
  updateConfig?: ConfigUpdater;
  setLoading?: (loading: boolean) => void;
}

export const ConfirmContext = createContext<ConfirmContextValue | undefined>(
  undefined
);

const baseDefaultOptions: ConfirmOptions = {
  title: "",
  description: "",
  confirmText: "Confirm",
  cancelText: "Cancel",
  loadingText: "Loading...",
  loadingIcon: null,
  disableCancelOnLoading: true,
  confirmButton: {},
  cancelButton: {},
  alertDialogContent: {},
  alertDialogHeader: {},
  alertDialogTitle: {},
  alertDialogDescription: {},
  alertDialogFooter: {},
};

function isLegacyCustomActions(
  fn: LegacyCustomActions | EnhancedCustomActions
): fn is LegacyCustomActions {
  return fn.length === 2;
}

const ConfirmDialogContent: React.FC<{
  config: ConfirmOptions;
  onConfirm: () => void;
  onCancel: () => void;
  setConfig: (
    config: ConfirmOptions | ((prev: ConfirmOptions) => ConfirmOptions)
  ) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}> = memo(
  ({ config, onConfirm, onCancel, setConfig, isLoading, setLoading }) => {
    const {
      title,
      description,
      cancelButton,
      confirmButton,
      confirmText,
      cancelText,
      loadingText,
      loadingIcon,
      disableCancelOnLoading,
      icon,
      contentSlot,
      customActions,
      alertDialogOverlay,
      alertDialogContent,
      alertDialogHeader,
      alertDialogTitle,
      alertDialogDescription,
      alertDialogFooter,
    } = config;

    const effectiveLoading = isLoading || config.isLoading || false;
    const shouldDisableCancel = effectiveLoading && disableCancelOnLoading;

    const renderActions = () => {
      if (!customActions) {
        return (
          <>
            {cancelButton !== null && (
              <Button
                onClick={onCancel}
                disabled={shouldDisableCancel}
                variant="outline"
                {...cancelButton}
              >
                {cancelText}
              </Button>
            )}
            <Button
              onClick={onConfirm}
              disabled={effectiveLoading}
              variant="default"
              isLoading={effectiveLoading}
              loadingContent={loadingText}
              loadingIndicator={loadingIcon}
              {...confirmButton}
            >
              {confirmText}
            </Button>
          </>
        );
      }

      if (isLegacyCustomActions(customActions)) {
        return customActions(onConfirm, onCancel);
      }

      return customActions({
        confirm: onConfirm,
        cancel: onCancel,
        config,
        setConfig,
        isLoading: effectiveLoading,
        setLoading,
      });
    };

    const renderTitle = () => {
      if (!title && !icon) {
        return null;
      }

      return (
        <AlertDialogTitle {...alertDialogTitle}>
          {icon}
          {title}
        </AlertDialogTitle>
      );
    };

    return (
      <AlertDialogPortal>
        <AlertDialogOverlay {...alertDialogOverlay} />
        <AlertDialogContent {...alertDialogContent}>
          <AlertDialogHeader {...alertDialogHeader}>
            {renderTitle()}
            {description && (
              <AlertDialogDescription {...alertDialogDescription}>
                {description}
              </AlertDialogDescription>
            )}
            {contentSlot}
          </AlertDialogHeader>
          <AlertDialogFooter {...alertDialogFooter}>
            {renderActions()}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    );
  }
);

ConfirmDialogContent.displayName = "ConfirmDialogContent";

const ConfirmDialog: React.FC<{
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  config: ConfirmOptions;
  onConfirm: () => void;
  onCancel: () => void;
  setConfig: (
    config: ConfirmOptions | ((prev: ConfirmOptions) => ConfirmOptions)
  ) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}> = memo(
  ({
    isOpen,
    onOpenChange,
    config,
    onConfirm,
    onCancel,
    setConfig,
    isLoading,
    setLoading,
  }) => (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <ConfirmDialogContent
        config={config}
        onConfirm={onConfirm}
        onCancel={onCancel}
        setConfig={setConfig}
        isLoading={isLoading}
        setLoading={setLoading}
      />
    </AlertDialog>
  )
);

ConfirmDialog.displayName = "ConfirmDialog";

export const ConfirmDialogProvider: React.FC<{
  defaultOptions?: ConfirmOptions;
  children: React.ReactNode;
}> = ({ defaultOptions = {}, children }) => {
  const [dialogState, setDialogState] = useState<ConfirmDialogState>({
    isOpen: false,
    config: baseDefaultOptions,
    resolver: null,
    isLoading: false,
  });

  const mergedDefaultOptions = useMemo(
    () => ({
      ...baseDefaultOptions,
      ...defaultOptions,
    }),
    [defaultOptions]
  );

  const updateConfig = useCallback(
    (
      newConfig: ConfirmOptions | ((prev: ConfirmOptions) => ConfirmOptions)
    ) => {
      setDialogState((prev) => ({
        ...prev,
        config:
          typeof newConfig === "function"
            ? newConfig(prev.config)
            : { ...prev.config, ...newConfig },
      }));
    },
    []
  );

  const setLoading = useCallback((loading: boolean) => {
    setDialogState((prev) => ({
      ...prev,
      isLoading: loading,
    }));
  }, []);

  const closeDialog = useCallback(() => {
    setDialogState((prev) => ({
      ...prev,
      isOpen: false,
      resolver: null,
      isLoading: false,
    }));
  }, []);

  const confirm = useCallback(
    (options: ConfirmOptions) => {
      setDialogState((prev) => ({
        isOpen: true,
        config: { ...mergedDefaultOptions, ...options },
        resolver: prev.resolver,
        isLoading: false,
      }));
      return new Promise<ConfirmResult>((resolve) => {
        setDialogState((prev) => ({
          ...prev,
          resolver: resolve,
        }));
      });
    },
    [mergedDefaultOptions]
  );

  const handleConfirm = useCallback(() => {
    setDialogState((prev) => {
      if (prev.resolver) {
        prev.resolver({
          confirmed: true,
          close: closeDialog,
        });
      }
      return prev; // Don't close automatically - let user control it
    });
  }, [closeDialog]);

  const handleCancel = useCallback(() => {
    setDialogState((prev) => {
      if (prev.resolver) {
        prev.resolver({
          confirmed: false,
          close: closeDialog,
        });
      }
      return {
        ...prev,
        isOpen: false,
        resolver: null,
        isLoading: false,
      };
    });
  }, [closeDialog]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open && !dialogState.isLoading) {
        handleCancel();
      }
    },
    [handleCancel, dialogState.isLoading]
  );

  const contextValue = useMemo(
    () => ({
      confirm,
      updateConfig,
      setLoading,
    }),
    [confirm, updateConfig, setLoading]
  );

  return (
    <ConfirmContext.Provider value={contextValue}>
      {children}
      <ConfirmDialog
        isOpen={dialogState.isOpen}
        onOpenChange={handleOpenChange}
        config={dialogState.config}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        setConfig={updateConfig}
        isLoading={dialogState.isLoading}
        setLoading={setLoading}
      />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmDialogProvider");
  }

  const { confirm, updateConfig, setLoading } = context;

  const enhancedConfirm = confirm;
  enhancedConfirm.updateConfig = updateConfig;
  enhancedConfirm.setLoading = setLoading;

  return enhancedConfirm as ConfirmFunction & {
    updateConfig: ConfirmContextValue["updateConfig"];
    setLoading: ConfirmContextValue["setLoading"];
  };
};
