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
exports.ZModelHighlightProvider = void 0;
const langium_1 = require("langium");
class ZModelHighlightProvider extends langium_1.DefaultDocumentHighlightProvider {
    getDocumentHighlight(document, params) {
        const _super = Object.create(null, {
            getDocumentHighlight: { get: () => super.getDocumentHighlight }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield _super.getDocumentHighlight.call(this, document, params);
            }
            catch (e) {
                console.error('Highlight error:', e.message);
                return undefined;
            }
        });
    }
}
exports.ZModelHighlightProvider = ZModelHighlightProvider;
//# sourceMappingURL=zmodel-highlight.js.map