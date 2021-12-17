module.exports = {
    client: {
        service: {
            name: 'umpcast-client',
            localSchemaFile: 'src/apollo/schema.graphql'
        },
        excludes: ['**/__tests__/*']
    }
}
