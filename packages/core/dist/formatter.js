import * as prettier from 'prettier/standalone';
import * as parserHtml from 'prettier/plugins/html'; // For XML/HTML
export function detectInputType(content) {
    const trimmed = content.trim();
    // Check for XML declaration or XML structure
    if (trimmed.startsWith('<?xml') || trimmed.startsWith('<')) {
        return 'xml';
    }
    // Check for JSON structure
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        return 'json';
    }
    // Try parsing as JSON
    try {
        JSON.parse(trimmed);
        return 'json';
    }
    catch {
        // Fallback to XML
        return 'xml';
    }
}
export async function formatJSON(content) {
    try {
        let parsed = JSON.parse(content);
        // If the result is a string (stringified JSON), parse it again
        if (typeof parsed === 'string') {
            parsed = JSON.parse(parsed);
        }
        return JSON.stringify(parsed, null, 2);
    }
    catch (e) {
        // Fallback for simple cases if prettier fails or just return original with error
        console.error("Formatting failed", e);
        return content;
    }
}
export function parseJSON(content) {
    try {
        let parsed = JSON.parse(content);
        // If the result is a string (stringified JSON), parse it again
        if (typeof parsed === 'string') {
            parsed = JSON.parse(parsed);
        }
        return JSON.stringify(parsed, null, 2);
    }
    catch (e) {
        throw new Error(`Invalid JSON: ${e.message}`);
    }
}
export function stringifyJSON(content) {
    try {
        const parsed = JSON.parse(content);
        return JSON.stringify(parsed);
    }
    catch (e) {
        throw new Error(`Invalid JSON: ${e.message}`);
    }
}
export async function formatXML(content) {
    try {
        return await prettier.format(content, {
            parser: 'html',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            plugins: [parserHtml],
            htmlWhitespaceSensitivity: 'ignore',
            printWidth: 80,
            tabWidth: 2,
        });
    }
    catch (e) {
        console.error("XML Formatting failed", e);
        // Fallback: manual XML formatting
        return formatXMLManual(content);
    }
}
function formatXMLManual(content) {
    let formatted = '';
    let indent = 0;
    const indentString = '  ';
    // Remove extra whitespace
    content = content.replace(/>\s+</g, '><');
    let i = 0;
    while (i < content.length) {
        if (content[i] === '<') {
            // Find the end of the tag
            const closeIdx = content.indexOf('>', i);
            if (closeIdx === -1)
                break;
            const tag = content.substring(i, closeIdx + 1);
            // Check if it's a closing tag
            if (tag.startsWith('</')) {
                indent = Math.max(0, indent - 1);
                formatted += indentString.repeat(indent) + tag + '\n';
            }
            // Check if it's a self-closing tag or XML declaration
            else if (tag.endsWith('/>') || tag.startsWith('<?')) {
                formatted += indentString.repeat(indent) + tag + '\n';
            }
            // Opening tag
            else {
                formatted += indentString.repeat(indent) + tag + '\n';
                indent++;
            }
            i = closeIdx + 1;
        }
        else {
            // Handle text content
            const nextTagIdx = content.indexOf('<', i);
            if (nextTagIdx === -1) {
                const text = content.substring(i).trim();
                if (text) {
                    formatted += indentString.repeat(Math.max(0, indent - 1)) + text + '\n';
                }
                break;
            }
            else {
                const text = content.substring(i, nextTagIdx).trim();
                if (text) {
                    formatted += indentString.repeat(Math.max(0, indent - 1)) + text + '\n';
                }
                i = nextTagIdx;
            }
        }
    }
    return formatted.trim();
}
