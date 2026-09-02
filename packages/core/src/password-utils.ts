import bcrypt from 'bcryptjs';

/**
 * Hashes a password using BCrypt.
 * @param password The plain-text password to hash.
 * @param saltRounds The number of salt rounds (default: 10).
 * @returns A promise that resolves to the hashed password.
 */
export async function hashPassword(password: string, saltRounds: number = 10): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) reject(err);
            else if (hash === undefined) reject(new Error('Hash is undefined'));
            else resolve(hash);
        });
    });
}

/**
 * Compares a plain-text password with a BCrypt hash.
 * @param password The plain-text password to check.
 * @param hash The BCrypt hash to compare against.
 * @returns A promise that resolves to true if they match, false otherwise.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, isMatch) => {
            if (err) reject(err);
            else if (isMatch === undefined) reject(new Error('Comparison result is undefined'));
            else resolve(isMatch);
        });
    });
}

/**
 * Synchronously hashes a password using BCrypt.
 * @param password The plain-text password to hash.
 * @param saltRounds The number of salt rounds (default: 10).
 * @returns The hashed password.
 */
export function hashPasswordSync(password: string, saltRounds: number = 10): string {
    return bcrypt.hashSync(password, saltRounds);
}

/**
 * Synchronously compares a plain-text password with a BCrypt hash.
 * @param password The plain-text password to check.
 * @param hash The BCrypt hash to compare against.
 * @returns True if they match, false otherwise.
 */
export function comparePasswordSync(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
}
