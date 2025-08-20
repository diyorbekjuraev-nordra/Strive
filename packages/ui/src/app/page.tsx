"use client";
import { useTheme } from "next-themes";

import { ThemeSwitcher } from "@/library/ThemeSwitcher";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/library/Accordion";
import {
  ActivityContainer,
  Log,
  LogHeader,
  LogContent,
} from "@/library/ActivityLog";

const Page = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="relative flex h-screen m-4 space-x-4">
      <div className="w-[400px]">
        <ActivityContainer badgeContent="Badge">
          <Log>
            <LogHeader>Header</LogHeader>
            <LogContent>Content</LogContent>
          </Log>
        </ActivityContainer>
      </div>
      {/* Switcher */}
      <div className="absolute top-4 right-4">
        <ThemeSwitcher
          value={theme as "light" | "dark" | "system"}
          onChange={setTheme}
        />
      </div>
    </div>
  );
};

export default Page;
