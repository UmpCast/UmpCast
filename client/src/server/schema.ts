import { makeExecutableSchema } from '@graphql-tools/schema'

// graphql plugin import errors on absolute paths
import entry from '../graphql/typeDefs/entry.graphql'
import _enum from '../graphql/typeDefs/enum.graphql'
import input from '../graphql/typeDefs/input.graphql'
import model from '../graphql/typeDefs/model.graphql'
import payload from '../graphql/typeDefs/payload.graphql'
import scalar from '../graphql/typeDefs/scalar.graphql'

export const mockSchema = makeExecutableSchema({
    typeDefs: [entry, _enum, input, model, payload, scalar]
})
