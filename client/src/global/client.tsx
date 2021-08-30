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
    extend type Query {
        isAuthorized: Boolean!
    }
`

const httpLink = new HttpLink({
    uri: appConfig.serverUri,
    fetch
})

const clientLink = from([httpLink])

const AppClient = new ApolloClient({
    link: clientLink,
    cache: new InMemoryCache({
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
    }),
    typeDefs: localSchema
})

export default AppClient
