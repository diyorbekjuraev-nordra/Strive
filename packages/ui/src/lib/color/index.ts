const colors = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
];

export const getDeterministicColor = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return colors[Math.abs(hash) % colors.length];
};

export const DEFAULT_COLOR_CLASSES = [
  "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
  "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300",
  "bg-lime-100 text-lime-700 dark:bg-lime-500/20 dark:text-lime-300",
  "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
  "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
  "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  "bg-gray-200 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300",
  "bg-emerald-100 text-emerald-700 dark:bg-green-500/20 dark:text-green-400",
  "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300",
  "bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-white",
];

export function getColorById(id: string, colorClasses = DEFAULT_COLOR_CLASSES) {
  let hash = 0;
  for (let i = 0; i < id?.length; i++) {
    hash = id?.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colorClasses.length;
  return colorClasses[index];
}

/**
 * Generates a random OKLCH color string
 * @param options Optional configuration for the color generation
 * @returns A string in the format 'oklch(L% C H)'
 */
export function getRandomOklchColor(options?: {
  minLightness?: number; // 0-100
  maxLightness?: number; // 0-100
  minChroma?: number; // 0-0.5 (recommended range for sRGB)
  maxChroma?: number; // 0-0.5
}): string {
  const {
    minLightness = 30,
    maxLightness = 90,
    minChroma = 0.05,
    maxChroma = 0.2,
  } = options || {};

  // Generate random values within specified ranges
  const L = Math.floor(
    Math.random() * (maxLightness - minLightness + 1) + minLightness
  );
  const C = (Math.random() * (maxChroma - minChroma) + minChroma).toFixed(3);
  const H = Math.floor(Math.random() * 360);

  return `oklch(${L}% ${C} ${H})`;
}

/**
 * Generates a consistent OKLCH color based on a given ID string
 * @param id The input string to hash (e.g., user ID or type)
 * @param options Optional bounds for OKLCH values
 * @returns A string in the format 'oklch(L% C H)'
 */
export function getHashedOklchColor(
  id: string,
  options?: {
    minLightness?: number; // 0–100
    maxLightness?: number; // 0–100
    minChroma?: number; // 0–0.5 (sRGB-safe)
    maxChroma?: number; // 0–0.5
  }
): string {
  const {
    minLightness = 30,
    maxLightness = 90,
    minChroma = 0.05,
    maxChroma = 0.2,
  } = options || {};

  // Simple hash function (djb2)
  let hash = 5381;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 33) ^ id.charCodeAt(i);
  }

  const normalized = Math.abs(hash);

  // Map hash to values
  const L = (normalized % (maxLightness - minLightness + 1)) + minLightness;

  const chromaRange = maxChroma - minChroma;
  const C = ((normalized % 1000) / 1000) * chromaRange + minChroma;

  const H = normalized % 360;

  return `oklch(${L}% ${C.toFixed(3)} ${H})`;
}
