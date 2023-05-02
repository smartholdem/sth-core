import { Interfaces } from "@smartholdem/crypto";

export interface DynamicFeeContext {
    transaction: Interfaces.ITransaction;
    addonBytes: number;
    satoshiPerByte: number;
    height: number;
}
