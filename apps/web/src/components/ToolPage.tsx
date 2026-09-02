import type { ReactNode } from 'react';

interface ToolPageHeaderProps {
    title: string;
    description: string;
    actions?: ReactNode;
}

export function ToolPageHeader({ title, description, actions }: ToolPageHeaderProps) {
    return (
        <header className="tool-page-header">
            <div>
                <p className="eyebrow">Developer utility</p>
                <h2>{title}</h2>
                <p className="tool-page-description">{description}</p>
            </div>
            {actions && <div className="tool-page-actions">{actions}</div>}
        </header>
    );
}

interface EditorPanelProps {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
    children: ReactNode;
}

export function EditorPanel({ title, subtitle, actions, children }: EditorPanelProps) {
    return (
        <section className="editor-panel">
            <div className="editor-panel-header">
                <div>
                    <h3>{title}</h3>
                    {subtitle && <p>{subtitle}</p>}
                </div>
                {actions && <div className="editor-panel-actions">{actions}</div>}
            </div>
            <div className="editor-panel-body">{children}</div>
        </section>
    );
}
