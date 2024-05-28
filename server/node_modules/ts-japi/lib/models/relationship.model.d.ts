import { Dictionary, nullish } from '..';
import { ResourceLinkage } from '../interfaces/json-api.interface';
import Link from './link.model';
import Meta from './meta.model';
/** @internal */
export interface RelationshipOptions {
    links?: Dictionary<Link | nullish>;
    data?: ResourceLinkage;
    meta?: Meta;
}
export default class Relationship {
    links?: Dictionary<Link | nullish>;
    data?: ResourceLinkage;
    meta?: Meta;
    constructor(options: RelationshipOptions);
}
//# sourceMappingURL=relationship.model.d.ts.map