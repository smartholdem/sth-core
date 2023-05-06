import { Container, Contracts, Exceptions } from "@smartholdem/core-kernel";
import { Interfaces, Transactions } from "@smartholdem/crypto";

@Container.injectable()
export class MultiSignatureVerification implements Contracts.Transactions.MultiSignatureVerification {
    public verifySignatures(
        transaction: Interfaces.ITransactionData,
        multiSignatureAsset: Interfaces.IMultiSignatureAsset,
    ): boolean {
        return Transactions.Verifier.verifySignatures(transaction, multiSignatureAsset);
    }

    public clear(transactionId: string): void {
        throw new Exceptions.Runtime.NotImplemented(this.constructor.name, "clear");
    }
}
