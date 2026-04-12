import UnpluginTypia from '@typia/unplugin/bun';
import * as fs from "fs-extra";
import path from "node:path";
import package_json from "../package.json";

const root_dirname = path.resolve(import.meta.dirname, '..');
const native_deps_dirname = path.resolve(root_dirname, "native_deps");
const build_dest_dirname = path.resolve(root_dirname, 'dist');

await Bun.build({
  entrypoints: [
    `${root_dirname}/src/app.ts`
  ],

  compile: {
    target: "bun-windows-x64",
    outfile: `${build_dest_dirname}/${package_json.name}.exe`,

    windows: {
      title: package_json.name,
      description: package_json.description,
      version: package_json.version,
      publisher: package_json.author,
      copyright: "Copyright (c) 2026 pandev, MIT License",
      //Note: "icon" currently does not work: https://github.com/oven-sh/bun/issues/19916
    }
  },
  naming: {
    asset: "[name].[ext]"
  },

  minify: false,
  sourcemap: false,
  bytecode: true,

  plugins: [UnpluginTypia()]
});

// Copy native dependencies to build folder
fs.copySync(
  native_deps_dirname,
  path.resolve(build_dest_dirname, 'native_deps'),
);