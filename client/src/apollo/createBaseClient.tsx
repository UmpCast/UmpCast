import { ApolloClient } from '@apollo/client'

import AppCache from '@/apollo/appCache'
import { loadAppExtra } from '@/app/common/utils/appBuild'

const createBaseClient = () =>
    new ApolloClient({
        cache: AppCache,
        uri: loadAppExtra().SERVER_GRAPHQL_URI
    })

export default createBaseClient
