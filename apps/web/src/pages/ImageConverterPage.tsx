import React, { useState } from 'react';
import { Image as ImageIcon, Copy, Upload, Trash2, FileCode, Binary } from 'lucide-react';
import {
    fileToDataUrl,
    dataUrlToBase64,
    base64ToByteCode,
    byteCodeToBase64,
    base64ToDataUrl
} from '@dev-assistant/core';

export default function ImageConverterPage() {
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [base64Value, setBase64Value] = useState<string>('');
    const [byteCodeValue, setByteCodeValue] = useState<string>('');
    const [mimeType, setMimeType] = useState<string>('image/png');
    const [fileName, setFileName] = useState<string>('');
    const [fileSize, setFileSize] = useState<number>(0);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setFileSize(file.size);
        setMimeType(file.type);

        try {
            const dataUrl = await fileToDataUrl(file);
            setPreviewUrl(dataUrl);
            const base64 = dataUrlToBase64(dataUrl);
            setBase64Value(base64);
            setByteCodeValue(base64ToByteCode(base64));
        } catch (error) {
            console.error('Failed to process image', error);
        }
    };

    const handleBase64Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setBase64Value(val);
        setByteCodeValue(base64ToByteCode(val));
        setPreviewUrl(base64ToDataUrl(val, mimeType));
    };

    const handleByteCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setByteCodeValue(val);
        const base64 = byteCodeToBase64(val);
        setBase64Value(base64);
        setPreviewUrl(base64ToDataUrl(base64, mimeType));
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const clear = () => {
        setPreviewUrl('');
        setBase64Value('');
        setByteCodeValue('');
        setFileName('');
        setFileSize(0);
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-6 pb-20">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Image Converter</h2>
                <p className="text-muted-foreground">
                    Convert images to Base64/ByteCode and vice-versa.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload & Preview Section */}
                <div className="space-y-6">
                    <div className="bg-card border border-border rounded-lg p-6 overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-primary" />
                                Image Preview
                            </h3>
                            {previewUrl && (
                                <button
                                    onClick={clear}
                                    className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                    title="Clear"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {!previewUrl ? (
                            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-12 h-12 text-muted-foreground mb-3" />
                                    <p className="mb-2 text-sm text-foreground">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        PNG, JPG, SVG or WEBP (Max 5MB)
                                    </p>
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
                        ) : (
                            <div className="space-y-4">
                                <div className="relative group rounded-lg overflow-hidden border border-border bg-muted/30">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-w-full h-auto mx-auto max-h-[400px] object-contain"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <div className="px-3 py-1 bg-muted rounded-full">
                                        <span className="font-medium text-foreground">Name:</span> {fileName}
                                    </div>
                                    <div className="px-3 py-1 bg-muted rounded-full">
                                        <span className="font-medium text-foreground">Type:</span> {mimeType}
                                    </div>
                                    <div className="px-3 py-1 bg-muted rounded-full">
                                        <span className="font-medium text-foreground">Size:</span> {formatSize(fileSize)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Conversion Section */}
                <div className="space-y-6">
                    {/* Base64 Output */}
                    <div className="bg-card border border-border rounded-lg p-6 overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <FileCode className="w-5 h-5 text-primary" />
                                Base64 String
                            </h3>
                            <button
                                onClick={() => copyToClipboard(base64Value)}
                                className="p-2 hover:bg-muted rounded-md transition-colors"
                                title="Copy to clipboard"
                                disabled={!base64Value}
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                        </div>
                        <textarea
                            value={base64Value}
                            onChange={handleBase64Change}
                            placeholder="Base64 encoded image string will appear here..."
                            className="w-full h-40 p-4 bg-muted/50 border border-border rounded-md font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    {/* ByteCode Output */}
                    <div className="bg-card border border-border rounded-lg p-6 overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Binary className="w-5 h-5 text-primary" />
                                ByteCode (Decimal)
                            </h3>
                            <button
                                onClick={() => copyToClipboard(byteCodeValue)}
                                className="p-2 hover:bg-muted rounded-md transition-colors"
                                title="Copy to clipboard"
                                disabled={!byteCodeValue}
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                        </div>
                        <textarea
                            value={byteCodeValue}
                            onChange={handleByteCodeChange}
                            placeholder="Space-separated decimal byte values will appear here..."
                            className="w-full h-40 p-4 bg-muted/50 border border-border rounded-md font-mono text-xs resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
