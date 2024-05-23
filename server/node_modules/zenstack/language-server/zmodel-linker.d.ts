import { DefaultLinker, LangiumDocument, LangiumServices } from 'langium';
import { CancellationToken } from 'vscode-jsonrpc';
/**
 * Langium linker implementation which links references and resolves expression types
 */
export declare class ZModelLinker extends DefaultLinker {
    private readonly descriptions;
    constructor(services: LangiumServices);
    link(document: LangiumDocument, cancelToken?: CancellationToken): Promise<void>;
    private linkReference;
    private resolveFromScopeProviders;
    private resolve;
    private resolveBinary;
    private resolveUnary;
    private resolveObject;
    private resolveReference;
    private resolveArray;
    private resolveInvocation;
    private resolveLiteral;
    private resolveMemberAccess;
    private resolveCollectionPredicate;
    private resolveThis;
    private resolveNull;
    private resolveAttributeArg;
    private unresolvableRefExpr;
    private findAttrParamForArg;
    private resolveDataModel;
    private resolveDataModelField;
    private resolveDefault;
    private resolveToDeclaredType;
    private resolveToBuiltinTypeOrDecl;
}
