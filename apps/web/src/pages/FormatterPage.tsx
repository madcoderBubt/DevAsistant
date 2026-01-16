import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { formatJSON, formatXML, detectInputType } from '@dev-assistant/core';
import { Play, Clipboard, Check, Zap } from 'lucide-react';

export default function FormatterPage() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState<'json' | 'xml'>('json');
    const [autoDetect, setAutoDetect] = useState(true);
    const [copied, setCopied] = useState(false);

    const handleFormat = async () => {
        try {
            let detectedLanguage = language;
            
            // Auto-detect if enabled and input is not empty
            if (autoDetect && input.trim()) {
                detectedLanguage = detectInputType(input);
                setLanguage(detectedLanguage);
            }
            
            let formatted = '';
            if (detectedLanguage === 'json') {
                formatted = await formatJSON(input);
            } else {
                formatted = await formatXML(input);
            }
            setOutput(formatted);
        } catch (error) {
            setOutput('Error formatting: ' + (error as Error).message);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex items-center justifying-between gap-4 py-2">
                <h2 className="text-2xl font-bold">Code Formatter</h2>
                <div className="flex items-center gap-2 ml-auto">
                    <label className="flex items-center gap-2 px-3 py-2 bg-card border border-input rounded-md text-sm cursor-pointer hover:bg-accent">
                        <input
                            type="checkbox"
                            checked={autoDetect}
                            onChange={(e) => setAutoDetect(e.target.checked)}
                            className="w-4 h-4 cursor-pointer"
                        />
                        <Zap className="w-4 h-4" />
                        Auto-detect
                    </label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as 'json' | 'xml')}
                        disabled={autoDetect}
                        className="px-3 py-2 bg-card border border-input rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <option value="json">JSON</option>
                        <option value="xml">XML</option>
                    </select>
                    <button
                        onClick={handleFormat}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        <Play className="w-4 h-4" />
                        Format
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
                <div className="flex flex-col gap-2 h-full">
                    <label className="text-sm font-medium text-muted-foreground">Input</label>
                    <div className="flex-1 border border-input rounded-md overflow-hidden bg-card">
                        <Editor
                            height="100%"
                            defaultLanguage={language}
                            language={language}
                            theme="vs-dark"
                            value={input}
                            onChange={(value) => setInput(value || '')}
                            options={{ minimap: { enabled: false }, fontSize: 14 }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 h-full">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-muted-foreground">Output</label>
                        <button
                            onClick={copyToClipboard}
                            disabled={!output}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-3"
                        >
                            {copied ? <Check className="w-3 h-3" /> : <Clipboard className="w-3 h-3" />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    <div className="flex-1 border border-input rounded-md overflow-hidden bg-card">
                        <Editor
                            height="100%"
                            defaultLanguage={language}
                            language={language}
                            theme="vs-dark"
                            value={output}
                            options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
