import { ApolloClient } from '@apollo/client'

import appConfig from 'global/env'

import cache from './cache'

const baseClient = new ApolloClient({
    uri: appConfig.serverUri,
    cache
})

export default baseClient
