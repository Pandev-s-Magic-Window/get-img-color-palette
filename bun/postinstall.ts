import * as fs from "fs-extra";
import path from "node:path";

const is_windows = process.platform.includes("win");
//const is_linux = process.platform.includes("linux");

const root_dirname = path.resolve(import.meta.dirname, "..");

const node_modules_dirname = path.resolve(root_dirname, "node_modules");
const native_deps_dirname = path.resolve(root_dirname, "native_deps");

if (!await fs.pathExists(native_deps_dirname)) {
  await fs.mkdir(native_deps_dirname);
}

console.log('Cleaning native dependencies from root folder...');
await fs.emptyDir(native_deps_dirname);

console.log('Moving native dependencies to root folder...');

// Move sharp deps
const sharp_dirname = path.resolve(node_modules_dirname, "@img");
if (is_windows && await fs.pathExists(path.resolve(sharp_dirname, 'sharp-win32-x64'))) {
  await fs.copy(
    path.resolve(sharp_dirname, 'sharp-win32-x64', 'lib'),
    path.resolve(native_deps_dirname, 'sharp', 'win64'));
}

console.log("Done!");
