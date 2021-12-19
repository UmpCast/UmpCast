import { HttpLink, ApolloClient } from '@apollo/client'
import AppCache from '@/apollo/appCache'

export default function createMockClient() {
    const httpLink = new HttpLink({
        fetch,
        uri: 'http://localhost:8000/graphql'
    })

    return new ApolloClient({
        cache: AppCache,
        link: httpLink
    })
}
