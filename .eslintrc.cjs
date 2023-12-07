const path = require("path")

/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: { project: path.join(__dirname, "tsconfig.json") },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
  ],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "clsx",
            message: "Use `import { cn } from '@/utilities/cn'` instead.",
          },
        ],
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "object",
          "unknown",
        ],
        pathGroups: [
          {
            pattern: "*.{jpg,png,svg}",
            group: "object",
            patternOptions: { matchBase: true },
            position: "after",
          },
          {
            pattern: "*.{css,scss}",
            group: "unknown",
            patternOptions: { matchBase: true },
            position: "after",
          },
          {
            pattern: "@/**",
            group: "parent",
          },
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true,
        ignoreCase: true,
        allowSeparatedGroups: true,
      },
    ],
    "import/newline-after-import": "error",
    curly: ["error", "all"],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "react-hooks/rules-of-hooks": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "import/no-unused-modules": [
      "warn",
      {
        unusedExports: true,
        ignoreExports: ["app/**/page.tsx", "./*.ts", "app/**/layout.tsx"],
      },
    ],
    "@typescript-eslint/prefer-nullish-coalescing": "off",
  },
}

module.exports = config
