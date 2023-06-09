import { Interfaces, Transactions, Utils } from "@smartholdem/crypto";

import { MagistrateTransactionGroup, MagistrateTransactionType } from "../enums";
import { IBridgechainRegistrationAsset } from "../interfaces";
import { BridgechainRegistrationTransaction } from "../transactions";

export class BridgechainRegistrationBuilder extends Transactions.TransactionBuilder<BridgechainRegistrationBuilder> {
    public constructor() {
        super();
        this.data.version = 2;
        this.data.typeGroup = MagistrateTransactionGroup;
        this.data.type = MagistrateTransactionType.BridgechainRegistration;
        this.data.fee = BridgechainRegistrationTransaction.staticFee();
        this.data.amount = Utils.BigNumber.ZERO;
        this.data.asset = { bridgechainRegistration: {} };
    }

    public bridgechainRegistrationAsset(
        bridgechainAsset: IBridgechainRegistrationAsset,
    ): BridgechainRegistrationBuilder {
        if (this.data.asset && this.data.asset.bridgechainRegistration) {
            this.data.asset.bridgechainRegistration = bridgechainAsset;
        }

        return this;
    }

    public getStruct(): Interfaces.ITransactionData {
        const struct: Interfaces.ITransactionData = super.getStruct();
        struct.amount = this.data.amount;
        struct.asset = this.data.asset;
        return struct;
    }

    protected instance(): BridgechainRegistrationBuilder {
        return this;
    }
}
