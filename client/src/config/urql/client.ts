import { cacheExchange, createClient, dedupExchange, fetchExchange } from 'urql'

import { loadAppExtra } from '@/utils/expo'

import authExchange from './auth'

export default function createAppClient() {
    return createClient({
        url: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`,
        exchanges: [dedupExchange, cacheExchange, authExchange, fetchExchange]
    })
}
