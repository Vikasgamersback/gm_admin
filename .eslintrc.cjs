module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};

// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   extends: [
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:react/jsx-runtime",
//     "plugin:react-hooks/recommended",
//     "prettier",
//   ],
//   ignorePatterns: ["dist", ".eslintrc.cjs"],
//   parserOptions: { ecmaVersion: "latest", sourceType: "module" },
//   settings: { react: { version: "18.2" } },
//   plugins: ["react-refresh", "prettier"],
//   rules: {
//     "react-refresh/only-export-components": [
//       "warn",
//       { allowConstantExport: true },
//     ],
//     "prettier/prettier": "error",
//     "no-var": "error",
//     "no-unused-vars": "warn",
//     "no-unused-expressions": "warn",
//     "no-unused-labels": "warn",
//     "prefer-const": "error",
//     "no-use-before-define": "error",
//   },
// };
