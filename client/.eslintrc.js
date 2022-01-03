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
        // implicit expect - findBy raises error if not found
        'jest/expect-expect': [
            'error',
            {
                assertFunctionNames: ['expect', 'findBy*']
            }
        ],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/__tests__/*',
                    'src/mock/**/*',
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
                pathGroups: [
                    {
                        pattern: '@/**',
                        group: 'internal'
                    }
                ],
                'newlines-between': 'always'
            }
        ],
        // some files may eventually contain more than 1 export
        'import/prefer-default-export': 'off',
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'function-declaration'
            }
        ],
        // does not apply to typescript - props are clearly defined
        'react/jsx-props-no-spreading': 'off',
        semi: ['error', 'never']
    },
    settings: {
        'import/resolver': {
            typescript: {}
        }
    }
}
