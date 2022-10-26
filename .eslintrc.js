module.exports = {
    root: true,
    env: {
        es2021: true,
        mocha: true
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["./tsconfig.json"]
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier"
    ],
    rules: {
        quotes: ["error", "double"],
        "eol-last": ["error"],
        "max-len": ["error", { code: 120, ignoreUrls: true }],
        "no-trailing-spaces": ["error"]
    },
    overrides: []
};
