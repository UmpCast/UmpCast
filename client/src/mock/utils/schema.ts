import base from '../typeDefs/base.graphql'
import common from '../typeDefs/common.graphql'
import email from '../typeDefs/email.graphql'
import user from '../typeDefs/user.graphql'

import { makeExecutableSchema } from '@graphql-tools/schema'

const mockSchema = makeExecutableSchema({
    typeDefs: [base, common, email, user]
})

export default mockSchema
