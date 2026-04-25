import { useState, useEffect } from 'react';
import { RefreshCw, Copy, Trash2, ArrowLeftRight, Download, FileJson, FileCode, Table } from 'lucide-react';
import {
    jsonToXml,
    xmlToJson,
    jsonToCsv,
    csvToJson,
    xmlToCsv,
    csvToXml,
    ConversionResult
} from '@dev-assistant/core';

type DataFormat = 'json' | 'xml' | 'csv';

const SAMPLE_DATA = {
    json: `{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "active": true
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "active": false
    }
  ]
}`,
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <users>
    <user>
      <id>1</id>
      <name>John Doe</name>
      <email>john@example.com</email>
      <active>true</active>
    </user>
    <user>
      <id>2</id>
      <name>Jane Smith</name>
      <email>jane@example.com</email>
      <active>false</active>
    </user>
  </users>
</root>`,
    csv: `id,name,email,active
1,John Doe,john@example.com,true
2,Jane Smith,jane@example.com,false`
};

export default function DataConverterPage() {
    const [sourceFormat, setSourceFormat] = useState<DataFormat>('json');
    const [targetFormat, setTargetFormat] = useState<DataFormat>('xml');
    const [inputValue, setInputValue] = useState<string>('');
    const [outputValue, setOutputValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isConverting, setIsConverting] = useState(false);

    const formatIcons = {
        json: FileJson,
        xml: FileCode,
        csv: Table
    };

    const formatLabels = {
        json: 'JSON',
        xml: 'XML',
        csv: 'CSV'
    };

    useEffect(() => {
        // Auto-convert when input changes
        if (inputValue.trim()) {
            handleConvert();
        } else {
            setOutputValue('');
            setError('');
        }
    }, [inputValue, sourceFormat, targetFormat]);

    const handleConvert = () => {
        if (!inputValue.trim()) {
            setOutputValue('');
            setError('');
            return;
        }

        setIsConverting(true);
        setError('');

        try {
            let result: ConversionResult;

            // Perform conversion based on source and target formats
            if (sourceFormat === 'json' && targetFormat === 'xml') {
                result = jsonToXml(inputValue);
            } else if (sourceFormat === 'json' && targetFormat === 'csv') {
                result = jsonToCsv(inputValue);
            } else if (sourceFormat === 'xml' && targetFormat === 'json') {
                result = xmlToJson(inputValue);
            } else if (sourceFormat === 'xml' && targetFormat === 'csv') {
                result = xmlToCsv(inputValue);
            } else if (sourceFormat === 'csv' && targetFormat === 'json') {
                result = csvToJson(inputValue);
            } else if (sourceFormat === 'csv' && targetFormat === 'xml') {
                result = csvToXml(inputValue);
            } else {
                // Same format - just copy
                result = { success: true, data: inputValue };
            }

            if (result.success && result.data) {
                setOutputValue(result.data);
                setError('');
            } else {
                setOutputValue('');
                setError(result.error || 'Conversion failed');
            }
        } catch (err) {
            setOutputValue('');
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsConverting(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const clear = () => {
        setInputValue('');
        setOutputValue('');
        setError('');
    };

    const swapFormats = () => {
        setSourceFormat(targetFormat);
        setTargetFormat(sourceFormat);
        setInputValue(outputValue);
    };

    const loadSample = () => {
        setInputValue(SAMPLE_DATA[sourceFormat]);
    };

    const downloadOutput = () => {
        if (!outputValue) return;

        const blob = new Blob([outputValue], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted.${targetFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const FormatIcon = formatIcons[sourceFormat];
    const TargetIcon = formatIcons[targetFormat];

    return (
        <div className="space-y-6 pb-20">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Data Format Converter</h2>
                <p className="text-muted-foreground">
                    Convert between JSON, XML, and CSV formats seamlessly.
                </p>
            </div>

            {/* Format Selection */}
            <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium mb-2">Source Format</label>
                        <select
                            value={sourceFormat}
                            onChange={(e) => setSourceFormat(e.target.value as DataFormat)}
                            className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="json">JSON</option>
                            <option value="xml">XML</option>
                            <option value="csv">CSV</option>
                        </select>
                    </div>

                    <button
                        onClick={swapFormats}
                        className="mt-6 p-3 hover:bg-muted rounded-full transition-colors"
                        title="Swap formats"
                    >
                        <ArrowLeftRight className="w-5 h-5" />
                    </button>

                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-sm font-medium mb-2">Target Format</label>
                        <select
                            value={targetFormat}
                            onChange={(e) => setTargetFormat(e.target.value as DataFormat)}
                            className="w-full px-4 py-2 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="json">JSON</option>
                            <option value="xml">XML</option>
                            <option value="csv">CSV</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Conversion Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="bg-card border border-border rounded-lg p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <FormatIcon className="w-5 h-5 text-primary" />
                            Input ({formatLabels[sourceFormat]})
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={loadSample}
                                className="px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 rounded-md transition-colors"
                                title="Load sample data"
                            >
                                Sample
                            </button>
                            <button
                                onClick={clear}
                                className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                title="Clear all"
                                disabled={!inputValue}
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={`Paste your ${formatLabels[sourceFormat]} data here...`}
                        className="w-full h-[500px] p-4 bg-muted/50 border border-border rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>

                {/* Output Section */}
                <div className="bg-card border border-border rounded-lg p-6 overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <TargetIcon className="w-5 h-5 text-primary" />
                            Output ({formatLabels[targetFormat]})
                            {isConverting && (
                                <RefreshCw className="w-4 h-4 animate-spin text-muted-foreground" />
                            )}
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={downloadOutput}
                                className="p-2 hover:bg-muted rounded-md transition-colors"
                                title="Download output"
                                disabled={!outputValue}
                            >
                                <Download className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => copyToClipboard(outputValue)}
                                className="p-2 hover:bg-muted rounded-md transition-colors"
                                title="Copy to clipboard"
                                disabled={!outputValue}
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {error ? (
                        <div className="w-full h-[500px] p-4 bg-destructive/10 border border-destructive/20 rounded-md overflow-auto">
                            <div className="flex items-start gap-2 text-destructive">
                                <span className="font-semibold">Error:</span>
                                <span className="flex-1">{error}</span>
                            </div>
                        </div>
                    ) : (
                        <textarea
                            value={outputValue}
                            readOnly
                            placeholder={`Converted ${formatLabels[targetFormat]} will appear here...`}
                            className="w-full h-[500px] p-4 bg-muted/50 border border-border rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    )}
                </div>
            </div>

            {/* Info Section */}
            <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Conversion Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>JSON to CSV:</strong> Works best with arrays of objects or single objects. Nested objects will be flattened.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>CSV to JSON:</strong> First row is treated as headers. Numbers are automatically detected and typed.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>XML conversions:</strong> XML attributes are merged with element content. Arrays are detected automatically.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span><strong>Auto-conversion:</strong> Output updates automatically as you type or change formats.</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
