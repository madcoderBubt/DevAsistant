import { describe, it, expect } from 'vitest';
import { computeDiff } from './differ';

describe('Differ', () => {
    it('should find differences between two strings', () => {
        const text1 = 'Hello World';
        const text2 = 'Hello There';
        const diffs = computeDiff(text1, text2);

        // Expect: [0, "Hello "], [-1, "World"], [1, "There"]
        // Or similar depending on optimization
        expect(diffs.length).toBeGreaterThan(0);
        expect(JSON.stringify(diffs)).toContain('Hello');
    });

    it('should return no diffs for identical strings', () => {
        const text1 = 'Same';
        const text2 = 'Same';
        const diffs = computeDiff(text1, text2);
        // Usually one chunk with code 0 (equal)
        expect(diffs.length).toBe(1);
        expect(diffs[0][0]).toBe(0);
    });
});
