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
export function analyzeText(text: string): TextAnalysis {
    if (!text) {
        return {
            totalCharsWithSpaces: 0,
            totalCharsWithoutSpaces: 0,
            blankSpaces: 0,
            numbers: 0,
            words: 0,
            sentences: 0,
            paragraphs: 0,
            hexCount: 0,
            binaryCount: 0
        };
    }

    const totalCharsWithSpaces = text.length;
    const blankSpaces = (text.match(/\s/g) || []).length;
    const totalCharsWithoutSpaces = totalCharsWithSpaces - blankSpaces;
    
    // Count standalone numbers (integers and decimals, including negatives)
    // Excludes numbers embedded in words like "Love4Ever"
    const numbers = (text.match(/(?<![a-zA-Z])-?\d+(?:\.\d+)?(?![a-zA-Z])/g) || []).length;
    
    // Count words (handling multiple spaces and newlines)
    const words = text.trim() ? (text.trim().split(/\s+/).length) : 0;
    
    // Count sentences (splitting by . ! or ?)
    const sentences = text.trim() ? (text.split(/[.!?]+/).filter(s => s.trim().length > 0).length) : 0;
    
    // Count paragraphs (splitting by double newline or more)
    const paragraphs = text.trim() ? (text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length) : 0;

    // Count hexadecimal numbers (e.g., 0x1A, #FFFFFF)
    const hexCount = (text.match(/\b0x[0-9a-fA-F]+\b|\B#[0-9a-fA-F]{3,6}\b/g) || []).length;

    // Count binary numbers (e.g., 0b1010, or standalone strings of 4+ zeros and ones)
    const binaryCount = (text.match(/\b0b[01]+\b|\b[01]{4,}\b/g) || []).length;

    return {
        totalCharsWithSpaces,
        totalCharsWithoutSpaces,
        blankSpaces,
        numbers,
        words,
        sentences,
        paragraphs,
        hexCount,
        binaryCount
    };
}
