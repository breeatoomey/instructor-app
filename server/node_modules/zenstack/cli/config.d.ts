import z from 'zod';
declare const schema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export type ConfigType = z.infer<typeof schema>;
export declare let config: ConfigType;
/**
 * Loads and validates CLI configuration file.
 * @returns
 */
export declare function loadConfig(filename: string): void;
export {};
