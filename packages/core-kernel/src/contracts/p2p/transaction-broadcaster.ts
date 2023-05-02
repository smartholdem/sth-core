import { Interfaces } from "@smartholdem/crypto";

export interface TransactionBroadcaster {
    broadcastTransactions(transactions: Interfaces.ITransaction[]): Promise<void>;
}
