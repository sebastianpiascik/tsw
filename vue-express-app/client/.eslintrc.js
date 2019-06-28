module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        indent: ["error", 2],
        semi: ["error", "always"],
        // quotes: ["error", "double"]
    },
    overrides: [
        {
            files: ["*.vue"],
            rules: {
                indent: "off",
                "vue/script-indent": [
                    "error",
                    2,
                    {
                        baseIndent: 1
                    }
                ],
                "vue/html-indent": [
                    "error",
                    2,
                    {
                        baseIndent: 1
                    }
                ],
                "vue/max-attributes-per-line": "off"
            }
        }
    ],
    parserOptions: {
        parser: "babel-eslint"
    }
};
