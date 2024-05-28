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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.description = exports.name = void 0;
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const generator_1 = require("./generator");
exports.name = 'Zod';
exports.description = 'Generating Zod schemas';
const run = (model, options, dmmf, globalOptions) => __awaiter(void 0, void 0, void 0, function* () {
    (0, tiny_invariant_1.default)(dmmf);
    const generator = new generator_1.ZodSchemaGenerator(model, options, dmmf, globalOptions);
    return generator.generate();
});
exports.default = run;
//# sourceMappingURL=index.js.map