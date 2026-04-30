import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "cypress/videos/**",
      "cypress/screenshots/**",
      "**/*.min.js",
    ],
  },

  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha,
        ...globals.node,
        cy: "readonly",
        Cypress: "readonly",
        expect: "readonly",
        assert: "readonly",
      },
    },

    rules: {
      "no-var": "error",
      "no-unused-vars": "warn", 
    },
  },
]);