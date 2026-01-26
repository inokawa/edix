import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { dirname } from "node:path";
import pkg from "./package.json" with { type: "json" };

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      outDir: ".",
      declaration: true,
      declarationDir: dirname(pkg.types),
      exclude: ["**/*.{spec,stories}.*"],
    }),
    terser({
      ecma: 2018,
      module: true,
      compress: { passes: 5, unsafe: true, keep_fargs: false },
      mangle: { properties: { regex: "^_" } },
      format: {
        beautify: true, // FIXME replace with prettier
      },
    }),
  ],
  external: (id) =>
    [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ].some((d) => id.startsWith(d)),
};
