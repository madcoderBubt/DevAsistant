import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { parseJSON, stringifyJSON } from '@dev-assistant/core';
import { Play, Clipboard, Check, RotateCcw } from 'lucide-react';
import { EditorPanel, ToolPageHeader } from '../components/ToolPage';

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
        <div className="flex min-h-[calc(100vh-8rem)] flex-col gap-6">
            <ToolPageHeader title="JSON tools" description="Prettify JSON for review or minify it for transport. Validation errors stay close to your input." actions={
                <>
                    <div className="flex gap-2 rounded-md border border-input bg-card p-1">
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                            <input
                                type="radio"
                                name="action"
                                value="parse"
                                checked={action === 'parse'}
                                onChange={(e) => setAction(e.target.value as 'parse' | 'stringify')}
                                className="sr-only"
                            />
                            <span className={`rounded px-2 py-1 ${action === 'parse' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Prettify</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                            <input
                                type="radio"
                                name="action"
                                value="stringify"
                                checked={action === 'stringify'}
                                onChange={(e) => setAction(e.target.value as 'parse' | 'stringify')}
                                className="sr-only"
                            />
                            <span className={`rounded px-2 py-1 ${action === 'stringify' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>Minify</span>
                        </label>
                    </div>
                    <button onClick={handleExecute} disabled={!input.trim()} className="toolbar-button toolbar-button-primary">
                        <Play className="w-4 h-4" />
                        {action === 'parse' ? 'Prettify' : 'Minify'}
                    </button>
                    <button onClick={clearAll} disabled={!input && !output} className="toolbar-button">
                        <RotateCcw className="w-4 h-4" />
                        Clear
                    </button>
                </>
            } />

            {error && (
                <div className="p-3 rounded-md bg-destructive/10 border border-destructive text-destructive text-sm">
                    {error}
                </div>
            )}

            <div className="grid flex-1 min-h-[32rem] grid-cols-1 gap-4 lg:grid-cols-2">
                <EditorPanel title="Input JSON" subtitle={action === 'parse' ? 'Minified or unformatted JSON' : 'Formatted JSON to minify'}>
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
                            options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: 'on', padding: { top: 16 } }}
                        />
                </EditorPanel>

                <EditorPanel title={action === 'parse' ? 'Prettified JSON' : 'Minified JSON'} subtitle={output ? 'Ready to copy' : 'Your result will appear here'} actions={
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
                            defaultLanguage="json"
                            language="json"
                            theme="vs-dark"
                            value={output}
                            options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14, wordWrap: 'on', padding: { top: 16 } }}
                        />
                </EditorPanel>
            </div>
        </div>
    );
}
