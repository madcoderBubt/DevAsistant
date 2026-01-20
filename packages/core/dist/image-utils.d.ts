/**
 * Utility functions for image conversion
 */
/**
 * Converts a File or Blob to a Data URL
 */
export declare const fileToDataUrl: (file: File | Blob) => Promise<string>;
/**
 * Extracts the Base64 portion from a Data URL
 */
export declare const dataUrlToBase64: (dataUrl: string) => string;
/**
 * Creates a Data URL from Base64 and MIME type
 */
export declare const base64ToDataUrl: (base64: string, mimeType: string) => string;
/**
 * Converts a Base64 string to a Space-separated ByteCode representation
 */
export declare const base64ToByteCode: (base64: string) => string;
/**
 * Converts a ByteCode representation back to Base64
 */
export declare const byteCodeToBase64: (byteCode: string) => string;
