import { Link, Outlet, useLocation } from 'react-router-dom';
import { FileJson, ArrowLeftRight, Code2, Braces, Ruler, Image, Database, AlignLeft, Shield, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { path: '/formatter', label: 'Formatter', icon: FileJson },
        { path: '/parser', label: 'JSON Parser', icon: Braces },
        { path: '/diff', label: 'Diff Viewer', icon: ArrowLeftRight },
        { path: '/unit-conversion', label: 'Unit Converter', icon: Ruler },
        { path: '/image-converter', label: 'Image Converter', icon: Image },
        { path: '/data-converter', label: 'Data Converter', icon: Database },
        { path: '/text-analyzer', label: 'Text Analyzer', icon: AlignLeft },
        { path: '/bcrypt', label: 'BCrypt Tool', icon: Shield },
    ];

    return (
        <div className="app-surface flex min-h-screen text-foreground font-sans">
            <aside className={`${isMenuOpen ? 'fixed inset-y-0 left-0 z-30 w-72 shadow-2xl' : 'hidden'} border-r border-border bg-card lg:static lg:flex lg:w-64 lg:shrink-0 lg:flex-col`}>
                <div className="flex items-center gap-2 border-b border-border p-6">
                    <Code2 className="w-6 h-6 text-primary" />
                    <h1 className="text-xl font-bold tracking-tight">DevAssistant</h1>
                </div>
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
            {isMenuOpen && <button aria-label="Close navigation" className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setIsMenuOpen(false)} />}
            <main className="min-w-0 flex-1 overflow-auto">
                <div className="flex h-16 items-center border-b border-border bg-card/60 px-4 backdrop-blur lg:hidden">
                    <button aria-label="Open navigation" onClick={() => setIsMenuOpen(true)} className="icon-button">
                        <Menu className="h-5 w-5" />
                    </button>
                    <span className="ml-2 text-sm font-semibold">DevAssistant</span>
                </div>
                <div className="min-h-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
