import { ApolloClient } from '@apollo/client'

import AppCache from '@/apollo/appCache'

const createBaseClient = () =>
    new ApolloClient({
        cache: AppCache,
        uri: SERVER_GRAPHQL_URI
    })

export default createBaseClient
