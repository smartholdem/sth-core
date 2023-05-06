import { Container, Contracts, Exceptions } from "@smartholdem/core-kernel";
import { Interfaces, Transactions } from "@smartholdem/crypto";

@Container.injectable()
export class SecondSignatureVerification implements Contracts.Transactions.SecondSignatureVerification {
    public verifySecondSignature(transaction: Interfaces.ITransactionData, publicKey: string): boolean {
        return Transactions.Verifier.verifySecondSignature(transaction, publicKey);
    }

    public clear(transactionId: string): void {
        throw new Exceptions.Runtime.NotImplemented(this.constructor.name, "clear");
    }
}
