import { ApolloClient, InMemoryCache } from '@apollo/client'

import appConfig from './env';

export const JSONHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const BaseClient = new ApolloClient({
  uri: appConfig.server_uri,
  cache: new InMemoryCache(),
})
