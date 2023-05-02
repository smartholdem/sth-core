import { Interfaces } from "@smartholdem/crypto";

export interface DynamicFeeMatcher {
    throwIfCannotEnterPool(transaction: Interfaces.ITransaction): Promise<void>;
    throwIfCannotBroadcast(transaction: Interfaces.ITransaction): Promise<void>;
}
