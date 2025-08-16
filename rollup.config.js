import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default [
  // UMD build (works in browsers and Node.js)
  {
    input: "src/index.ts",
    output: {
      file: "dist/bundle.umd.js",
      format: "umd",
      name: "SwrpgDice",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.rollup.json",
        declaration: false,
        declarationDir: undefined,
      }),
      production && terser(),
    ],
  },
  // ESM build (for modern bundlers)
  {
    input: "src/index.ts",
    output: {
      file: "dist/bundle.esm.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.rollup.json",
        declaration: false,
        declarationDir: undefined,
      }),
      production && terser(),
    ],
  },
  // CommonJS build (for Node.js require())
  {
    input: "src/index.ts",
    output: {
      file: "dist/bundle.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.rollup.json",
        declaration: false,
        declarationDir: undefined,
      }),
      production && terser(),
    ],
  },
];
