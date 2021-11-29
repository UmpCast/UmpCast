module.exports = {
  plugins: ["jest"],
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:jest/recommended",
    "prettier",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    semi: ["error", "never"],
    "import/prefer-default-export": "off",
    "react/function-component-definition": [
      "error",
      { namedComponents: "function-declaration" },
    ],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
