import Link from '../models/link.model';
import { Dictionary, nullish } from '../types/global.types';
import Relationship from './relationship.model';
import ResourceIdentifier, { ResourceIdentifierOptions } from './resource-identifier.model';
/** @internal */
export interface ResourceOptions<T> extends ResourceIdentifierOptions {
    attributes?: Partial<T>;
    relationships?: Record<string, Relationship>;
    links?: Dictionary<Link>;
}
export default class Resource<T = Dictionary<any>> extends ResourceIdentifier {
    attributes?: Partial<T>;
    links?: Dictionary<Link | nullish>;
    relationships?: Record<string, Relationship>;
    constructor(id: string, type: string, options: ResourceOptions<T>);
}
//# sourceMappingURL=resource.model.d.ts.map