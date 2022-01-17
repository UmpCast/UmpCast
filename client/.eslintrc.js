module.exports = {
    extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:jest/recommended',
        'plugin:react/jsx-runtime',
        'prettier'
    ],
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        '@typescript-eslint/naming-convention': [
            'error',
            {
                format: null,
                leadingUnderscore: 'allow',
                selector: 'variable'
            }
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    'src/{tests,utils/dev}/**/*',
                    'src/jest.setup.ts'
                ]
            }
        ],
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
        ],
        'import/prefer-default-export': 'off',
        'jest/expect-expect': [
            'error',
            {
                assertFunctionNames: ['expect', 'findBy*']
            }
        ],
        'no-underscore-dangle': 'off',
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'function-declaration'
            }
        ],
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-sort-props': ['error'],
        semi: ['error', 'never']
    },
    settings: {
        'import/resolver': {
            typescript: {}
        }
    }
}
