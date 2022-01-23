import { cacheExchange, createClient, dedupExchange, fetchExchange } from 'urql'

import { loadAppExtra } from '@/utils/expo'

import { appAuthExchange } from './exchanges'

export default function createAppClient() {
    return createClient({
        url: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`,
        exchanges: [
            dedupExchange,
            cacheExchange,
            appAuthExchange,
            fetchExchange
        ]
    })
}
