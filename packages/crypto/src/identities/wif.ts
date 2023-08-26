import { WIF as Identity } from "@smartholdem/crypto-identities";

import { IKeyPair } from "../interfaces";
import { Network } from "../interfaces/networks";
import { getWifFromNetwork } from "./helpers";

export class WIF {
    public static fromPassphrase(passphrase: string, network?: Network): string {
        return Identity.fromPassphrase(passphrase, { wif: getWifFromNetwork(network) });
    }

    public static fromKeys(keys: IKeyPair, network?: Network): string {
        return Identity.fromKeys(keys, { wif: getWifFromNetwork(network) });
    }
}
