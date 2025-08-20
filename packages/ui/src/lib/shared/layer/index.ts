export enum LAYER_LEVEL {
    BACKGROUND = 0,
    LAYER_1 = 1,
    LAYER_2 = 2,
    LAYER_3 = 3,
  }
  
  export const MAX_LEVEL = LAYER_LEVEL.LAYER_3;
  export const MIN_LEVEL = LAYER_LEVEL.BACKGROUND;
  
  export const LAYER_CLASSNAMES = {
    [LAYER_LEVEL.BACKGROUND]: "bg-[var(--background)]",
    [LAYER_LEVEL.LAYER_1]: "bg-[var(--layer-01)]",
    [LAYER_LEVEL.LAYER_2]: "bg-[var(--layer-02)]",
    [LAYER_LEVEL.LAYER_3]: "bg-[var(--layer-03)]",
  } as const;
  
  export const levels = Object.values(LAYER_LEVEL) as LAYER_LEVEL[];
  
  export type LAYER_CLASSNAME = (typeof LAYER_CLASSNAMES)[keyof typeof LAYER_CLASSNAMES];