export interface TextAnalysis {
    totalCharsWithSpaces: number;
    totalCharsWithoutSpaces: number;
    blankSpaces: number;
    numbers: number;
    words: number;
    sentences: number;
    paragraphs: number;
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
            paragraphs: 0
        };
    }

    const totalCharsWithSpaces = text.length;
    const blankSpaces = (text.match(/\s/g) || []).length;
    const totalCharsWithoutSpaces = totalCharsWithSpaces - blankSpaces;
    
    // Count individual digits
    const numbers = (text.match(/\d/g) || []).length;
    
    // Count words (handling multiple spaces and newlines)
    const words = text.trim() ? (text.trim().split(/\s+/).length) : 0;
    
    // Count sentences (splitting by . ! or ?)
    const sentences = text.trim() ? (text.split(/[.!?]+/).filter(s => s.trim().length > 0).length) : 0;
    
    // Count paragraphs (splitting by double newline or more)
    const paragraphs = text.trim() ? (text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length) : 0;

    return {
        totalCharsWithSpaces,
        totalCharsWithoutSpaces,
        blankSpaces,
        numbers,
        words,
        sentences,
        paragraphs
    };
}
