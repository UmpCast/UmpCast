module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            typescript: true
        }
    },
    plugins: ['import'],
    rules: {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        'import/order': [
            'error',
            {
                alphabetize: {
                    order: 'asc'
                },
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling'
                ],
                'newlines-between': 'always',
                pathGroups: [
                    {
                        group: 'internal',
                        pattern: '@/**'
                    }
                ]
            }
        ]
    }
}
