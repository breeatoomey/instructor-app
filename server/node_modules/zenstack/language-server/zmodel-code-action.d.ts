import { AstReflection, CodeActionProvider, IndexManager, LangiumDocument, LangiumDocuments, LangiumServices, MaybePromise } from 'langium';
import { CodeAction, CodeActionParams, Command } from 'vscode-languageserver';
import { ZModelFormatter } from './zmodel-formatter';
export declare class ZModelCodeActionProvider implements CodeActionProvider {
    protected readonly reflection: AstReflection;
    protected readonly indexManager: IndexManager;
    protected readonly formatter: ZModelFormatter;
    protected readonly documents: LangiumDocuments;
    constructor(services: LangiumServices);
    getCodeActions(document: LangiumDocument, params: CodeActionParams): MaybePromise<Array<Command | CodeAction> | undefined>;
    private createCodeActions;
    private fixMissingOppositeRelation;
    private lowerCaseFirstLetter;
    private upperCaseFirstLetter;
}
