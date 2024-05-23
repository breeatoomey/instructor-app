"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_application_validator_1 = require("./attribute-application-validator");
/**
 * Validates function declarations.
 */
class FunctionDeclValidator {
    validate(funcDecl, accept) {
        funcDecl.attributes.forEach((attr) => (0, attribute_application_validator_1.validateAttributeApplication)(attr, accept));
    }
}
exports.default = FunctionDeclValidator;
//# sourceMappingURL=function-decl-validator.js.map