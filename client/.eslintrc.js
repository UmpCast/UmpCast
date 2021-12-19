module.exports = {
    extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:jest/recommended',
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
        // some files may eventually contain more than 1 export
        'import/prefer-default-export': 'off',
        'react/function-component-definition': [
            'error',
            {
                namedComponents: 'function-declaration'
            }
        ],
        semi: ['error', 'never']
    },
    settings: {
        'import/resolver': {
            typescript: {}
        }
    }
}
