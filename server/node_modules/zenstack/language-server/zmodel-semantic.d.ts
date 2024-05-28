import { AbstractSemanticTokenProvider, AstNode, SemanticTokenAcceptor } from 'langium';
export declare class ZModelSemanticTokenProvider extends AbstractSemanticTokenProvider {
    protected highlightElement(node: AstNode, acceptor: SemanticTokenAcceptor): void;
}
