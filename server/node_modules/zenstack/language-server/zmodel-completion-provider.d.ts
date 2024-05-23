import { AstNodeDescription, CompletionAcceptor, CompletionContext, CompletionProviderOptions, CompletionValueItem, DefaultCompletionProvider, LangiumDocument, LangiumServices, MaybePromise, NextFeature } from 'langium';
import { CompletionList, CompletionParams } from 'vscode-languageserver';
export declare class ZModelCompletionProvider extends DefaultCompletionProvider {
    private readonly services;
    constructor(services: LangiumServices);
    readonly completionOptions?: CompletionProviderOptions;
    getCompletion(document: LangiumDocument, params: CompletionParams): Promise<CompletionList | undefined>;
    completionFor(context: CompletionContext, next: NextFeature, acceptor: CompletionAcceptor): MaybePromise<void>;
    private getCompletionFromHint;
    private getUnfilledAttributeParams;
    completionForCrossReference(context: CompletionContext, crossRef: any, acceptor: CompletionAcceptor): MaybePromise<void>;
    completionForKeyword(context: CompletionContext, keyword: any, acceptor: CompletionAcceptor): MaybePromise<void>;
    private filterKeywordForContext;
    private filterAttributeApplicationCompletion;
    private getAttributeContextType;
    createReferenceCompletionItem(nodeDescription: AstNodeDescription): CompletionValueItem;
    private getFunctionInsertText;
    private getAttributeInsertText;
    private getAstNode;
    private getNodeDocumentation;
    private commentsToMarkdown;
}
