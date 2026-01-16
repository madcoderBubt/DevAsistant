import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { parseJSON, stringifyJSON } from '@dev-assistant/core';
import { Play, Clipboard, Check, RotateCcw } from 'lucide-react';

export default function JSONParserPage() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [action, setAction] = useState<'parse' | 'stringify'>('parse');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const handleExecute = () => {
        setError('');
        try {
            let result = '';
            if (action === 'parse') {
                result = parseJSON(input);
            } else {
                result = stringifyJSON(input);
            }
            setOutput(result);
        } catch (err) {
            const errorMessage = (err as Error).message;
            setError(errorMessage);
            setOutput('');
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
        setError('');
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex items-center justifying-between gap-4 py-2">
                <h2 className="text-2xl font-bold">JSON Parser & Stringifier</h2>
                <div className="flex items-center gap-2 ml-auto">
                    <div className="flex gap-2 px-3 py-2 bg-card border border-input rounded-md">
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                            <input
                                type="radio"
                                name="action"
                                value="parse"
                                checked={action === 'parse'}
                                onChange={(e) => setAction(e.target.value as 'parse' | 'stringify')}
                                className="w-4 h-4 cursor-pointer"
                            />
                            Parse (Prettify)
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                            <input
                                type="radio"
                                name="action"
                                value="stringify"
                                checked={action === 'stringify'}
                                onChange={(e) => setAction(e.target.value as 'parse' | 'stringify')}
                                className="w-4 h-4 cursor-pointer"
                            />
                            Stringify (Minify)
                        </label>
                    </div>
                    <button
                        onClick={handleExecute}
                        disabled={!input.trim()}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        <Play className="w-4 h-4" />
                        Execute
                    </button>
                    <button
                        onClick={clearAll}
                        disabled={!input && !output}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-muted text-muted-foreground hover:bg-muted/80 h-10 px-4 py-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Clear
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-3 rounded-md bg-destructive/10 border border-destructive text-destructive text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
                <div className="flex flex-col gap-2 h-full">
                    <label className="text-sm font-medium text-muted-foreground">
                        {action === 'parse' ? 'Input (Minified JSON)' : 'Input (Formatted JSON)'}
                    </label>
                    <div className="flex-1 border border-input rounded-md overflow-hidden bg-card">
                        <Editor
                            height="100%"
                            defaultLanguage="json"
                            language="json"
                            theme="vs-dark"
                            value={input}
                            onChange={(value) => {
                                setInput(value || '');
                                setError('');
                            }}
                            options={{ minimap: { enabled: false }, fontSize: 14 }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 h-full">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-muted-foreground">
                            {action === 'parse' ? 'Output (Prettified JSON)' : 'Output (Minified JSON)'}
                        </label>
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
                            defaultLanguage="json"
                            language="json"
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
