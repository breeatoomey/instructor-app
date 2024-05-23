import { AbstractFormatter, AstNode, ConfigurationProvider, LangiumDocument, LangiumServices, MaybePromise } from 'langium';
import { DocumentFormattingParams, FormattingOptions, TextEdit } from 'vscode-languageserver';
export declare class ZModelFormatter extends AbstractFormatter {
    private formatOptions?;
    private isPrismaStyle;
    protected readonly configurationProvider: ConfigurationProvider;
    constructor(services: LangiumServices);
    protected format(node: AstNode): void;
    formatDocument(document: LangiumDocument<AstNode>, params: DocumentFormattingParams): MaybePromise<TextEdit[]>;
    getFormatOptions(): FormattingOptions | undefined;
    getIndent(): number;
    setPrismaStyle(isPrismaStyle: boolean): void;
    private getFieldTypeLength;
}
