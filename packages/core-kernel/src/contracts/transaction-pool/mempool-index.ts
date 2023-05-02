import { Interfaces } from "@smartholdem/crypto";

export interface MempoolIndex {
    set(key: string, transaction: Interfaces.ITransaction): void;
    has(key: string): boolean;
    get(key: string): Interfaces.ITransaction;
    forget(key: string): void;
    clear(): void;
}
