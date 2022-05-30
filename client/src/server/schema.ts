import { makeExecutableSchema } from '@graphql-tools/schema'

import divisionSchema from './schema/division'
import firebaseSchema from './schema/firebase'
import gameSchema from './schema/game'
import organizationSchema from './schema/organization'
import positionSchema from './schema/position'
import rootSchema from './schema/root'
import seasonSchema from './schema/season'
import userSchema from './schema/user'

export const mockSchema = makeExecutableSchema({
    typeDefs: [
        divisionSchema,
        firebaseSchema,
        gameSchema,
        organizationSchema,
        positionSchema,
        rootSchema,
        seasonSchema,
        userSchema
    ]
})
