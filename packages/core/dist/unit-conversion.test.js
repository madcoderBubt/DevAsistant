import { pxToRem, remToPx, pxToVw, vwToPx } from './unit-conversion';
import { describe, expect, test } from 'vitest';
describe('Unit Conversion Utilities', () => {
    // --- REM Tests ---
    describe('pxToRem', () => {
        test('correctly converts px to rem with default 16px root', () => {
            // 32px / 16px = 2rem
            expect(pxToRem(32)).toBe(2);
        });
        test('correctly converts px to rem with custom root size', () => {
            // 20px / 10px root = 2rem
            expect(pxToRem(20, 10)).toBe(2);
        });
        test('handles 0 correctly', () => {
            expect(pxToRem(0)).toBe(0);
        });
    });
    describe('remToPx', () => {
        test('correctly converts rem to px', () => {
            // 2rem * 16px = 32px
            expect(remToPx(2)).toBe(32);
        });
    });
    // --- Viewport Tests ---
    describe('Viewport Calculations', () => {
        test('pxToVw calculates percentage of viewport width', () => {
            const viewportWidth = 1000;
            // 500px is 50% of 1000px
            expect(pxToVw(500, viewportWidth)).toBe(50);
        });
        test('vwToPx calculates pixels from percentage', () => {
            const viewportWidth = 1000;
            // 50vw of 1000px is 500px
            expect(vwToPx(50, viewportWidth)).toBe(500);
        });
    });
});
