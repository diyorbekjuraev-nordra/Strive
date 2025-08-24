export {
  getDeterministicColor,
  getRandomOklchColor,
  getHashedOklchColor,
  getColorById,
} from "./color";

export {
  pluralize,
  getInitials,
  cn,
  formatToTitleCase,
  removeUndefinedValuesFromObj,
  copyMsg,
  deepCleanChanges,
  getChangedFields,
  ordinalSuffix,
} from "./utils";

export { ClickOutside, type ClickOutsideProps } from "./shared/click-outside";
export { VisuallyHidden } from "./shared/visually-hidden";
export {
  LAYER_LEVEL,
  MAX_LEVEL,
  MIN_LEVEL,
  LAYER_CLASSNAMES,
  levels,
} from "./shared/layer";
export { StriveProvider } from "./providers";

export { useColors } from "./hooks/useColors";
export { useFileUpload } from "./hooks/useFileUpload";
export { useIsMobile } from "./hooks/useIsMobile";
export { useMatchMedia } from "./hooks/useMatchMedia";

export {
  composeEventHandlers,
  composeRefs,
  useComposedRefs,
} from "./shared/composition/composition";

export {
  formatTimestamp,
  formatDate,
  getHumanReadableTimeDiff,
  getLast30Days,
  type DateFormatOptions,
  type FORMAT_TIMESTAMP,
} from "./shared/timestamp";

export {
  generateUniqueIds,
  deduplicateById,
  normalizeEmails,
} from "./shared/unique";

export {
  ConditionalWrapper,
  type ConditionalWrapperProps,
} from "./shared/conditional-wrapper";
