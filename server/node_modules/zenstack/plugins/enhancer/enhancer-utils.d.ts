import type { DataModelFieldAttribute } from '@zenstackhq/sdk/ast';
/**
 * Check if the given field attribute is a `@default` with `auth()` invocation
 */
export declare function isDefaultWithAuth(attr: DataModelFieldAttribute): boolean;
