/**
 * Converts Pixels (px) to REM.
 * @param px The pixel value to convert.
 * @param rootFontSize The base font size (default: 16px or calculated).
 */
export declare const pxToRem: (px: number, rootFontSize?: number) => number;
/**
 * Converts REM to Pixels (px).
 * @param rem The rem value to convert.
 * @param rootFontSize The base font size (default: 16px or calculated).
 */
export declare const remToPx: (rem: number, rootFontSize?: number) => number;
/**
 * Converts Pixels (px) to EM.
 * Note: EM is relative to the parent or current element's font size.
 * @param px The pixel value to convert.
 * @param contextFontSize The font size of the element/parent (default: 16px).
 */
export declare const pxToEm: (px: number, contextFontSize?: number) => number;
/**
 * Converts EM to Pixels (px).
 * @param em The em value to convert.
 * @param contextFontSize The font size of the element/parent (default: 16px).
 */
export declare const emToPx: (em: number, contextFontSize?: number) => number;
/**
 * Converts Pixels (px) to Viewport Width (vw).
 * @param px The pixel value.
 * @param width The viewport width (default: window.innerWidth).
 */
export declare const pxToVw: (px: number, width?: number) => number;
/**
 * Converts Viewport Width (vw) to Pixels (px).
 * @param vw The vw value.
 * @param width The viewport width (default: window.innerWidth).
 */
export declare const vwToPx: (vw: number, width?: number) => number;
/**
 * Converts Pixels (px) to Viewport Height (vh).
 * @param px The pixel value.
 * @param height The viewport height (default: window.innerHeight).
 */
export declare const pxToVh: (px: number, height?: number) => number;
/**
 * Converts Viewport Height (vh) to Pixels (px).
 * @param vh The vh value.
 * @param height The viewport height (default: window.innerHeight).
 */
export declare const vhToPx: (vh: number, height?: number) => number;
/**
 * Converts Pixels to Percentage relative to a container.
 * @param px The pixel value.
 * @param containerSize The size of the parent container in pixels.
 */
export declare const pxToPercent: (px: number, containerSize: number) => number;
/**
 * Converts Percentage to Pixels relative to a container.
 * @param percent The percentage value.
 * @param containerSize The size of the parent container in pixels.
 */
export declare const percentToPx: (percent: number, containerSize: number) => number;
/**
 * Converts Pixels (px) to Inches (in).
 * @param px The pixel value.
 */
export declare const pxToIn: (px: number) => number;
/**
 * Converts Inches (in) to Pixels (px).
 * @param inch The inch value.
 */
export declare const inToPx: (inch: number) => number;
/**
 * Converts Pixels (px) to Centimeters (cm).
 * @param px The pixel value.
 */
export declare const pxToCm: (px: number) => number;
/**
 * Converts Centimeters (cm) to Pixels (px).
 * @param cm The centimeter value.
 */
export declare const cmToPx: (cm: number) => number;
