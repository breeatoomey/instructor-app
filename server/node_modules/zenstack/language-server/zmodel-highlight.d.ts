import { DefaultDocumentHighlightProvider, LangiumDocument } from 'langium';
import { DocumentHighlight, DocumentHighlightParams } from 'vscode-languageserver';
export declare class ZModelHighlightProvider extends DefaultDocumentHighlightProvider {
    getDocumentHighlight(document: LangiumDocument, params: DocumentHighlightParams): Promise<DocumentHighlight[] | undefined>;
}
