"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_application_validator_1 = require("./attribute-application-validator");
/**
 * Validates attribute declarations.
 */
class AttributeValidator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    validate(attr, accept) {
        attr.attributes.forEach((attr) => (0, attribute_application_validator_1.validateAttributeApplication)(attr, accept));
    }
}
exports.default = AttributeValidator;
//# sourceMappingURL=attribute-validator.js.map