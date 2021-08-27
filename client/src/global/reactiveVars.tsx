import {
    ApolloClient,
    from,
    gql,
    HttpLink,
    makeVar,
    InMemoryCache
} from '@apollo/client'


import { AuthToken } from 'app/auth/models/token'
import Loader, { initialLoader } from 'app/provider/models/Loader'
import appConfig from 'global/env'

export const authTokenVar = makeVar<AuthToken | null>(null)
export const loaderVar = makeVar<Loader>(initialLoader)

export const localSchema = gql`
    type LoaderStyles {
        icon: String
        title: String
        message: String
    }

    type Loader {
        subscribed: Boolean!
        styles: LoaderStyles!
    }

    extend type Query {
        isAuthorized: Boolean!
        loader: Loader!
    }
`

const httpLink = new HttpLink({
    uri: appConfig.serverUri
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
                    loader: {
                        read() {
                            return loaderVar()
                        }
                    }
                }
            }
        }
    }),
    typeDefs: localSchema
})

export default AppClient
