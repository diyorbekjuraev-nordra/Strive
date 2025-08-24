"use client";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "@/library/ThemeSwitcher";
import { useState } from "react";
import { InlineRecordRenderer } from "@/library/Inline/src/record-renderer/inline-record-renderer";
import { Badge } from "@/library/Badge";
import { ExpandableText } from "@/library/Inline/src/expandable-text/expandable-text";
import { RecordPill } from "@/library/RecordPill";
import { Button } from "@/library/Button";

type AppUser = {
  id: number;
  username: string;
};

const Page = () => {
  const { theme, setTheme } = useTheme();
  const [options, setOptions] = useState<AppUser[]>([
    {
      id: 1,
      username: "Diyorbek",
    },
    {
      id: 2,
      username: "Diyorbek",
    },
    {
      id: 3,
      username: "Diyorbek",
    },
    {
      id: 4,
      username: "Diyorbek",
    },
    {
      id: 5,
      username: "Diyorbek",
    },
    {
      id: 6,
      username: "Diyorbek",
    },
    {
      id: 7,
      username: "Diyorbek",
    },
    {
      id: 8,
      username: "Diyorbek",
    },
    {
      id: 9,
      username: "Diyorbek",
    },
    {
      id: 10,
      username: "Diyorbek",
    },
  ]);
  const [state, setState] = useState(false);

  return (
    <div className="relative flex   m-4 space-x-4">
      <Button variant="ghost" onClick={() => setState(!state)}>Click</Button>
      {/* <InlineRecordRenderer<AppUser>
        debug
        minVisibleItems={1}
        classNames={{ container: "translate-y-20" }}
        records={options}
        renderItem={(option) => {
          return <Badge>{option?.username}</Badge>;
        }}
        isExpandable
      /> */}

      <div className="translate-y-20 w-full">
        <RecordPill id={"2"} label="Diyorbek Juraev" />
      </div>
      {/* Switcher */}
      <div className="absolute bottom-0 right-4">
        <ThemeSwitcher
          value={theme as "light" | "dark" | "system"}
          onChange={setTheme}
        />
      </div>
    </div>
  );
};

export default Page;
