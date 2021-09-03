import {
    ApolloClient,
    from,
    gql,
    HttpLink,
    makeVar,
    InMemoryCache
} from '@apollo/client'
import fetch from 'isomorphic-fetch'

import { AuthToken } from 'app/auth/models/token'
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

export const clientCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isAuthorized: {
                    read() {
                        return authTokenVar() !== null
                    }
                },
                networError: {
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
    cache: clientCache,
    typeDefs: localSchema
})

export default AppClient
