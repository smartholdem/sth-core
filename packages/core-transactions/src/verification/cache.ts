import { Container, Utils } from "@smartholdem/core-kernel";
import { Interfaces } from "@smartholdem/crypto";

@Container.injectable()
export class Cache<T> {
    protected cache: Map<string, T> = new Map();

    public clear(transactionId: string): void {
        this.cache.delete(transactionId);
    }

    protected getKey(transaction: Interfaces.ITransactionData): string {
        Utils.assert.defined<string>(transaction.id);
        return transaction.id;
    }
}
