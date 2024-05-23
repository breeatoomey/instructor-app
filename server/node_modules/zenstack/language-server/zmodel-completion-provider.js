"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZModelCompletionProvider = void 0;
const ast_1 = require("@zenstackhq/language/ast");
const sdk_1 = require("@zenstackhq/sdk");
const langium_1 = require("langium");
const ts_pattern_1 = require("ts-pattern");
const vscode_languageserver_1 = require("vscode-languageserver");
class ZModelCompletionProvider extends langium_1.DefaultCompletionProvider {
    constructor(services) {
        super(services);
        this.services = services;
        this.completionOptions = {
            triggerCharacters: ['@', '(', ',', '.'],
        };
    }
    getCompletion(document, params) {
        const _super = Object.create(null, {
            getCompletion: { get: () => super.getCompletion }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield _super.getCompletion.call(this, document, params);
            }
            catch (e) {
                console.error('Completion error:', e.message);
                return undefined;
            }
        });
    }
    completionFor(context, next, acceptor) {
        if ((0, ast_1.isDataModelAttribute)(context.node) || (0, ast_1.isDataModelFieldAttribute)(context.node)) {
            const completions = this.getCompletionFromHint(context.node);
            if (completions) {
                completions.forEach((c) => acceptor(context, c));
                return;
            }
        }
        return super.completionFor(context, next, acceptor);
    }
    getCompletionFromHint(contextNode) {
        // get completion based on the hint on the next unfilled parameter
        const unfilledParams = this.getUnfilledAttributeParams(contextNode);
        const nextParam = unfilledParams[0];
        if (!nextParam) {
            return undefined;
        }
        const hintAttr = (0, sdk_1.getAttribute)(nextParam, '@@@completionHint');
        if (hintAttr) {
            const hint = hintAttr.args[0];
            if (hint === null || hint === void 0 ? void 0 : hint.value) {
                if ((0, ast_1.isArrayExpr)(hint.value)) {
                    return hint.value.items.map((item) => {
                        return {
                            label: `${item.value}`,
                            kind: vscode_languageserver_1.CompletionItemKind.Value,
                            detail: 'Parameter',
                            sortText: '0',
                        };
                    });
                }
            }
        }
        return undefined;
    }
    // TODO: this doesn't work when the file contains parse errors
    getUnfilledAttributeParams(contextNode) {
        var _a;
        try {
            const params = (_a = contextNode.decl.ref) === null || _a === void 0 ? void 0 : _a.params;
            if (params) {
                const args = contextNode.args;
                let unfilledParams = [...params];
                args.forEach((arg) => {
                    if (arg.name) {
                        unfilledParams = unfilledParams.filter((p) => p.name !== arg.name);
                    }
                    else {
                        unfilledParams.shift();
                    }
                });
                return unfilledParams;
            }
        }
        catch (_b) {
            // noop
        }
        return [];
    }
    completionForCrossReference(context, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    crossRef, acceptor) {
        if (crossRef.property === 'member' && !(0, ast_1.isMemberAccessExpr)(context.node)) {
            // for guarding an error in the base implementation
            return;
        }
        const customAcceptor = (context, item) => {
            var _a, _b;
            // attributes starting with @@@ are for internal use only
            if (((_a = item.insertText) === null || _a === void 0 ? void 0 : _a.startsWith('@@@')) || ((_b = item.label) === null || _b === void 0 ? void 0 : _b.startsWith('@@@'))) {
                return;
            }
            if ('nodeDescription' in item) {
                const node = this.getAstNode(item.nodeDescription);
                if (!node) {
                    return;
                }
                // enums in stdlib are not supposed to be referenced directly
                if (((0, ast_1.isEnum)(node) || (0, ast_1.isEnumField)(node)) && (0, sdk_1.isFromStdlib)(node)) {
                    return;
                }
                if (((0, ast_1.isDataModelAttribute)(context.node) || (0, ast_1.isDataModelFieldAttribute)(context.node)) &&
                    !this.filterAttributeApplicationCompletion(context.node, node)) {
                    // node not matching attribute context
                    return;
                }
            }
            acceptor(context, item);
        };
        return super.completionForCrossReference(context, crossRef, customAcceptor);
    }
    completionForKeyword(context, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    keyword, acceptor) {
        const customAcceptor = (context, item) => {
            if (!this.filterKeywordForContext(context, keyword.value)) {
                return;
            }
            acceptor(context, item);
        };
        return super.completionForKeyword(context, keyword, customAcceptor);
    }
    filterKeywordForContext(context, keyword) {
        if ((0, ast_1.isInvocationExpr)(context.node)) {
            return ['true', 'false', 'null', 'this'].includes(keyword);
        }
        else if ((0, ast_1.isDataModelAttribute)(context.node) || (0, ast_1.isDataModelFieldAttribute)(context.node)) {
            const exprContext = this.getAttributeContextType(context.node);
            if (exprContext === 'DefaultValue') {
                return ['true', 'false', 'null'].includes(keyword);
            }
            else {
                return ['true', 'false', 'null', 'this'].includes(keyword);
            }
        }
        else {
            return true;
        }
    }
    filterAttributeApplicationCompletion(contextNode, node) {
        const attrContextType = this.getAttributeContextType(contextNode);
        if ((0, ast_1.isFunctionDecl)(node) && attrContextType) {
            // functions are excluded if they are not allowed in the current context
            const funcExprContextAttr = (0, sdk_1.getAttribute)(node, '@@@expressionContext');
            if (funcExprContextAttr && funcExprContextAttr.args[0]) {
                const arg = funcExprContextAttr.args[0];
                if ((0, ast_1.isArrayExpr)(arg.value)) {
                    return arg.value.items.some((item) => (0, sdk_1.isEnumFieldReference)(item) && item.target.$refText === attrContextType);
                }
            }
            return false;
        }
        if ((0, ast_1.isDataModelField)(node)) {
            // model fields are not allowed in @default
            return attrContextType !== 'DefaultValue';
        }
        return true;
    }
    getAttributeContextType(node) {
        return (0, ts_pattern_1.match)(node.decl.$refText)
            .with('@default', () => 'DefaultValue')
            .with(ts_pattern_1.P.union('@@allow', '@allow', '@@deny', '@deny'), () => 'AccessPolicy')
            .with('@@validate', () => 'ValidationRule')
            .otherwise(() => undefined);
    }
    createReferenceCompletionItem(nodeDescription) {
        const node = this.getAstNode(nodeDescription);
        const documentation = this.getNodeDocumentation(node);
        return (0, ts_pattern_1.match)(node)
            .when(ast_1.isDataModel, () => ({
            nodeDescription,
            kind: vscode_languageserver_1.CompletionItemKind.Class,
            detail: 'Data model',
            sortText: '1',
            documentation,
        }))
            .when(ast_1.isDataModelField, () => ({
            nodeDescription,
            kind: vscode_languageserver_1.CompletionItemKind.Field,
            detail: 'Data model field',
            sortText: '0',
            documentation,
        }))
            .when(ast_1.isEnum, () => ({
            nodeDescription,
            kind: vscode_languageserver_1.CompletionItemKind.Class,
            detail: 'Enum',
            sortText: '1',
            documentation,
        }))
            .when(ast_1.isEnumField, () => ({
            nodeDescription,
            kind: vscode_languageserver_1.CompletionItemKind.Enum,
            detail: 'Enum value',
            sortText: '1',
            documentation,
        }))
            .when(ast_1.isFunctionDecl, () => ({
            nodeDescription,
            insertText: this.getFunctionInsertText(nodeDescription),
            kind: vscode_languageserver_1.CompletionItemKind.Function,
            detail: 'Function',
            sortText: '1',
            documentation,
        }))
            .when(ast_1.isAttribute, () => ({
            nodeDescription,
            insertText: this.getAttributeInsertText(nodeDescription),
            kind: vscode_languageserver_1.CompletionItemKind.Property,
            detail: 'Attribute',
            sortText: '1',
            documentation,
        }))
            .otherwise(() => ({
            nodeDescription,
            kind: vscode_languageserver_1.CompletionItemKind.Reference,
            detail: nodeDescription.type,
            sortText: '2',
            documentation,
        }));
    }
    getFunctionInsertText(nodeDescription) {
        const node = this.getAstNode(nodeDescription);
        if ((0, ast_1.isFunctionDecl)(node)) {
            if (node.params.some((p) => !p.optional)) {
                return nodeDescription.name;
            }
        }
        return `${nodeDescription.name}()`;
    }
    getAttributeInsertText(nodeDescription) {
        const node = this.getAstNode(nodeDescription);
        if ((0, ast_1.isAttribute)(node)) {
            if (node.name === '@relation') {
                return `${nodeDescription.name}(fields: [], references: [])`;
            }
        }
        return nodeDescription.name;
    }
    getAstNode(nodeDescription) {
        let node = nodeDescription.node;
        if (!node) {
            const doc = this.services.shared.workspace.LangiumDocuments.getOrCreateDocument(nodeDescription.documentUri);
            if (!doc) {
                return undefined;
            }
            node = this.services.workspace.AstNodeLocator.getAstNode(doc.parseResult.value, nodeDescription.path);
            if (!node) {
                return undefined;
            }
        }
        return node;
    }
    getNodeDocumentation(node) {
        if (!node) {
            return undefined;
        }
        const md = this.commentsToMarkdown(node);
        return {
            kind: 'markdown',
            value: md,
        };
    }
    commentsToMarkdown(node) {
        var _a;
        const md = (_a = this.services.documentation.DocumentationProvider.getDocumentation(node)) !== null && _a !== void 0 ? _a : '';
        const zModelGenerator = new sdk_1.ZModelCodeGenerator();
        const docs = [];
        try {
            (0, ts_pattern_1.match)(node)
                .when(ast_1.isAttribute, (attr) => {
                const zModelGenerator = new sdk_1.ZModelCodeGenerator();
                docs.push('```prisma', zModelGenerator.generate(attr), '```');
            })
                .when(ast_1.isFunctionDecl, (func) => {
                docs.push('```ts', zModelGenerator.generate(func), '```');
            })
                .when(ast_1.isDataModel, (model) => {
                docs.push('```prisma', `model ${model.name} { ... }`, '```');
            })
                .when(ast_1.isEnum, (enumDecl) => {
                docs.push('```prisma', zModelGenerator.generate(enumDecl), '```');
            })
                .when(ast_1.isDataModelField, (field) => {
                var _a, _b;
                docs.push(`${field.name}: ${(_a = field.type.type) !== null && _a !== void 0 ? _a : (_b = field.type.reference) === null || _b === void 0 ? void 0 : _b.$refText}`);
            })
                .otherwise((ast) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const name = ast.name;
                if (name) {
                    docs.push(name);
                }
            });
        }
        catch (_b) {
            // noop
        }
        if (md) {
            docs.push('___', md);
        }
        return docs.join('\n');
    }
}
exports.ZModelCompletionProvider = ZModelCompletionProvider;
//# sourceMappingURL=zmodel-completion-provider.js.map