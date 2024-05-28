import { PackageManagers } from '../../utils/pkg-utils';
type Options = {
    prisma: string | undefined;
    packageManager: PackageManagers | undefined;
    versionCheck: boolean;
    tag?: string;
};
/**
 * CLI action for initializing an existing project
 */
export declare function init(projectPath: string, options: Options): Promise<void>;
export {};
