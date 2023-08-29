import { Services } from "@smartholdem/core-kernel";
import { Wallets } from "@smartholdem/core-state";
import { Identities } from "@smartholdem/crypto";
import { generateMnemonic } from "bip39";

import { getWalletAttributeSet } from "../../internal/wallet-attributes";
import { FactoryBuilder } from "../factory-builder";

export const registerWalletFactory = (factory: FactoryBuilder): void => {
    factory.set("Wallet", ({ options }) => {
        const passphrase: string = options.passphrase || generateMnemonic();

        const wallet: Wallets.Wallet = new Wallets.Wallet(
            Identities.Address.fromPassphrase(passphrase),
            new Services.Attributes.AttributeMap(getWalletAttributeSet()),
        );
        wallet.setPublicKey(Identities.PublicKey.fromPassphrase(passphrase));

        return wallet;
    });

    factory.get("Wallet").state("secondPublicKey", ({ entity }) => {
        entity.setAttribute("secondPublicKey", Identities.PublicKey.fromPassphrase(generateMnemonic()));

        return entity;
    });
};
