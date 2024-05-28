"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueCodes = exports.PLUGIN_MODULE_NAME = exports.STD_LIB_MODULE_NAME = exports.SCALAR_TYPES = exports.SUPPORTED_PROVIDERS = void 0;
/**
 * Supported Prisma db providers
 */
exports.SUPPORTED_PROVIDERS = ['sqlite', 'postgresql', 'mysql', 'sqlserver', 'cockroachdb'];
/**
 * All scalar types
 */
exports.SCALAR_TYPES = ['String', 'Int', 'Float', 'Decimal', 'BigInt', 'Boolean', 'Bytes', 'DateTime'];
/**
 * Name of standard library module
 */
exports.STD_LIB_MODULE_NAME = 'stdlib.zmodel';
/**
 * Name of module contributed by plugins
 */
exports.PLUGIN_MODULE_NAME = 'plugin.zmodel';
/**
 * Validation issues
 */
var IssueCodes;
(function (IssueCodes) {
    IssueCodes["MissingOppositeRelation"] = "miss-opposite-relation";
})(IssueCodes || (exports.IssueCodes = IssueCodes = {}));
//# sourceMappingURL=constants.js.map