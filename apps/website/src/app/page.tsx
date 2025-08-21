"use client";
import { InlineSelect } from "@ebrai/strive";
import { useMemo, useState } from "react";

import moment from "moment-timezone";
const timeZones = moment.tz.names();

export const timezones = timeZones.map((tz) => ({
  label: `${tz} (GMT${moment.tz(tz).format("Z")})`,
  value: tz,
}));

export const getTimezone = (): string => {
  return moment.tz.guess(); // Example: "Asia/Tashkent"
};


export default function Home() {
  const [timeZoneSearch, setTimeZoneSearch] = useState<string>("");
  const [changes, setChanges] = useState<Partial<any> | null>(null);
  const selectedTimeZone = useMemo(() => {
    return timezones.find(
      (tz) => tz.value === (changes?.timezone || getTimezone())
    );
  }, [getTimezone(), changes?.timezone]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <InlineSelect
        
          options={timezones.filter((tz) =>
            tz.label.toLowerCase().includes(timeZoneSearch.toLowerCase())
          )}
          trigger={
            <div className="flex items-center gap-1 h-fit">
              <h3 className="text-sm">{selectedTimeZone?.label}</h3>
            </div>
          }
          itemRenderer={(option) => {
            return (
              <div className="w-full h-full flex items-center gap-2">
                <h3 className="text-sm truncate break-all line-clamp-1 whitespace-pre-line">
                  {option?.label}
                </h3>
              </div>
            );
          }}
          itemActive={(option) => {
            return Boolean(option?.value === selectedTimeZone?.value);
          }}
          onSelect={(option) => {
            setChanges((prev) => ({
              ...prev,
              timezone: option?.value,
            }));
          }}
          inputProps={{
            onChange: (e) => {
              setTimeZoneSearch(e.target.value);
            },
          }}
          triggerClassName="border rounded-md"
        />
      </main>
    </div>
  );
}
