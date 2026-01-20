/**
 * Helper to safely get the root font size in a browser environment.
 */
const getRootFontSize = () => {
    if (typeof window === 'undefined')
        return 16;
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
};
// --- REM Conversions ---
/**
 * Converts Pixels (px) to REM.
 * @param px The pixel value to convert.
 * @param rootFontSize The base font size (default: 16px or calculated).
 */
export const pxToRem = (px, rootFontSize = getRootFontSize()) => {
    return px / rootFontSize;
};
/**
 * Converts REM to Pixels (px).
 * @param rem The rem value to convert.
 * @param rootFontSize The base font size (default: 16px or calculated).
 */
export const remToPx = (rem, rootFontSize = getRootFontSize()) => {
    return rem * rootFontSize;
};
// --- EM Conversions ---
/**
 * Converts Pixels (px) to EM.
 * Note: EM is relative to the parent or current element's font size.
 * @param px The pixel value to convert.
 * @param contextFontSize The font size of the element/parent (default: 16px).
 */
export const pxToEm = (px, contextFontSize = 16) => {
    return px / contextFontSize;
};
/**
 * Converts EM to Pixels (px).
 * @param em The em value to convert.
 * @param contextFontSize The font size of the element/parent (default: 16px).
 */
export const emToPx = (em, contextFontSize = 16) => {
    return em * contextFontSize;
};
// --- Viewport Conversions (VH/VW) ---
/**
 * Converts Pixels (px) to Viewport Width (vw).
 * @param px The pixel value.
 * @param width The viewport width (default: window.innerWidth).
 */
export const pxToVw = (px, width = (typeof window !== 'undefined' ? window.innerWidth : 1920)) => {
    return (px / width) * 100;
};
/**
 * Converts Viewport Width (vw) to Pixels (px).
 * @param vw The vw value.
 * @param width The viewport width (default: window.innerWidth).
 */
export const vwToPx = (vw, width = (typeof window !== 'undefined' ? window.innerWidth : 1920)) => {
    return (vw / 100) * width;
};
/**
 * Converts Pixels (px) to Viewport Height (vh).
 * @param px The pixel value.
 * @param height The viewport height (default: window.innerHeight).
 */
export const pxToVh = (px, height = (typeof window !== 'undefined' ? window.innerHeight : 1080)) => {
    return (px / height) * 100;
};
/**
 * Converts Viewport Height (vh) to Pixels (px).
 * @param vh The vh value.
 * @param height The viewport height (default: window.innerHeight).
 */
export const vhToPx = (vh, height = (typeof window !== 'undefined' ? window.innerHeight : 1080)) => {
    return (vh / 100) * height;
};
// --- Percentage Conversions ---
/**
 * Converts Pixels to Percentage relative to a container.
 * @param px The pixel value.
 * @param containerSize The size of the parent container in pixels.
 */
export const pxToPercent = (px, containerSize) => {
    return (px / containerSize) * 100;
};
/**
 * Converts Percentage to Pixels relative to a container.
 * @param percent The percentage value.
 * @param containerSize The size of the parent container in pixels.
 */
export const percentToPx = (percent, containerSize) => {
    return (percent / 100) * containerSize;
};
// --- Physical Units (IN/CM) ---
/**
 * Converts Pixels (px) to Inches (in).
 * @param px The pixel value.
 */
export const pxToIn = (px) => {
    return px / 96;
};
/**
 * Converts Inches (in) to Pixels (px).
 * @param inch The inch value.
 */
export const inToPx = (inch) => {
    return inch * 96;
};
/**
 * Converts Pixels (px) to Centimeters (cm).
 * @param px The pixel value.
 */
export const pxToCm = (px) => {
    return px / (96 / 2.54);
};
/**
 * Converts Centimeters (cm) to Pixels (px).
 * @param cm The centimeter value.
 */
export const cmToPx = (cm) => {
    return cm * (96 / 2.54);
};
