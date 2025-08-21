"use client";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "@/library/ThemeSwitcher";
import { EmojiPicker } from "@/library/EmojiPicker";
import {
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
} from "@/library/EmojiPicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/library/Popover";
import { Button } from "@/library/Button";
import { useState } from "react";

const Page = () => {
  const { theme, setTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [emoji, setEmoji] = useState<string | null>(null);

  return (
    <div className="relative flex h-screen m-4 space-x-4">
      <div className="flex items-center gap-1 w-1/2">
        <Popover>
          <PopoverTrigger >
            <Button>Open emoji picker {emoji}</Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0 overflow-hidden" align="start">
            <EmojiPicker
              className="h-[342px]"
              onEmojiSelect={({ emoji, label }) => {
                setIsOpen(false);
                setEmoji(emoji ?? null);
              }}
            >
              <EmojiPickerSearch />
              <EmojiPickerContent />
              <EmojiPickerFooter />
            </EmojiPicker>
          </PopoverContent>
        </Popover>
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
