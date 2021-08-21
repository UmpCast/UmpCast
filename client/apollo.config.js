module.exports = {
  client: {
    service: {
      name: 'umpcast-client',
      localSchemaFile: 'client/src/schema.graphql',
    },
    includes: ['src/**/*.{ts,tsx}', 'App.tsx'],
    excludes: ['**/__tests__/**', 'src/{generated,mocks}/*'],
  },
}
