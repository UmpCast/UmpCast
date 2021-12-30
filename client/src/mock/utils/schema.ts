import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

const mockSchema = loadSchemaSync('./src/**/*.graphql', {
    loaders: [new GraphQLFileLoader()]
})

export default mockSchema
