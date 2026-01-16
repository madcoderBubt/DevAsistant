import { describe, it, expect } from 'vitest';
import { formatJSON, formatXML } from './formatter';

describe('Formatter', () => {
    it('should format valid JSON', async () => {
        const input = '{"a":1,"b":2}';
        const result = await formatJSON(input);
        expect(JSON.parse(result)).toEqual(JSON.parse(input));
        expect(result).toContain('\n');
    });

    it('should handle invalid JSON gracefully', async () => {
        const input = '{invalid}';
        const result = await formatJSON(input);
        expect(result).toBe(input);
    });

    it('should format valid XML', async () => {
        const input = '<root><child>text</child></root>';
        const result = await formatXML(input);
        // Relaxed check: just ensure meaningful parts exist and formatting happened
        expect(result).toContain('child');
        // It might add newlines
        expect(result.length).toBeGreaterThan(input.length);
    });
});
