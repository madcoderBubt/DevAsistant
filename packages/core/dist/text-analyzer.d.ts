export interface TextAnalysis {
    totalCharsWithSpaces: number;
    totalCharsWithoutSpaces: number;
    blankSpaces: number;
    numbers: number;
    words: number;
    sentences: number;
    paragraphs: number;
    hexCount: number;
    binaryCount: number;
}
/**
 * Analyzes text and returns various counts
 */
export declare function analyzeText(text: string): TextAnalysis;
