// @components/ui/MixIn.jsx

// Media Querry
export const breakPoints = {
  sm: "480px",
  md: "600px",
  lg: "960px",
  xl: "1280px",
};

export const mq = {
  sm: `@media (min-width: ${breakPoints.sm})`,
  md: `@media (min-width: ${breakPoints.md})`,
  lg: `@media (min-width: ${breakPoints.lg})`,
  xl: `@media (min-width: ${breakPoints.xl})`,
};

// Font Family
export const fontFamily = {
  gothic:
    '"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Hiragino Sans", sans-serif',
  mincho:
    '"Noto Serif JP", "Georgia", "Times New Roman", "Yu Mincho", "Hiragino Mincho ProN", serif',
  mono: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Consolas", "Courier New", monospace',
  titleEn: '"Ysabeau"',
};
