import { Interfaces } from "@smartholdem/crypto";

export interface SecondSignatureVerification {
    verifySecondSignature(transaction: Interfaces.ITransactionData, publicKey: string): boolean;

    clear(transactionId: string): void;
}

export interface MultiSignatureVerification {
    verifySignatures(
        transaction: Interfaces.ITransactionData,
        multiSignatureAsset: Interfaces.IMultiSignatureAsset,
    ): boolean;

    clear(transactionId: string): void;
}
