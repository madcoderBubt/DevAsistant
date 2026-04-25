import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import Papa from 'papaparse';
/**
 * Convert JSON string to XML string
 */
export function jsonToXml(jsonString) {
    try {
        const jsonData = JSON.parse(jsonString);
        const builder = new XMLBuilder({
            format: true,
            indentBy: '  ',
            ignoreAttributes: false,
            suppressEmptyNode: true
        });
        // Wrap in root element if not already wrapped
        const wrappedData = jsonData.root ? jsonData : { root: jsonData };
        const xml = builder.build(wrappedData);
        return { success: true, data: xml };
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to convert JSON to XML'
        };
    }
}
/**
 * Convert XML string to JSON string
 */
export function xmlToJson(xmlString) {
    try {
        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '',
            textNodeName: '_text',
            parseAttributeValue: true,
            parseTagValue: true,
            trimValues: true
        });
        const result = parser.parse(xmlString);
        return {
            success: true,
            data: JSON.stringify(result, null, 2)
        };
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to convert XML to JSON'
        };
    }
}
/**
 * Convert JSON string to CSV string
 */
export function jsonToCsv(jsonString) {
    try {
        const jsonData = JSON.parse(jsonString);
        // Handle array of objects
        if (Array.isArray(jsonData)) {
            if (jsonData.length === 0) {
                return { success: false, error: 'Empty array cannot be converted to CSV' };
            }
            const csv = Papa.unparse(jsonData, {
                header: true,
                skipEmptyLines: true
            });
            return { success: true, data: csv };
        }
        // Handle single object - convert to array with one element
        if (typeof jsonData === 'object' && jsonData !== null) {
            const csv = Papa.unparse([jsonData], {
                header: true,
                skipEmptyLines: true
            });
            return { success: true, data: csv };
        }
        return {
            success: false,
            error: 'JSON must be an object or array of objects for CSV conversion'
        };
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to convert JSON to CSV'
        };
    }
}
/**
 * Convert CSV string to JSON string
 */
export function csvToJson(csvString) {
    try {
        const result = Papa.parse(csvString, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true
        });
        if (result.errors.length > 0) {
            return {
                success: false,
                error: result.errors[0].message || 'Failed to parse CSV'
            };
        }
        return {
            success: true,
            data: JSON.stringify(result.data, null, 2)
        };
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to convert CSV to JSON'
        };
    }
}
/**
 * Convert XML string to CSV string (via JSON intermediate)
 */
export function xmlToCsv(xmlString) {
    try {
        const jsonResult = xmlToJson(xmlString);
        if (!jsonResult.success || !jsonResult.data) {
            return jsonResult;
        }
        return jsonToCsv(jsonResult.data);
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to convert XML to CSV'
        };
    }
}
/**
 * Convert CSV string to XML string (via JSON intermediate)
 */
export function csvToXml(csvString) {
    try {
        const jsonResult = csvToJson(csvString);
        if (!jsonResult.success || !jsonResult.data) {
            return jsonResult;
        }
        return jsonToXml(jsonResult.data);
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to convert CSV to XML'
        };
    }
}
/**
 * Validate if string is valid JSON
 */
export function isValidJson(str) {
    try {
        JSON.parse(str);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Validate if string is valid XML
 */
export function isValidXml(str) {
    try {
        const parser = new XMLParser();
        parser.parse(str);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Validate if string is valid CSV
 */
export function isValidCsv(str) {
    try {
        const result = Papa.parse(str, { header: true });
        return result.errors.length === 0 && result.data.length > 0;
    }
    catch {
        return false;
    }
}
