import { Link, Outlet, useLocation } from 'react-router-dom';
import { FileJson, ArrowLeftRight, Code2, Braces, Ruler, Image } from 'lucide-react';

export default function Layout() {
    const location = useLocation();

    const navItems = [
        { path: '/formatter', label: 'Formatter', icon: FileJson },
        { path: '/parser', label: 'JSON Parser', icon: Braces },
        { path: '/diff', label: 'Diff Viewer', icon: ArrowLeftRight },
        { path: '/unit-conversion', label: 'Unit Converter', icon: Ruler },
        { path: '/image-converter', label: 'Image Converter', icon: Image },
    ];

    return (
        <div className="flex h-screen bg-background text-foreground font-sans">
            <aside className="w-64 border-r border-border bg-card">
                <div className="p-6 flex items-center gap-2 border-b border-border">
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
            <main className="flex-1 overflow-auto bg-background/50">
                <div className="h-full p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
