"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_application_validator_1 = require("./attribute-application-validator");
const utils_1 = require("./utils");
/**
 * Validates enum declarations.
 */
class EnumValidator {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    validate(_enum, accept) {
        (0, utils_1.validateDuplicatedDeclarations)(_enum, _enum.fields, accept);
        this.validateAttributes(_enum, accept);
        _enum.fields.forEach((field) => {
            this.validateField(field, accept);
        });
    }
    validateAttributes(_enum, accept) {
        _enum.attributes.forEach((attr) => (0, attribute_application_validator_1.validateAttributeApplication)(attr, accept));
    }
    validateField(field, accept) {
        field.attributes.forEach((attr) => (0, attribute_application_validator_1.validateAttributeApplication)(attr, accept));
    }
}
exports.default = EnumValidator;
//# sourceMappingURL=enum-validator.js.map