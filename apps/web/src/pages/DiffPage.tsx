import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { computeDiff, DiffResult } from '@dev-assistant/core';
import { GitCompare } from 'lucide-react';

export default function DiffPage() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [diffs, setDiffs] = useState<DiffResult>([]);

    const handleCompare = () => {
        const result = computeDiff(text1, text2);
        setDiffs(result);
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex items-center justify-between py-2">
                <h2 className="text-2xl font-bold">Diff Viewer</h2>
                <button
                    onClick={handleCompare}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    <GitCompare className="w-4 h-4" />
                    Compare
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 h-[40%]">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-muted-foreground">Original Text</label>
                    <div className="flex-1 border border-input rounded-md overflow-hidden bg-card">
                        <Editor
                            height="100%"
                            defaultLanguage="text"
                            theme="vs-dark"
                            value={text1}
                            onChange={(value) => setText1(value || '')}
                            options={{ minimap: { enabled: false }, fontSize: 14 }}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-muted-foreground">Modified Text</label>
                    <div className="flex-1 border border-input rounded-md overflow-hidden bg-card">
                        <Editor
                            height="100%"
                            defaultLanguage="text"
                            theme="vs-dark"
                            value={text2}
                            onChange={(value) => setText2(value || '')}
                            options={{ minimap: { enabled: false }, fontSize: 14 }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 flex-1 min-h-0">
                <label className="text-sm font-medium text-muted-foreground">Diff Result</label>
                <div className="flex-1 p-4 border border-input rounded-md bg-card overflow-auto font-mono text-sm whitespace-pre-wrap">
                    {diffs.map((diff, index) => {
                        const [type, text] = diff;
                        let className = '';
                        if (type === 1) className = 'bg-green-900/30 text-green-300';
                        if (type === -1) className = 'bg-red-900/30 text-red-300 line-through opacity-70';

                        return (
                            <span key={index} className={className}>
                                {text}
                            </span>
                        );
                    })}
                    {diffs.length === 0 && <span className="text-muted-foreground italic">No diffs computed yet...</span>}
                </div>
            </div>
        </div>
    );
}
