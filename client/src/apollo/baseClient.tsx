import { ApolloClient, HttpLink } from '@apollo/client'
import fetch from 'isomorphic-fetch'

import AppConfig from 'global/appConfig'

import AppCache from './appCache'

export const baseHttpLink = new HttpLink({
    uri: AppConfig.serverUri,
    fetch
})

const BaseClient = () =>
    new ApolloClient({
        cache: AppCache,
        link: baseHttpLink
    })

export default BaseClient
