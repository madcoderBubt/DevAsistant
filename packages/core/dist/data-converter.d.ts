export interface ConversionResult {
    success: boolean;
    data?: string;
    error?: string;
}
/**
 * Convert JSON string to XML string
 */
export declare function jsonToXml(jsonString: string): ConversionResult;
/**
 * Convert XML string to JSON string
 */
export declare function xmlToJson(xmlString: string): ConversionResult;
/**
 * Convert JSON string to CSV string
 */
export declare function jsonToCsv(jsonString: string): ConversionResult;
/**
 * Convert CSV string to JSON string
 */
export declare function csvToJson(csvString: string): ConversionResult;
/**
 * Convert XML string to CSV string (via JSON intermediate)
 */
export declare function xmlToCsv(xmlString: string): ConversionResult;
/**
 * Convert CSV string to XML string (via JSON intermediate)
 */
export declare function csvToXml(csvString: string): ConversionResult;
/**
 * Validate if string is valid JSON
 */
export declare function isValidJson(str: string): boolean;
/**
 * Validate if string is valid XML
 */
export declare function isValidXml(str: string): boolean;
/**
 * Validate if string is valid CSV
 */
export declare function isValidCsv(str: string): boolean;
