/**
 * Utility functions for image conversion
 */
/**
 * Converts a File or Blob to a Data URL
 */
export const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};
/**
 * Extracts the Base64 portion from a Data URL
 */
export const dataUrlToBase64 = (dataUrl) => {
    return dataUrl.split(',')[1] || '';
};
/**
 * Creates a Data URL from Base64 and MIME type
 */
export const base64ToDataUrl = (base64, mimeType) => {
    return `data:${mimeType};base64,${base64}`;
};
/**
 * Converts a Base64 string to a Space-separated ByteCode representation
 */
export const base64ToByteCode = (base64) => {
    try {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return Array.from(bytes).join(' ');
    }
    catch (e) {
        console.error('Failed to convert base64 to bytecode', e);
        return '';
    }
};
/**
 * Converts a ByteCode representation back to Base64
 */
export const byteCodeToBase64 = (byteCode) => {
    try {
        const bytes = new Uint8Array(byteCode.split(' ').map(Number));
        let binaryString = '';
        for (let i = 0; i < bytes.length; i++) {
            binaryString += String.fromCharCode(bytes[i]);
        }
        return btoa(binaryString);
    }
    catch (e) {
        console.error('Failed to convert bytecode to base64', e);
        return '';
    }
};
/**
 * Calculates the byte size of a Base64 string
 */
export const getBase64Size = (base64) => {
    if (!base64)
        return 0;
    const padding = (base64.match(/=/g) || []).length;
    return (base64.length * 3) / 4 - padding;
};
