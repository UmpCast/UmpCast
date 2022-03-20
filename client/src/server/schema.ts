import { makeExecutableSchema } from '@graphql-tools/schema'

// graphql plugin import errors on absolute paths
import division from './schema/division.graphql'
import firebase from './schema/firebase.graphql'
import organization from './schema/organization.graphql'
import position from './schema/position.graphql'
import root from './schema/root.graphql'
import season from './schema/season.graphql'
import user from './schema/user.graphql'

export const mockSchema = makeExecutableSchema({
    typeDefs: [division, firebase, organization, position, root, season, user]
})
