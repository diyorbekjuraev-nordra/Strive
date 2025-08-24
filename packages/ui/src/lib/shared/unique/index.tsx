import { v4 } from "uuid";

// Define a type for the generated ID objects
type UniqueIdObject = { id: string };

// Define a type alias for the function return type
type GenerateUniqueIds = UniqueIdObject[];

/**
 * Generates an array of objects with unique IDs.
 *
 * @param times - The number of unique ID objects to generate.
 * @param label - An optional prefix label for the unique IDs.
 * @returns An array of objects, each containing a unique ID.
 */
const generateUniqueIds = (times: number): GenerateUniqueIds => {
  return Array.from({ length: times }).map(() => ({ id: v4() }));
};

const deduplicateById = <T extends { id: string }>(array: T[]): T[] => {
  const seen = new Set<string>();
  return array.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

const normalizeEmails = (emails: (string | undefined)[]) => {
  const seen = new Set<string>();
  return emails
    .map((e) => (e ?? "").trim().toLowerCase())
    .filter(Boolean)
    .filter((e) => {
      if (seen.has(e)) return false;
      seen.add(e);
      return true;
    });
};

export { generateUniqueIds, deduplicateById, normalizeEmails };
