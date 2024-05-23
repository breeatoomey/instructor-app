"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZModelDefinitionProvider = void 0;
const langium_1 = require("langium");
const vscode_languageserver_1 = require("vscode-languageserver");
const ast_utils_1 = require("../utils/ast-utils");
const ast_1 = require("@zenstackhq/language/ast");
class ZModelDefinitionProvider extends langium_1.DefaultDefinitionProvider {
    constructor(services) {
        super(services);
        this.documents = services.shared.workspace.LangiumDocuments;
    }
    collectLocationLinks(sourceCstNode, _params) {
        var _a, _b, _c, _d;
        if ((0, ast_1.isModelImport)(sourceCstNode.element)) {
            const importedModel = (0, ast_utils_1.resolveImport)(this.documents, sourceCstNode.element);
            if (importedModel === null || importedModel === void 0 ? void 0 : importedModel.$document) {
                const targetObject = importedModel;
                const selectionRange = (_b = (_a = this.nameProvider.getNameNode(targetObject)) === null || _a === void 0 ? void 0 : _a.range) !== null && _b !== void 0 ? _b : vscode_languageserver_1.Range.create(0, 0, 0, 0);
                const previewRange = (_d = (_c = targetObject.$cstNode) === null || _c === void 0 ? void 0 : _c.range) !== null && _d !== void 0 ? _d : vscode_languageserver_1.Range.create(0, 0, 0, 0);
                return [
                    vscode_languageserver_1.LocationLink.create(importedModel.$document.uri.toString(), previewRange, selectionRange, sourceCstNode.range),
                ];
            }
            return undefined;
        }
        return super.collectLocationLinks(sourceCstNode, _params);
    }
}
exports.ZModelDefinitionProvider = ZModelDefinitionProvider;
//# sourceMappingURL=zmodel-definition.js.map