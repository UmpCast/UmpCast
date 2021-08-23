const path = require('path')

module.exports = {
    client: {
        service: {
            name: 'umpcast-client',
            localSchemaFile: path.resolve(__dirname, 'src/schema.graphql')
        },
        includes: ['src/**/*.{ts,tsx}', 'App.tsx'],
        excludes: ['**/__tests__/**', 'src/{generated,mocks}/*']
    }
}
