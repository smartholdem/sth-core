import { Services, Types } from "@smartholdem/core-kernel";

import { DposState } from "../dpos";

export class BuildDelegateRankingAction extends Services.Triggers.Action {
    public async execute(args: Types.ActionArguments): Promise<void> {
        const dposState: DposState = args.dposState;

        return dposState.buildDelegateRanking();
    }
}
