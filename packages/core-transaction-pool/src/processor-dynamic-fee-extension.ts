import { Container, Contracts } from "@smartholdem/core-kernel";
import { Interfaces } from "@smartholdem/crypto";

@Container.injectable()
export class ProcessorDynamicFeeExtension extends Contracts.TransactionPool.ProcessorExtension {
    @Container.inject(Container.Identifiers.TransactionPoolDynamicFeeMatcher)
    private readonly dynamicFeeMatcher!: Contracts.TransactionPool.DynamicFeeMatcher;

    public async throwIfCannotBroadcast(transaction: Interfaces.ITransaction): Promise<void> {
        await this.dynamicFeeMatcher.throwIfCannotBroadcast(transaction);
    }
}
