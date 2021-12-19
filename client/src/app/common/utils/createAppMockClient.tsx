import { HttpLink, ApolloClient } from '@apollo/client'
import fetch from 'isomorphic-fetch'
import AppCache from '@/apollo/appCache'
import { loadAppExtra } from './appBuild'

export default function createAppMockClient() {
    const httpLink = new HttpLink({
        fetch,
        uri: loadAppExtra().SERVER_GRAPHQL_URL
    })

    return new ApolloClient({
        cache: AppCache,
        link: httpLink
    })
}
