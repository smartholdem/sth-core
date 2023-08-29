import { Interfaces } from "@smartholdem/crypto";

export interface Collator {
    getBlockCandidateTransactions(): Promise<Interfaces.ITransaction[]>;
}
