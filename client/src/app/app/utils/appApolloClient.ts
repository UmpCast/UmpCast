import { ApolloClient } from '@apollo/client'
import AppCache from './appCache'
import { loadAppExtra } from '@/app/common/utils/appBuild'

const appApolloClient = new ApolloClient({
    cache: AppCache,
    uri: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`
})

export default appApolloClient
