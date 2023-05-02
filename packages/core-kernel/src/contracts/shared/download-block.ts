import { Interfaces } from "@smartholdem/crypto";

export interface DownloadBlock extends Omit<Interfaces.IBlockData, "transactions"> {
    transactions: string[];
}
