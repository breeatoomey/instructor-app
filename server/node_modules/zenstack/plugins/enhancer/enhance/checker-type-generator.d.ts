import type { Model } from '@zenstackhq/sdk/ast';
/**
 * Generates a `ModelCheckers` interface that contains a `check` method for each model in the schema.
 *
 * E.g.:
 *
 * ```ts
 * type CheckerOperation = 'create' | 'read' | 'update' | 'delete';
 *
 * export interface ModelCheckers {
 *    user: { check(op: CheckerOperation, args?: { email?: string; age?: number; }): Promise<boolean> },
 *    ...
 * }
 * ```
 */
export declare function generateCheckerType(model: Model): string;
