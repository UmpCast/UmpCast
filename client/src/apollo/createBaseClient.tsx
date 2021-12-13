import { ApolloClient } from '@apollo/client'

import AppCache from '@/apollo/appCache'

const createBaseClient = () =>
    new ApolloClient({
        cache: AppCache,
        uri: '/graphql'
    })

export default createBaseClient
