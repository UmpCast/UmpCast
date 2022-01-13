import { makeExecutableSchema } from '@graphql-tools/schema'

// graphql plugin import errors on absolute paths
import base from '../../graphql/typeDefs/base.graphql'
import common from '../../graphql/typeDefs/common.graphql'
import email from '../../graphql/typeDefs/email.graphql'
import user from '../../graphql/typeDefs/user.graphql'

export const mockSchema = makeExecutableSchema({
    typeDefs: [base, common, email, user]
})
