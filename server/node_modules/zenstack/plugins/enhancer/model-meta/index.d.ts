import { type PluginOptions } from '@zenstackhq/sdk';
import type { Model } from '@zenstackhq/sdk/ast';
import type { Project } from 'ts-morph';
export declare function generate(model: Model, options: PluginOptions, project: Project, outDir: string): Promise<void>;
