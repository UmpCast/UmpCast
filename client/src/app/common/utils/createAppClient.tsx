import { ApolloClient } from '@apollo/client'

import AppCache from '@/app/common/utils/appCache'
import { loadAppExtra } from '@/app/common/utils/appBuild'

const createAppClient = () =>
    new ApolloClient({
        cache: AppCache,
        uri: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`
    })

export default createAppClient
