import {
  ThemeProvider,
  type ThemeProviderProps,
} from "@/core/system/src/theme-provider";
import { TooltipProvider } from "@/library/Tooltip";
import { Toaster } from "@/library/Sonner";
import { ConfirmDialogProvider } from "@/library/ConfirmDialog";

type StriveProviderProps = ThemeProviderProps & {
  privacyUrl?: string;
  termsUrl?: string;
  helpUrl?: string;
};

export const StriveProvider = ({
  children,

  ...properties
}: StriveProviderProps) => (
  <ThemeProvider {...properties}>
    <TooltipProvider>
      <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
    </TooltipProvider>
    <Toaster />
  </ThemeProvider>
);
