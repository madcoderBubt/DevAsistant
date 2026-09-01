import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { formatJSON, formatXML, detectInputType } from '@dev-assistant/core';
import { Play, Clipboard, Check, Zap, RotateCcw } from 'lucide-react';
import { EditorPanel, ToolPageHeader } from '../components/ToolPage';

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

    const clearAll = () => {
        setInput('');
        setOutput('');
    };

    return (
        <div className="flex min-h-[calc(100vh-8rem)] flex-col gap-6">
            <ToolPageHeader title="Code Formatter" description="Format JSON or XML in your browser. Enable auto-detect to identify the input type for you." actions={
                <>
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
                    <button onClick={handleFormat} className="toolbar-button toolbar-button-primary">
                        <Play className="w-4 h-4" />
                        Format
                    </button>
                    <button onClick={clearAll} disabled={!input && !output} className="toolbar-button" title="Clear both editors">
                        <RotateCcw className="w-4 h-4" /> Clear
                    </button>
                </>
            } />

            <div className="grid flex-1 min-h-[32rem] grid-cols-1 gap-4 lg:grid-cols-2">
                <EditorPanel title="Input" subtitle="Paste JSON or XML to format">
                        <Editor
                            height="100%"
                            defaultLanguage={language}
                            language={language}
                            theme="vs-dark"
                            value={input}
                            onChange={(value) => setInput(value || '')}
                            options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: 'on', padding: { top: 16 } }}
                        />
                </EditorPanel>

                <EditorPanel title="Formatted output" subtitle={output ? `Detected as ${language.toUpperCase()}` : 'Your formatted result will appear here'} actions={
                        <button
                            onClick={copyToClipboard}
                            disabled={!output}
                            className="icon-button"
                        >
                            {copied ? <Check className="w-3 h-3" /> : <Clipboard className="w-3 h-3" />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                }>
                        <Editor
                            height="100%"
                            defaultLanguage={language}
                            language={language}
                            theme="vs-dark"
                            value={output}
                            options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14, wordWrap: 'on', padding: { top: 16 } }}
                        />
                </EditorPanel>
            </div>
        </div>
    );
}
