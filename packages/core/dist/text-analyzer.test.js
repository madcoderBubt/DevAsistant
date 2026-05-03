import { describe, it, expect } from 'vitest';
import { analyzeText } from './text-analyzer';
describe('analyzeText', () => {
    it('should correctly count characters and spaces', () => {
        const text = 'Hello 123';
        const result = analyzeText(text);
        expect(result.totalCharsWithSpaces).toBe(9);
        expect(result.blankSpaces).toBe(1);
        expect(result.totalCharsWithoutSpaces).toBe(8);
    });
    it('should correctly count standalone numbers and decimals', () => {
        const text = 'Score is 10 to 5.5 and Love4Ever has 0 numbers. -156.54 is one.';
        const result = analyzeText(text);
        // Numbers expected: 10, 5.5, 0, -156.54
        expect(result.numbers).toBe(4);
    });
    it('should correctly count words', () => {
        const text = '  Hello   world  ';
        const result = analyzeText(text);
        expect(result.words).toBe(2);
    });
    it('should correctly count sentences', () => {
        const text = 'Hello! How are you? I am fine.';
        const result = analyzeText(text);
        expect(result.sentences).toBe(3);
    });
    it('should correctly count paragraphs', () => {
        const text = 'Para 1\n\nPara 2\n\n\nPara 3';
        const result = analyzeText(text);
        expect(result.paragraphs).toBe(3);
    });
    it('should correctly count hex and binary numbers', () => {
        const text = 'Hex: 0x1A and #FF00FF. Binary: 0b1010 and 11010011.';
        const result = analyzeText(text);
        expect(result.hexCount).toBe(2);
        expect(result.binaryCount).toBe(2);
    });
    it('should handle empty string', () => {
        const result = analyzeText('');
        expect(result.words).toBe(0);
        expect(result.totalCharsWithSpaces).toBe(0);
    });
});
