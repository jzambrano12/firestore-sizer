// rollup.config.js
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/index.cjs.js",
      format: "cjs", // CommonJS
      exports: "default",
    },
    plugins: [resolve(), commonjs()],
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/index.esm.js",
      format: "esm", // ES module
    },
    plugins: [resolve(), commonjs()],
  },
];
