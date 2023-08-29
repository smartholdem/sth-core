import { Container, Contracts, Providers } from "@smartholdem/core-kernel";

export const getHeaders = (app: Contracts.Kernel.Application) => {
    const headers: {
        version: string | undefined;
        port: number | undefined;
        height: number | undefined;
    } = {
        version: app.version(),
        port: Number(
            app
                .getTagged<Providers.PluginConfiguration>(
                    Container.Identifiers.PluginConfiguration,
                    "plugin",
                    "@smartholdem/core-p2p",
                )
                .get<number>("port"),
        ),
        height: undefined,
    };

    const state: Contracts.State.StateStore = app.get<Contracts.State.StateStore>(Container.Identifiers.StateStore);
    if (state.isStarted()) {
        headers.height = app
            .get<Contracts.Blockchain.Blockchain>(Container.Identifiers.BlockchainService)
            .getLastHeight();
    }

    return headers;
};
