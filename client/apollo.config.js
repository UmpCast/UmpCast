module.exports = {
    client: {
        service: {
            name: 'umpcast-client',
            localSchemaFile: 'src/mock/schema.graphql'
        },
        excludes: ['**/__tests__/*']
    }
}
