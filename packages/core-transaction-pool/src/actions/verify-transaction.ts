import { Services, Types } from "@smartholdem/core-kernel";
import { Handlers } from "@smartholdem/core-transactions";
import { Interfaces } from "@smartholdem/crypto";

export class VerifyTransactionAction extends Services.Triggers.Action {
    public async execute(args: Types.ActionArguments): Promise<boolean> {
        const handler: Handlers.TransactionHandler = args.handler;
        const transaction: Interfaces.ITransaction = args.transaction;

        return handler.verify(transaction);
    }
}
