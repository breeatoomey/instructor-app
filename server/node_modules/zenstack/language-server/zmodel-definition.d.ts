import { DefaultDefinitionProvider, LangiumDocuments, LangiumServices, LeafCstNode, MaybePromise } from 'langium';
import { DefinitionParams, LocationLink } from 'vscode-languageserver';
export declare class ZModelDefinitionProvider extends DefaultDefinitionProvider {
    protected documents: LangiumDocuments;
    constructor(services: LangiumServices);
    protected collectLocationLinks(sourceCstNode: LeafCstNode, _params: DefinitionParams): MaybePromise<LocationLink[] | undefined>;
}
