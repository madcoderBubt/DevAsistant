import { useState } from 'react';
import { hashPassword, comparePassword } from '@dev-assistant/core';
import { Shield, Key, Lock, Unlock, Clipboard, Check, RefreshCw } from 'lucide-react';

export default function BCryptPage() {
    // Hash Generation State
    const [plainText, setPlainText] = useState('');
    const [saltRounds, setSaltRounds] = useState(10);
    const [generatedHash, setGeneratedHash] = useState('');
    const [isHashing, setIsHashing] = useState(false);
    const [hashCopied, setHashCopied] = useState(false);

    // Verification State
    const [verifyPassword, setVerifyPassword] = useState('');
    const [verifyHash, setVerifyHash] = useState('');
    const [isMatch, setIsMatch] = useState<boolean | null>(null);
    const [isComparing, setIsComparing] = useState(false);

    const handleHash = async () => {
        if (!plainText) return;
        setIsHashing(true);
        try {
            const hash = await hashPassword(plainText, saltRounds);
            setGeneratedHash(hash);
        } catch (error) {
            console.error('Hashing error:', error);
            setGeneratedHash('Error generating hash');
        } finally {
            setIsHashing(false);
        }
    };

    const handleVerify = async () => {
        if (!verifyPassword || !verifyHash) return;
        setIsComparing(true);
        try {
            const match = await comparePassword(verifyPassword, verifyHash);
            setIsMatch(match);
        } catch (error) {
            console.error('Verification error:', error);
            setIsMatch(false);
        } finally {
            setIsComparing(false);
        }
    };

    const copyHash = () => {
        if (!generatedHash) return;
        navigator.clipboard.writeText(generatedHash);
        setHashCopied(true);
        setTimeout(() => setHashCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">BCrypt Tool</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Generation Section */}
                <div className="flex flex-col gap-4 p-6 bg-card border border-border rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-lg font-semibold border-b border-border pb-2">
                        <Key className="w-5 h-5 text-primary" />
                        <h3>Generate Hash</h3>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-muted-foreground">Plain Text Password</label>
                        <input
                            type="text"
                            value={plainText}
                            onChange={(e) => setPlainText(e.target.value)}
                            placeholder="Enter password to hash..."
                            className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-muted-foreground">Salt Rounds ({saltRounds})</label>
                        <input
                            type="range"
                            min="4"
                            max="15"
                            value={saltRounds}
                            onChange={(e) => setSaltRounds(parseInt(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground px-1">
                            <span>Faster (4)</span>
                            <span>Slower (15)</span>
                        </div>
                    </div>

                    <button
                        onClick={handleHash}
                        disabled={!plainText || isHashing}
                        className="mt-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        {isHashing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                        {isHashing ? 'Hashing...' : 'Generate Hash'}
                    </button>

                    {generatedHash && (
                        <div className="mt-4 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-muted-foreground">Resulting Hash</label>
                                <button
                                    onClick={copyHash}
                                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                                >
                                    {hashCopied ? <Check className="w-3 h-3" /> : <Clipboard className="w-3 h-3" />}
                                    {hashCopied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <div className="p-3 bg-muted rounded-md font-mono text-xs break-all border border-border select-all">
                                {generatedHash}
                            </div>
                        </div>
                    )}
                </div>

                {/* Verification Section */}
                <div className="flex flex-col gap-4 p-6 bg-card border border-border rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-lg font-semibold border-b border-border pb-2">
                        <Unlock className="w-5 h-5 text-primary" />
                        <h3>Verify Password</h3>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-muted-foreground">Password to Verify</label>
                        <input
                            type="text"
                            value={verifyPassword}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            placeholder="Enter plain text password..."
                            className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-muted-foreground">Hash to Compare Against</label>
                        <textarea
                            value={verifyHash}
                            onChange={(e) => setVerifyHash(e.target.value)}
                            placeholder="Paste BCrypt hash here..."
                            rows={3}
                            className="w-full px-4 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm resize-none"
                        />
                    </div>

                    <button
                        onClick={handleVerify}
                        disabled={!verifyPassword || !verifyHash || isComparing}
                        className="mt-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
                    >
                        {isComparing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        {isComparing ? 'Verifying...' : 'Verify Match'}
                    </button>

                    {isMatch !== null && (
                        <div className={`mt-4 p-4 rounded-md border flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300 ${
                            isMatch 
                                ? 'bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400' 
                                : 'bg-red-500/10 border-red-500/50 text-red-700 dark:text-red-400'
                        }`}>
                            {isMatch ? <Check className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                            <span className="font-semibold">
                                {isMatch ? 'Passwords Match!' : 'Passwords do NOT match.'}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 bg-accent/30 rounded-lg border border-border">
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    Security Note
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    BCrypt is a password hashing function designed by Niels Provos and David Mazières, 
                    based on the Blowfish cipher. It incorporates a salt to protect against rainbow table attacks 
                    and is an adaptive function: over time, the iteration count can be increased to make it slower, 
                    so it remains resistant to brute-force search attacks even with increasing computing power.
                </p>
            </div>
        </div>
    );
}
