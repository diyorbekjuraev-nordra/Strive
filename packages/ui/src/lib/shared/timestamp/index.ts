import { pluralize } from "@/lib/utils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isTomorrow from "dayjs/plugin/isTomorrow";

dayjs.extend(customParseFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isTomorrow);

type FORMAT_TIMESTAMP = (date: Date) => string;

const formatTimestamp: FORMAT_TIMESTAMP = (date) => {
  if (isNaN(date.getTime())) return "Invalid date";
  const now = new Date();
  const diffInMilliseconds = now?.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return "Just Now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${pluralize("minute", diffInMinutes)} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${pluralize("hour", diffInHours)} ago`;
  } else if (diffInDays <= 7) {
    return `${diffInDays} ${pluralize("day", diffInDays)} ago`;
  } else {
    return `on ${date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}`;
  }
};

type DateFormatOptions = {
  /**
   * Custom format string (using dayjs format tokens)
   * @default 'MM/DD/YYYY'
   */
  format?: string;

  /**
   * If true, will return relative dates like 'Today', 'Yesterday', 'Tomorrow'
   * @default false
   */
  relative?: boolean;

  /**
   * If true, will capitalize the first letter of relative dates
   * @default true
   */
  capitalize?: boolean;
};

/**
 * Formats a date with flexible options
 * @param date - Date to format (Date, string, or number)
 * @param options - Formatting options
 * @returns Formatted date string
 *
 * @example
 * // Basic usage
 * formatDate(new Date()); // "06/15/2023"
 *
 * // With custom format
 * formatDate('2023-12-25', { format: 'MMMM D, YYYY' }); // "December 25, 2023"
 *
 * // Relative dates
 * formatDate(new Date(), { relative: true }); // "Today"
 * formatDate(dayjs().add(1, 'day').toDate(), { relative: true }); // "Tomorrow"
 *
 * // Lowercase relative dates
 * formatDate(new Date(), { relative: true, capitalize: false }); // "today"
 */
const formatDate = (
  date: Date | string | number,
  options: DateFormatOptions = {}
): string => {
  const {
    format = "MM/DD/YYYY",
    relative = false,
    capitalize = true,
  } = options;

  const dayjsDate = dayjs(date);

  if (!dayjsDate.isValid()) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("formatDate: Invalid date input", date);
    }
    return "Invalid date";
  }

  if (relative) {
    if (dayjsDate.isToday()) {
      return capitalize ? "Today" : "today";
    }

    if (dayjsDate.isYesterday()) {
      return capitalize ? "Yesterday" : "yesterday";
    }

    if (dayjsDate.isTomorrow()) {
      return capitalize ? "Tomorrow" : "tomorrow";
    }
  }

  return dayjsDate.format(format);
};

// utils/timeDiffToString.ts
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  startOfDay,
  subDays,
  endOfDay,
} from "date-fns";

/**
 * Converts two dates into a human-readable time difference.
 * @param from The starting date (usually now)
 * @param to The future target date
 * @returns A string like "5 minutes", "3 hours", "2 days", etc.
 */
function getHumanReadableTimeDiff(from: Date, to: Date): string {
  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("getHumanReadableTimeDiff: Invalid date(s)", { from, to });
    }
    return "0 minutes";
  }

  const minutes = Math.abs(differenceInMinutes(to, from));
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  }

  const hours = Math.abs(differenceInHours(to, from));
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  }

  const days = Math.abs(differenceInDays(to, from));
  if (days < 7) {
    return `${days} day${days === 1 ? "" : "s"}`;
  }

  const weeks = Math.abs(differenceInWeeks(to, from));
  if (days < 30) {
    return `${weeks} week${weeks === 1 ? "" : "s"}`;
  }

  const months = Math.abs(differenceInMonths(to, from));
  if (days < 365) {
    return `${months} month${months === 1 ? "" : "s"}`;
  }

  const years = Math.abs(differenceInYears(to, from));
  return `${years} year${years === 1 ? "" : "s"}`;
}

const getLast30Days = () => {
  return {
    from: startOfDay(subDays(new Date(), 30)),
    to: endOfDay(new Date()),
  };
};

export {
  formatTimestamp,
  formatDate,
  getHumanReadableTimeDiff,
  getLast30Days,
  type DateFormatOptions,
  type FORMAT_TIMESTAMP,
};
