export declare class Cache {
    private _cache;
    private _ttl;
    private _debug;
    private _size;
    constructor(options?: OptionalConstructor);
    /**
     * Add new key:value on memory cache.
     * @param {string} key Key to chache in memory.
     * @param {string} value Required value to save on cache.
     * @param {number} time expired time in ms.
     * @returns {string} saved value.
     */
    put(key: string, value: string, time?: number): string;
    /**
     * Delete key:value from memory cache.
     * @param {string} key Key to delete chache.
     * @returns {boolean} canDelete.
     */
    del(key: string): boolean;
    private _del;
    /**
     * Clean cache.
     * @returns {void}
     */
    clear(): void;
    /**
     * Get value on memory cache.
     * @param {string} key Key to get chached value.
     * @returns {string|null} Return saved value.
     */
    get(key: string): string | null;
    /**
     * Get cache size.
     * @returns {number} Return cache size.
     */
    size(): number;
    /**
     * Set debug mode.
     * @param {boolean} bool
     * @returns {void}
     */
    debug(bool: boolean): void;
    /**
     * Get if in debug mode.
     * @returns {boolean}
     */
    inDebug(): boolean;
    /**
     * Get all keys on memory
     * @returns {string[]}
     */
    keys(): string[];
    exportJson(): object;
}
interface OptionalConstructor {
    debug?: boolean;
    ttl?: number;
}
export {};
