import { useState, useEffect, useCallback } from 'react';
import { Settings, Smartphone, Monitor, Ruler } from 'lucide-react';
import {
    pxToRem, pxToEm, pxToVw, pxToVh, pxToPercent,
    remToPx, emToPx, vwToPx, vhToPx, percentToPx,
    pxToIn, inToPx, pxToCm, cmToPx
} from '@dev-assistant/core';

export default function UnitConversionPage() {
    // Configuration State
    const [rootFontSize, setRootFontSize] = useState<number>(16);
    const [isParentSameAsRoot, setIsParentSameAsRoot] = useState<boolean>(true);
    const [parentFontSize, setParentFontSize] = useState<number>(16);
    const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
    const [viewportHeight, setViewportHeight] = useState<number>(window.innerHeight);
    const [containerSize, setContainerSize] = useState<number>(1000);

    // Input States (using strings for smooth typing of decimals)
    const [pxValue, setPxValue] = useState<string>('16');
    const [remValue, setRemValue] = useState<string>('1');
    const [emValue, setEmValue] = useState<string>('1');
    const [vwValue, setVwValue] = useState<string>('0.8333');
    const [vhValue, setVhValue] = useState<string>('1.4815');
    const [percentValue, setPercentValue] = useState<string>('1.6');
    const [inValue, setInValue] = useState<string>('0.1667');
    const [cmValue, setCmValue] = useState<string>('0.4233');

    const effectiveParentFontSize = isParentSameAsRoot ? rootFontSize : parentFontSize;

    // Helper to format numbers for display
    const format = (val: number) => {
        if (isNaN(val)) return '';
        // Use a reasonable precision, but don't show trailing zeros unless necessary
        return parseFloat(val.toFixed(4)).toString();
    };

    // Update all from PX
    const updateAllFromPx = useCallback((px: number, sourceUnit?: string) => {
        if (sourceUnit !== 'px') setPxValue(px.toString());
        if (sourceUnit !== 'rem') setRemValue(format(pxToRem(px, rootFontSize)));
        if (sourceUnit !== 'em') setEmValue(format(pxToEm(px, effectiveParentFontSize)));
        if (sourceUnit !== 'vw') setVwValue(format(pxToVw(px, viewportWidth)));
        if (sourceUnit !== 'vh') setVhValue(format(pxToVh(px, viewportHeight)));
        if (sourceUnit !== 'percent') setPercentValue(format(pxToPercent(px, containerSize)));
        if (sourceUnit !== 'in') setInValue(format(pxToIn(px)));
        if (sourceUnit !== 'cm') setCmValue(format(pxToCm(px)));
    }, [rootFontSize, effectiveParentFontSize, viewportWidth, viewportHeight, containerSize]);

    // Re-sync when configuration changes
    useEffect(() => {
        const px = parseFloat(pxValue);
        if (!isNaN(px)) {
            updateAllFromPx(px, 'px');
        }
    }, [rootFontSize, effectiveParentFontSize, viewportWidth, viewportHeight, containerSize]);

    const handlePxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPxValue(val);
        const num = parseFloat(val);
        if (!isNaN(num)) updateAllFromPx(num, 'px');
    };

    const handleRemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setRemValue(val);
        const num = parseFloat(val);
        if (!isNaN(num)) updateAllFromPx(remToPx(num, rootFontSize), 'rem');
    };

    const handleEmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setEmValue(val);
        const num = parseFloat(val);
        if (!isNaN(num)) updateAllFromPx(emToPx(num, effectiveParentFontSize), 'em');
    };

    const handleVwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setVwValue(val);
        const num = parseFloat(val);
        if (!isNaN(num)) updateAllFromPx(vwToPx(num, viewportWidth), 'vw');
    };

    const handleVhChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setVhValue(val);
        const num = parseFloat(val);
        if (!isNaN(num)) updateAllFromPx(vhToPx(num, viewportHeight), 'vh');
    };

    const handlePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPercentValue(val);
        const num = parseFloat(val);
        if (!isNaN(num)) updateAllFromPx(percentToPx(num, containerSize), 'percent');
    };

    const handleInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInValue(val);
        const num = parseFloat(val);
        if (!isNaN(num)) updateAllFromPx(inToPx(num), 'in');
    };

    const handleCmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCmValue(val);
        const num = parseFloat(val);
        if (!isNaN(num)) updateAllFromPx(cmToPx(num), 'cm');
    };

    return (
        <div className="space-y-6 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Unit Converter</h2>
                    <p className="text-muted-foreground mt-2">
                        Convert between screen and physical units. Changing one updates all others in real-time.
                    </p>
                </div>
            </div>

            {/* Configuration Section */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-lg">Configuration</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Root Font Size (px)</label>
                        <input
                            type="number"
                            value={rootFontSize}
                            onChange={(e) => setRootFontSize(Number(e.target.value))}
                            className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-w-0"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Viewport Width (px)</label>
                        <input
                            type="number"
                            value={viewportWidth}
                            onChange={(e) => setViewportWidth(Number(e.target.value))}
                            className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-w-0"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Viewport Height (px)</label>
                        <input
                            type="number"
                            value={viewportHeight}
                            onChange={(e) => setViewportHeight(Number(e.target.value))}
                            className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-w-0"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Parent Container (px)</label>
                        <input
                            type="number"
                            value={containerSize}
                            onChange={(e) => setContainerSize(Number(e.target.value))}
                            className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-w-0"
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 h-9">
                            <input
                                type="checkbox"
                                id="parentSameAsRoot"
                                checked={isParentSameAsRoot}
                                onChange={(e) => setIsParentSameAsRoot(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor="parentSameAsRoot" className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                                Parent = Root
                            </label>
                        </div>
                        {!isParentSameAsRoot && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Parent Font Size (px)</label>
                                <input
                                    type="number"
                                    value={parentFontSize}
                                    onChange={(e) => setParentFontSize(Number(e.target.value))}
                                    className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-w-0"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Converter */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Pixels */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:border-primary/50 transition-colors overflow-hidden">
                    <h3 className="font-semibold text-lg mb-4">Pixels (px)</h3>
                    <div className="flex items-end gap-2">
                        <input
                            type="text"
                            inputMode="decimal"
                            value={pxValue}
                            onChange={handlePxChange}
                            className="flex-1 min-w-0 bg-background border border-input rounded-md px-4 py-3 text-xl font-mono font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <span className="pb-3 text-muted-foreground font-bold whitespace-nowrap">px</span>
                    </div>
                </div>

                {/* REM */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:border-primary/50 transition-colors overflow-hidden">
                    <h3 className="font-semibold text-lg mb-4">Root EM (rem)</h3>
                    <div className="flex items-end gap-2">
                        <input
                            type="text"
                            inputMode="decimal"
                            value={remValue}
                            onChange={handleRemChange}
                            className="flex-1 min-w-0 bg-background border border-input rounded-md px-4 py-3 text-xl font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <span className="pb-3 text-muted-foreground font-bold whitespace-nowrap">rem</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 truncate">Based on {rootFontSize}px root size</p>
                </div>

                {/* EM */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:border-primary/50 transition-colors overflow-hidden">
                    <h3 className="font-semibold text-lg mb-4">Element EM (em)</h3>
                    <div className="flex items-end gap-2">
                        <input
                            type="text"
                            inputMode="decimal"
                            value={emValue}
                            onChange={handleEmChange}
                            className="flex-1 min-w-0 bg-background border border-input rounded-md px-4 py-3 text-xl font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <span className="pb-3 text-muted-foreground font-bold whitespace-nowrap">em</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 truncate">Relative to parent ({effectiveParentFontSize}px)</p>
                </div>

                {/* VW */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:border-primary/50 transition-colors overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                        <Monitor className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-semibold text-lg">Viewport Width (vw)</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <input
                            type="text"
                            inputMode="decimal"
                            value={vwValue}
                            onChange={handleVwChange}
                            className="flex-1 min-w-0 bg-background border border-input rounded-md px-4 py-3 text-xl font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <span className="pb-3 text-muted-foreground font-bold whitespace-nowrap">vw</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 truncate">Based on {viewportWidth}px width</p>
                </div>

                {/* VH */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:border-primary/50 transition-colors overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                        <Smartphone className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-semibold text-lg">Viewport Height (vh)</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <input
                            type="text"
                            inputMode="decimal"
                            value={vhValue}
                            onChange={handleVhChange}
                            className="flex-1 min-w-0 bg-background border border-input rounded-md px-4 py-3 text-xl font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <span className="pb-3 text-muted-foreground font-bold whitespace-nowrap">vh</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 truncate">Based on {viewportHeight}px height</p>
                </div>

                {/* Percent */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:border-primary/50 transition-colors overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                        <Ruler className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-semibold text-lg">Percentage (%)</h3>
                    </div>
                    <div className="flex items-end gap-2">
                        <input
                            type="text"
                            inputMode="decimal"
                            value={percentValue}
                            onChange={handlePercentChange}
                            className="flex-1 min-w-0 bg-background border border-input rounded-md px-4 py-3 text-xl font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <span className="pb-3 text-muted-foreground font-bold whitespace-nowrap">%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 truncate">Relative to container ({containerSize}px)</p>
                </div>

                {/* Inches */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:border-primary/50 transition-colors overflow-hidden">
                    <h3 className="font-semibold text-lg mb-4">Inches (in)</h3>
                    <div className="flex items-end gap-2">
                        <input
                            type="text"
                            inputMode="decimal"
                            value={inValue}
                            onChange={handleInChange}
                            className="flex-1 min-w-0 bg-background border border-input rounded-md px-4 py-3 text-xl font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <span className="pb-3 text-muted-foreground font-bold whitespace-nowrap">in</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">1in = 96px</p>
                </div>

                {/* Centimeters */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:border-primary/50 transition-colors overflow-hidden">
                    <h3 className="font-semibold text-lg mb-4">Centimeters (cm)</h3>
                    <div className="flex items-end gap-2">
                        <input
                            type="text"
                            inputMode="decimal"
                            value={cmValue}
                            onChange={handleCmChange}
                            className="flex-1 min-w-0 bg-background border border-input rounded-md px-4 py-3 text-xl font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <span className="pb-3 text-muted-foreground font-bold whitespace-nowrap">cm</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">1in = 2.54cm</p>
                </div>
            </div>
        </div>
    );
}
