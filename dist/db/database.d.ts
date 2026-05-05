import Database from "better-sqlite3";
export declare function getDb(): Database.Database;
export declare function initSchema(): void;
export declare function validateApiKey(key: string): boolean;
export declare function hasApiKeys(): boolean;
export declare function createApiKey(name: string, key: string): void;
export declare function addToWaitlist(email: string): {
    ok: boolean;
    already_exists: boolean;
};
export declare function getWaitlist(): {
    id: number;
    email: string;
    created_at: string;
}[];
//# sourceMappingURL=database.d.ts.map