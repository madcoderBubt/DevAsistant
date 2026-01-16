export declare function detectInputType(content: string): 'json' | 'xml';
export declare function formatJSON(content: string): Promise<string>;
export declare function parseJSON(content: string): string;
export declare function stringifyJSON(content: string): string;
export declare function formatXML(content: string): Promise<string>;
