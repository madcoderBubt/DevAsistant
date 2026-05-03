import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword, hashPasswordSync, comparePasswordSync } from './password-utils';

describe('password-utils', () => {
    const password = 'mySecretPassword123';

    describe('async functions', () => {
        it('should hash a password and verify it', async () => {
            const hash = await hashPassword(password);
            expect(hash).toBeDefined();
            expect(hash).not.toBe(password);
            
            const isMatch = await comparePassword(password, hash);
            expect(isMatch).toBe(true);
        });

        it('should return false for incorrect password', async () => {
            const hash = await hashPassword(password);
            const isMatch = await comparePassword('wrongPassword', hash);
            expect(isMatch).toBe(false);
        });
    });

    describe('sync functions', () => {
        it('should hash a password and verify it synchronously', () => {
            const hash = hashPasswordSync(password);
            expect(hash).toBeDefined();
            expect(hash).not.toBe(password);
            
            const isMatch = comparePasswordSync(password, hash);
            expect(isMatch).toBe(true);
        });

        it('should return false for incorrect password synchronously', () => {
            const hash = hashPasswordSync(password);
            const isMatch = comparePasswordSync('wrongPassword', hash);
            expect(isMatch).toBe(false);
        });
    });

    it('should use different salts for different hashes of the same password', () => {
        const hash1 = hashPasswordSync(password);
        const hash2 = hashPasswordSync(password);
        expect(hash1).not.toBe(hash2);
    });
});
