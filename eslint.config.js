/**
 * # Knowledj.
 * eslint.config.js
 */
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginTs from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  /* Rust sources, build output and static assets are not ours to lint. */
  globalIgnores(["dist", "src-tauri", "public"]),

  /* Frontend code runs in the webview: browser globals (window, document…). */
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: { globals: globals.browser },
  },

  /* Config files (eslint.config.js, vite.config.ts) run under Node. */
  {
    files: ["*.config.{js,ts}"],
    languageOptions: { globals: globals.node },
  },

  /* Baseline: unused vars, accidental globals, undefined identifiers… */
  pluginJs.configs.recommended,

  /* TS parser + TS-aware rules; spread because it's an array of 3 configs. */
  ...pluginTs.configs.recommended,

  /* React: hooks correctness + React Compiler-era rules. */
  reactHooks.configs.flat.recommended,

  {
    rules: {
      camelcase: "warn"
    }
  }
]);