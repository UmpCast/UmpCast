import { makeExecutableSchema } from '@graphql-tools/schema'
import base from '../typeDefs/base.graphql'
import common from '../typeDefs/common.graphql'
import email from '../typeDefs/email.graphql'
import user from '../typeDefs/user.graphql'

const mockSchema = makeExecutableSchema({
    typeDefs: [base, common, email, user]
})

export default mockSchema
