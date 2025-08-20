type TEXT_COLOR_VARIANTS =
  | "primary"
  | "secondary"
  | "placeholder"
  | "on-color"
  | "on-color-disabled"
  | "helper"
  | "error"
  | "inverse"
  | "disabled";

type LINK_COLOR_VARIANTS =
  | "primary"
  | "primary-hover"
  | "secondary"
  | "inverse"
  | "inverse-hover"
  | "helper"
  | "error"
  | "inverse-active"
  | "inverse-visited"
  | "visited";

type ICON_COLOR_VARIANTS =
  | "primary"
  | "secondary"
  | "on-color"
  | "on-color-disabled"
  | "interactive"
  | "inverse"
  | "disabled";

type BORDER_COLOR_VARIANTS =
  | "default"
  | "subtle-00"
  | "subtle-01"
  | "subtle-02"
  | "subtle-03"
  | "strong-01"
  | "strong-02"
  | "strong-03"
  | "tile-01"
  | "tile-02"
  | "inverse"
  | "tile-03"
  | "interactive"
  | "disabled";

type STATUS_VARIANTS = "success" | "warning" | "error" | "info";

enum BORDER_COLOR_VARIANT_ENUM {
  DEFAULT = "var(--border-00)",
  SUBTLE_00 = "var(--border-subtle-00)",
  SUBTLE_01 = "var(--border-subtle-01)",
  SUBTLE_02 = "var(--border-subtle-02)",
  SUBTLE_03 = "var(--border-subtle-03)",
  STRONG_01 = "var(--border-strong-01)",
  STRONG_02 = "var(--border-strong-02)",
  STRONG_03 = "var(--border-strong-03)",
  TILE_01 = "var(--border-tile-01)",
  TILE_02 = "var(--border-tile-02)",
  TILE_03 = "var(--border-tile-03)",
  INVERSE = "var(--border-inverse)",
  INTERACTIVE = "var(--border-interactive)",
  DISABLED = "var(--border-disabled)",
}

enum TEXT_COLOR_VARIANT_ENUM {
  PRIMARY = "var(--text-primary)",
  SECONDARY = "var(--text-secondary)",
  PLACEHOLDER = "var(--text-placeholder)",
  ON_COLOR = "var(--text-on-color)",
  ON_COLOR_DISABLED = "var(--text-on-color-disabled)",
  HELPER = "var(--text-helper)",
  ERROR = "var(--text-error)",
  INVERSE = "var(--text-inverse)",
  DISABLED = "var(--text-disabled)",
}

enum LINK_COLOR_VARIANT_ENUM {
  PRIMARY = "var(--link-primary)",
  PRIMARY_HOVER = "var(--link-primary-hover)",
  SECONDARY = "var(--link-secondary)",
  INVERSE = "var(--link-inverse)",
  INVERSE_HOVER = "var(--link-inverse-hover)",
  HELPER = "var(--link-helper)",
  ERROR = "var(--link-error)",
  INVERSE_ACTIVE = "var(--link-inverse-active)",
  INVERSE_VISITED = "var(--link-inverse-visited)",
  VISITED = "var(--link-visited)",
}

enum ICON_COLOR_VARIANT_ENUM {
  PRIMARY = "var(--icon-primary)",
  SECONDARY = "var(--icon-secondary)",
  ON_COLOR = "var(--icon-on-color)",
  ON_COLOR_DISABLED = "var(--icon-on-color-disabled)",
  INTERACTIVE = "var(--icon-interactive)",
  INVERSE = "var(--icon-inverse)",
  DISABLED = "var(--icon-disabled)",
}

enum STATUS_VARIANT_ENUM {
  SUCCESS = "var(--support-success)",
  WARNING = "var(--support-warning)",
  ERROR = "var(--support-error)",
  INFO = "var(--support-info)",
}

export {
  BORDER_COLOR_VARIANT_ENUM,
  TEXT_COLOR_VARIANT_ENUM,
  LINK_COLOR_VARIANT_ENUM,
  ICON_COLOR_VARIANT_ENUM,
  STATUS_VARIANT_ENUM,
  type BORDER_COLOR_VARIANTS,
  type TEXT_COLOR_VARIANTS,
  type LINK_COLOR_VARIANTS,
  type ICON_COLOR_VARIANTS,
  type STATUS_VARIANTS,
};
