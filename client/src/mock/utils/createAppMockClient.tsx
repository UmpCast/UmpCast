import { HttpLink, ApolloClient } from '@apollo/client'
import fetch from 'isomorphic-fetch'
import AppCache from '@/apollo/appCache'

export default function createAppMockClient() {
    const httpLink = new HttpLink({
        fetch,
        uri: 'http://apollorequiresanabsolute.url'
    })

    return new ApolloClient({
        cache: AppCache,
        link: httpLink
    })
}
