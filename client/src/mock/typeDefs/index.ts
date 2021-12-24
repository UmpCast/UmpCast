import { DocumentNode } from 'graphql'
import atomicSchema from './atomic'
import organizationSchema from './organization'
import permitSchema from './permit'
import seasonSchema from './season'
import seasonInviteSchema from './seasonInvite'
import socialAuthSchema from './socialAuth'
import userSchema from './user'
import serverSchema from '../schema.graphql'

export function getGqlString(doc: DocumentNode) {
    return doc.loc?.source.body
}

const schemas = [
    atomicSchema,
    organizationSchema,
    permitSchema,
    seasonSchema,
    seasonInviteSchema,
    socialAuthSchema,
    userSchema
]

const typeDefs = (schemas.map(getGqlString) as string[]).concat(serverSchema)

export default typeDefs
