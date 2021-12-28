import { ApolloClient } from '@apollo/client'
import AppCache from './appCache'
import { loadAppExtra } from '@/app/common/utils/appExtra'

const apolloAppClient = new ApolloClient({
    cache: AppCache,
    uri: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`
})

export default apolloAppClient
