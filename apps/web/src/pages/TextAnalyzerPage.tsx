import { useState, useMemo } from 'react';
import { analyzeText } from '@dev-assistant/core';
import { Type, Hash, AlignLeft, FileText, Quote, Hash as HashIcon, MousePointer2 } from 'lucide-react';

export default function TextAnalyzerPage() {
    const [text, setText] = useState('');

    const stats = useMemo(() => analyzeText(text), [text]);

    const statCards = [
        {
            label: 'Characters (with spaces)',
            value: stats.totalCharsWithSpaces,
            icon: <Type className="w-5 h-5 text-blue-500" />,
            description: 'Total character count'
        },
        {
            label: 'Characters (without spaces)',
            value: stats.totalCharsWithoutSpaces,
            icon: <AlignLeft className="w-5 h-5 text-indigo-500" />,
            description: 'Excluding whitespace'
        },
        {
            label: 'Blank Spaces',
            value: stats.blankSpaces,
            icon: <MousePointer2 className="w-5 h-5 text-cyan-500" />,
            description: 'Spaces, tabs, newlines'
        },
        {
            label: 'Words',
            value: stats.words,
            icon: <FileText className="w-5 h-5 text-emerald-500" />,
            description: 'Individual words'
        },
        {
            label: 'Sentences',
            value: stats.sentences,
            icon: <Quote className="w-5 h-5 text-amber-500" />,
            description: 'Ending with . ! or ?'
        },
        {
            label: 'Paragraphs',
            value: stats.paragraphs,
            icon: <AlignLeft className="w-5 h-5 text-purple-500" />,
            description: 'Separated by empty lines'
        },
        {
            label: 'Numbers',
            value: stats.numbers,
            icon: <HashIcon className="w-5 h-5 text-rose-500" />,
            description: 'Count of digits (0-9)'
        }
    ];

    return (
        <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between gap-4 py-2">
                <div>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                        Passage Text Counter
                    </h2>
                    <p className="text-sm text-muted-foreground">Analyze your text for various metrics in real-time.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                <div className="lg:col-span-2 flex flex-col gap-2 h-full">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Input Text</label>
                    <textarea
                        className="flex-1 w-full p-4 rounded-xl border border-input bg-card/50 backdrop-blur-sm text-card-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none font-mono text-sm"
                        placeholder="Paste or type your text here to analyze..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    <label className="text-sm font-medium text-muted-foreground ml-1">Analysis Results</label>
                    <div className="grid grid-cols-1 gap-3">
                        {statCards.map((stat, index) => (
                            <div 
                                key={index}
                                className="group p-4 rounded-xl border border-input bg-card hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 shadow-sm"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            {stat.label}
                                        </span>
                                        <span className="text-2xl font-bold font-mono group-hover:text-primary transition-colors">
                                            {stat.value.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="p-2 rounded-lg bg-background border border-input group-hover:scale-110 transition-transform">
                                        {stat.icon}
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                    {stat.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
