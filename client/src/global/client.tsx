import {
    ApolloClient,
    from,
    gql,
    HttpLink,
    InMemoryCache
} from '@apollo/client'

import appConfig from 'global/env'

import { authTokenVar } from './reactiveVars'

export const localSchema = gql`
    extend type Query {
        isAuthorized: Boolean!
    }
`

export class ClientCache extends InMemoryCache {
    constructor() {
        super({
            typePolicies: {
                Query: {
                    fields: {
                        isAuthorized: {
                            read() {
                                return authTokenVar() !== null
                            }
                        }
                    }
                }
            }
        })
    }
}

const httpLink = new HttpLink({
    uri: appConfig.serverUri
})

const clientLink = from([httpLink])

const AppClient = new ApolloClient({
    link: clientLink,
    cache: new ClientCache(),
    typeDefs: localSchema
})

export default AppClient

export const BaseClient = new ApolloClient({
    uri: appConfig.serverUri,
    cache: new InMemoryCache()
})
