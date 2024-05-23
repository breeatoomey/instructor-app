export type PackageManagers = 'npm' | 'yarn' | 'pnpm';
/**
 * A type named FindUp that takes a type parameter e which extends boolean.
 * If e extends true, it returns a union type of string[] or undefined.
 * If e does not extend true, it returns a union type of string or undefined.
 *
 * @export
 * @template e A type parameter that extends boolean
 */
export type FindUp<e extends boolean> = e extends true ? string[] | undefined : string | undefined;
/**
 * Find and return file paths by searching parent directories based on the given names list and current working directory (cwd) path.
 * Optionally return a single path or multiple paths.
 * If multiple allowed, return all paths found.
 * If no paths are found, return undefined.
 *
 * @export
 * @template [e=false]
 * @param names An array of strings representing names to search for within the directory
 * @param cwd A string representing the current working directory
 * @param [multiple=false as e] A boolean flag indicating whether to search for multiple levels. Useful for finding node_modules directories...
 * @param [result=[]] An array of strings representing the accumulated results used in multiple results
 * @returns Path(s) to a specific file or folder within the directory or parent directories
 */
export declare function findUp<e extends boolean = false>(names: string[], cwd?: string, multiple?: e, result?: string[]): FindUp<e>;
/**
 * Find a Node module/file given its name in a specific directory, with a fallback to the current working directory.
 * If the name is empty, return undefined.
 * Try to resolve the module/file using require.resolve with the specified directory as the starting point.
 * Return the resolved path if successful, otherwise return undefined.
 *
 * @export
 * @param {string} name The name of the module/file to find
 * @param {string} [cwd=process.cwd()]
 * @returns {*} Finds a specified module or file using require.resolve starting from a specified directory path, or the current working directory if not provided.
 */
export declare function findNodeModulesFile(name: string, cwd?: string): string | undefined;
export declare function getPackageManager(searchStartPath?: string): {
    packageManager: string;
    lockFile: undefined;
    projectRoot: string;
} | {
    packageManager: string;
    lockFile: string;
    projectRoot: string;
};
export declare function installPackage(pkg: string, dev: boolean, pkgManager?: PackageManagers | undefined, tag?: string, projectPath?: string, exactVersion?: boolean): void;
export declare function ensurePackage(pkg: string, dev: boolean, pkgManager?: PackageManagers | undefined, tag?: string, projectPath?: string, exactVersion?: boolean): void;
/**
 * A function that searches for the nearest package.json file starting from the provided search path or the current working directory if no search path is provided.
 * It iterates through the directory structure going one level up at a time until it finds a package.json file. If no package.json file is found, it returns undefined.
 * @deprecated Use findUp instead @see findUp
 */
export declare function findPackageJson(searchPath?: string): string | undefined;
export declare function getPackageJson(searchPath?: string): any;
