import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps, FC } from "react";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {props.children}
    </NextThemesProvider>
  );
};
