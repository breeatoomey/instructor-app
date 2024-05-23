import { AstNode, LangiumDocument, MultilineCommentHoverProvider } from 'langium';
import { Hover, HoverParams } from 'vscode-languageclient';
export declare class ZModelHoverProvider extends MultilineCommentHoverProvider {
    getHoverContent(document: LangiumDocument<AstNode>, params: HoverParams): Promise<Hover | undefined>;
}
