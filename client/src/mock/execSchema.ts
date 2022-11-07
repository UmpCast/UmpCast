import { makeExecutableSchema } from '@graphql-tools/schema'

// graphql plugin import errors on absolute paths
import DivisionMutation from './schema/Division/mutation.graphql'
import DivisionQuery from './schema/Division/query.graphql'
import GameMutation from './schema/Game/mutation.graphql'
import GameQuery from './schema/Game/query.graphql'
import GameListingMutation from './schema/GameListing/mutation.graphql'
import GameListingQuery from './schema/GameListing/query.graphql'
import OrganizationMutation from './schema/Organization/mutation.graphql'
import OrganizationQuery from './schema/Organization/query.graphql'
import PositionMutation from './schema/Position/mutation.graphql'
import PositionQuery from './schema/Position/query.graphql'
import SeasonMutation from './schema/Season/mutation.graphql'
import SeasonQuery from './schema/Season/query.graphql'
import UserMutation from './schema/User/mutation.graphql'
import UserQuery from './schema/User/query.graphql'
import Firebase from './schema/firebase.graphql'
import Root from './schema/root.graphql'

export const clientSchema = makeExecutableSchema({
    typeDefs: [
        DivisionMutation,
        DivisionQuery,
        GameMutation,
        GameQuery,
        GameListingMutation,
        GameListingQuery,
        OrganizationMutation,
        OrganizationQuery,
        PositionMutation,
        PositionQuery,
        SeasonMutation,
        SeasonQuery,
        UserMutation,
        UserQuery,
        Firebase,
        Root
    ]
})
