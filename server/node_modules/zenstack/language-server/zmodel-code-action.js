"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZModelCodeActionProvider = void 0;
const ast_1 = require("@zenstackhq/language/ast");
const langium_1 = require("langium");
const sdk_1 = require("@zenstackhq/sdk");
const vscode_languageserver_1 = require("vscode-languageserver");
const constants_1 = require("./constants");
class ZModelCodeActionProvider {
    constructor(services) {
        this.reflection = services.shared.AstReflection;
        this.indexManager = services.shared.workspace.IndexManager;
        this.formatter = services.lsp.Formatter;
        this.documents = services.shared.workspace.LangiumDocuments;
    }
    getCodeActions(document, params) {
        const result = [];
        const acceptor = (ca) => ca && result.push(ca);
        for (const diagnostic of params.context.diagnostics) {
            this.createCodeActions(diagnostic, document, acceptor);
        }
        return result;
    }
    createCodeActions(diagnostic, document, accept) {
        switch (diagnostic.code) {
            case constants_1.IssueCodes.MissingOppositeRelation:
                accept(this.fixMissingOppositeRelation(diagnostic, document));
        }
        return undefined;
    }
    fixMissingOppositeRelation(diagnostic, document) {
        var _a, _b;
        const data = diagnostic.data;
        const rootCst = data.relationFieldDocUri == document.textDocument.uri
            ? document.parseResult.value
            : (_a = this.documents.all.find((doc) => doc.textDocument.uri === data.relationFieldDocUri)) === null || _a === void 0 ? void 0 : _a.parseResult.value;
        if (rootCst) {
            const fieldModel = rootCst;
            const fieldAstNode = (_b = fieldModel.declarations.find((x) => (0, ast_1.isDataModel)(x) && x.name === data.relationDataModelName)) === null || _b === void 0 ? void 0 : _b.fields.find((x) => x.name === data.relationFieldName);
            if (!fieldAstNode)
                return undefined;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const oppositeModel = fieldAstNode.type.reference.ref;
            const currentModel = document.parseResult.value;
            const container = currentModel.declarations.find((decl) => decl.name === data.dataModelName && (0, ast_1.isDataModel)(decl));
            if (container && container.$cstNode) {
                // indent
                let indent = '\t';
                const formatOptions = this.formatter.getFormatOptions();
                if (formatOptions === null || formatOptions === void 0 ? void 0 : formatOptions.insertSpaces) {
                    indent = ' '.repeat(formatOptions.tabSize);
                }
                indent = indent.repeat(this.formatter.getIndent());
                let newText = '';
                if (fieldAstNode.type.array) {
                    // post Post[]
                    const idField = (0, sdk_1.getModelFieldsWithBases)(container).find((f) => f.attributes.find((attr) => { var _a; return ((_a = attr.decl.ref) === null || _a === void 0 ? void 0 : _a.name) === '@id'; }));
                    // if no id field, we can't generate reference
                    if (!idField) {
                        return undefined;
                    }
                    const typeName = container.name;
                    const fieldName = this.lowerCaseFirstLetter(typeName);
                    // might already exist
                    let referenceField = '';
                    const idFieldName = idField.name;
                    const referenceIdFieldName = fieldName + this.upperCaseFirstLetter(idFieldName);
                    if (!(0, sdk_1.getModelFieldsWithBases)(oppositeModel).find((f) => f.name === referenceIdFieldName)) {
                        referenceField = '\n' + indent + `${referenceIdFieldName} ${idField.type.type}`;
                    }
                    newText =
                        '\n' +
                            indent +
                            `${fieldName} ${typeName} @relation(fields: [${referenceIdFieldName}], references: [${idFieldName}])` +
                            referenceField +
                            '\n';
                }
                else {
                    // user User @relation(fields: [userAbc], references: [id])
                    const typeName = container.name;
                    const fieldName = this.lowerCaseFirstLetter(typeName);
                    newText = '\n' + indent + `${fieldName} ${typeName}[]` + '\n';
                }
                // the opposite model might be in the imported file
                const targetDocument = (0, langium_1.getDocument)(oppositeModel);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const endOffset = oppositeModel.$cstNode.end - 1;
                const position = targetDocument.textDocument.positionAt(endOffset);
                return {
                    title: `Add opposite relation fields on ${oppositeModel.name}`,
                    kind: vscode_languageserver_1.CodeActionKind.QuickFix,
                    diagnostics: [diagnostic],
                    isPreferred: false,
                    edit: {
                        changes: {
                            [targetDocument.textDocument.uri]: [
                                {
                                    range: {
                                        start: position,
                                        end: position,
                                    },
                                    newText,
                                },
                            ],
                        },
                    },
                };
            }
        }
        return undefined;
    }
    lowerCaseFirstLetter(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
    upperCaseFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
exports.ZModelCodeActionProvider = ZModelCodeActionProvider;
//# sourceMappingURL=zmodel-code-action.js.map