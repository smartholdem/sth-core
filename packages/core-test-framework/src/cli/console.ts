import { Application, ApplicationFactory, Commands, Container, Services, Utils } from "@smartholdem/core-cli";

/**
 * @export
 * @class Console
 */
export class Console {
    /**
     * @type {Application}
     * @memberof Console
     */
    public app: Application;

    /**
     * @memberof Console
     */
    public pkg = {
        name: "@smartholdem/core",
        description: "Core of the SmartHoldem Blockchain",
        version: "3.0.0-next.0",
    };

    /**
     * @memberof Console
     */
    public args;

    /**
     * @memberof Console
     */
    public flags;

    /**
     * @memberof Console
     */
    public constructor(private useDefaultFlags = true) {
        this.app = this.createApplication();
    }

    /**
     * @param {string[]} args
     * @returns {this}
     * @memberof Console
     */
    public withArgs(args: string[]): this {
        this.args = [""];
        this.args = this.args.concat(args);

        return this;
    }

    /**
     * @param {object} flags
     * @returns {this}
     * @memberof Console
     */
    public withFlags(flags: object): this {
        this.flags = { ...this.flags, ...flags };

        return this;
    }

    /**
     * @param {*} command
     * @returns {Promise<void>}
     * @memberof Console
     */
    public async execute(command): Promise<void> {
        this.app
            .rebind(Container.Identifiers.ApplicationPaths)
            .toConstantValue(
                this.app
                    .get<Services.Environment>(Container.Identifiers.Environment)
                    .getPaths(this.flags.token, this.flags.network),
            );

        const cmd = this.app.resolve<Commands.Command>(command);

        const castedFlags = Utils.castFlagsToString(this.flags)
            .split("--")
            .filter(Boolean)
            .map((flag: string) => `--${flag}`.trim());

        cmd.register(this.args ? this.args.concat(castedFlags) : castedFlags);

        await cmd.run();

        this.reset();
    }

    /**
     * @private
     * @memberof Console
     */
    private reset(): void {
        this.args = [];
        this.flags = this.useDefaultFlags ? { token: "sth", network: "testnet" } : {};
    }

    /**
     * @private
     * @returns {Application}
     * @memberof Console
     */
    private createApplication(): Application {
        const app = ApplicationFactory.make(new Container.Container(), this.pkg);

        this.flags = this.useDefaultFlags ? { token: "sth", network: "testnet" } : {};

        return app;
    }
}
