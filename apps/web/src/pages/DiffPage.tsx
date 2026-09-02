import { useState, type ComponentProps } from 'react';
import { DiffEditor } from '@monaco-editor/react';
import { computeDiff, DiffResult } from '@dev-assistant/core';
import { ArrowLeftRight, GitCompare, RotateCcw } from 'lucide-react';
import { ToolPageHeader } from '../components/ToolPage';

export default function DiffPage() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [diffs, setDiffs] = useState<DiffResult>([]);

    const handleCompare = () => {
        const result = computeDiff(text1, text2);
        setDiffs(result);
    };

    const clearAll = () => {
        setText1('');
        setText2('');
        setDiffs([]);
    };

    const swapInputs = () => {
        setText1(text2);
        setText2(text1);
        setDiffs([]);
    };

    const handleDiffMount = (editor: Parameters<NonNullable<ComponentProps<typeof DiffEditor>['onMount']>>[0]) => {
        const originalModel = editor.getOriginalEditor().getModel();
        const modifiedModel = editor.getModifiedEditor().getModel();

        originalModel?.onDidChangeContent(() => {
            setText1(originalModel.getValue());
            setDiffs([]);
        });
        modifiedModel?.onDidChangeContent(() => {
            setText2(modifiedModel.getValue());
            setDiffs([]);
        });
    };

    const additions = diffs.filter(([type]) => type === 1).reduce((total, [, text]) => total + text.length, 0);
    const removals = diffs.filter(([type]) => type === -1).reduce((total, [, text]) => total + text.length, 0);

    return (
        <div className="flex min-h-[calc(100vh-8rem)] flex-col gap-6">
            <ToolPageHeader title="Diff Viewer" description="Compare two versions with synchronized scrolling and clear, line-level change markers." actions={
                <>
                    <button onClick={swapInputs} className="toolbar-button" title="Swap original and modified text">
                        <ArrowLeftRight className="w-4 h-4" /> Swap
                    </button>
                    <button onClick={handleCompare} disabled={!text1 && !text2} className="toolbar-button toolbar-button-primary">
                    <GitCompare className="w-4 h-4" />
                    Compare
                    </button>
                    <button onClick={clearAll} disabled={!text1 && !text2} className="toolbar-button" title="Clear both versions">
                        <RotateCcw className="w-4 h-4" /> Clear
                    </button>
                </>
            } />

            <section className="editor-panel h-[34rem] min-h-[34rem] lg:h-[calc(100vh-18rem)] lg:min-h-[38rem]">
                <div className="editor-panel-header">
                    <div>
                        <h3>Comparison workspace</h3>
                        <p>{diffs.length ? `${additions} added characters · ${removals} removed characters` : 'Add two versions, then compare them'}</p>
                    </div>
                    {diffs.length > 0 && <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">Changes found</span>}
                </div>
                <div className="editor-panel-body">
                    <DiffEditor
                        height="100%"
                        theme="vs-dark"
                        original={text1}
                        modified={text2}
                        language="text"
                        onMount={handleDiffMount}
                        options={{ renderSideBySide: true, readOnly: false, minimap: { enabled: false }, fontSize: 14, wordWrap: 'on', originalEditable: true, padding: { top: 16 } }}
                    />
                </div>
            </section>
        </div>
    );
}
