import { Container } from "@smartholdem/core-kernel";
import { Interfaces } from "@smartholdem/crypto";

import { Resource } from "../interfaces";

@Container.injectable()
export class BlockResource implements Resource {
    /**
     * Return the raw representation of the resource.
     *
     * @param {*} resource
     * @returns {object}
     * @memberof Resource
     */
    public raw(resource: Interfaces.IBlockData): object {
        return JSON.parse(JSON.stringify(resource));
    }

    /**
     * Return the transformed representation of the resource.
     *
     * @param {*} resource
     * @returns {object}
     * @memberof Resource
     */
    public transform(resource: Interfaces.IBlockData): object {
        throw new Error("Deprecated, use BlockWithTransactionsResources instead");
    }
}
