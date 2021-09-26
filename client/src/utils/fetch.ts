import { ApolloClient, InMemoryCache } from '@apollo/client'
import AppConfig from 'global/env'

export const JSONHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

export const BaseClient = new ApolloClient({
    uri: AppConfig.serverUri,
    cache: new InMemoryCache()
})
