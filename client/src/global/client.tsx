import {
    ApolloClient,
    from,
    gql,
    HttpLink,
    makeVar,
    InMemoryCache
} from '@apollo/client'
import { AuthToken } from 'app/auth/models/token'
import fetch from 'isomorphic-fetch'

import NetworkError from 'app/links/models/networkError'
import appConfig from 'global/env'

export const authTokenVar = makeVar<AuthToken | null>(null)
export const networkErrorVar = makeVar<NetworkError | null>(null)

export const localSchema = gql`
    type NetworkError {
        name: String!
        message: String!
    }

    extend type Query {
        isAuthorized: Boolean!
        networkError: NetworkError
    }
`

export const clientHttpLink = new HttpLink({
    uri: appConfig.serverUri,
    fetch
})

export const clientLink = from([clientHttpLink])

export const ClientCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isAuthorized: {
                    read() {
                        return authTokenVar() !== null
                    }
                },
                networkError: {
                    read() {
                        return networkErrorVar()
                    }
                }
            }
        }
    }
})

const AppClient = new ApolloClient({
    link: clientLink,
    cache: ClientCache,
    typeDefs: localSchema
})

export default AppClient
