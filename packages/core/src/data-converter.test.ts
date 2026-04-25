import { describe, it, expect } from 'vitest';
import {
    jsonToXml,
    xmlToJson,
    jsonToCsv,
    csvToJson,
    xmlToCsv,
    csvToXml,
    isValidJson,
    isValidXml,
    isValidCsv
} from './data-converter';

describe('Data Converter', () => {
    describe('JSON to XML', () => {
        it('should convert simple JSON object to XML', () => {
            const json = '{"name":"John","age":30}';
            const result = jsonToXml(json);
            expect(result.success).toBe(true);
            expect(result.data).toContain('<name>John</name>');
            expect(result.data).toContain('<age>30</age>');
        });

        it('should handle invalid JSON', () => {
            const result = jsonToXml('invalid json');
            expect(result.success).toBe(false);
            expect(result.error).toBeDefined();
        });
    });

    describe('XML to JSON', () => {
        it('should convert simple XML to JSON', () => {
            const xml = '<?xml version="1.0"?><root><name>John</name><age>30</age></root>';
            const result = xmlToJson(xml);
            expect(result.success).toBe(true);
            expect(result.data).toBeDefined();
        });

        it('should handle invalid XML', () => {
            const result = xmlToJson('<<>>invalid<<xml');
            expect(result.success).toBe(false);
            expect(result.error).toBeDefined();
        });
    });

    describe('JSON to CSV', () => {
        it('should convert array of objects to CSV', () => {
            const json = '[{"name":"John","age":30},{"name":"Jane","age":25}]';
            const result = jsonToCsv(json);
            expect(result.success).toBe(true);
            expect(result.data).toContain('name,age');
            expect(result.data).toContain('John,30');
            expect(result.data).toContain('Jane,25');
        });

        it('should convert single object to CSV', () => {
            const json = '{"name":"John","age":30}';
            const result = jsonToCsv(json);
            expect(result.success).toBe(true);
            expect(result.data).toContain('name,age');
        });

        it('should handle empty array', () => {
            const result = jsonToCsv('[]');
            expect(result.success).toBe(false);
        });
    });

    describe('CSV to JSON', () => {
        it('should convert CSV to JSON array', () => {
            const csv = 'name,age\nJohn,30\nJane,25';
            const result = csvToJson(csv);
            expect(result.success).toBe(true);
            const data = JSON.parse(result.data!);
            expect(Array.isArray(data)).toBe(true);
            expect(data).toHaveLength(2);
        });
    });

    describe('Validation functions', () => {
        it('should validate JSON correctly', () => {
            expect(isValidJson('{"valid":true}')).toBe(true);
            expect(isValidJson('invalid')).toBe(false);
        });

        it('should validate XML correctly', () => {
            expect(isValidXml('<root>valid</root>')).toBe(true);
            expect(isValidXml('<invalid')).toBe(false);
        });

        it('should validate CSV correctly', () => {
            expect(isValidCsv('name,age\nJohn,30')).toBe(true);
            expect(isValidCsv('')).toBe(false);
        });
    });
});
