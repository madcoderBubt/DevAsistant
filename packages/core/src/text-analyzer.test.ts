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

    it('should correctly count numbers', () => {
        const text = 'Score is 10 to 5';
        const result = analyzeText(text);
        expect(result.numbers).toBe(3); // '1', '0', '5'
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

    it('should handle empty string', () => {
        const result = analyzeText('');
        expect(result.words).toBe(0);
        expect(result.totalCharsWithSpaces).toBe(0);
    });
});
