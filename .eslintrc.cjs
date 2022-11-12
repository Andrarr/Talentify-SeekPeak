module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "no-unused-vars": "off",
        "linebreak-style": "off",
        "import/extensions": "off",
        "quotes": [2, "double", { "avoidEscape": true , "allowTemplateLiterals": true }],
        indent: ["error", 4],
    },
};
