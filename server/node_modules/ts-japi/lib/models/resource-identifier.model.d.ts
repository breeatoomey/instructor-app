import Meta from './meta.model';
/** @internal */
export interface ResourceIdentifierOptions {
    meta?: Meta;
}
export default class ResourceIdentifier {
    type: string;
    id: string;
    meta?: Meta;
    constructor(id: string, type: string, options: ResourceIdentifierOptions);
    getKey(): string;
}
//# sourceMappingURL=resource-identifier.model.d.ts.map