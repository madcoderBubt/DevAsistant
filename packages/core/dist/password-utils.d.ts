/**
 * Hashes a password using BCrypt.
 * @param password The plain-text password to hash.
 * @param saltRounds The number of salt rounds (default: 10).
 * @returns A promise that resolves to the hashed password.
 */
export declare function hashPassword(password: string, saltRounds?: number): Promise<string>;
/**
 * Compares a plain-text password with a BCrypt hash.
 * @param password The plain-text password to check.
 * @param hash The BCrypt hash to compare against.
 * @returns A promise that resolves to true if they match, false otherwise.
 */
export declare function comparePassword(password: string, hash: string): Promise<boolean>;
/**
 * Synchronously hashes a password using BCrypt.
 * @param password The plain-text password to hash.
 * @param saltRounds The number of salt rounds (default: 10).
 * @returns The hashed password.
 */
export declare function hashPasswordSync(password: string, saltRounds?: number): string;
/**
 * Synchronously compares a plain-text password with a BCrypt hash.
 * @param password The plain-text password to check.
 * @param hash The BCrypt hash to compare against.
 * @returns True if they match, false otherwise.
 */
export declare function comparePasswordSync(password: string, hash: string): boolean;
