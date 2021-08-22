import React from 'react'

import { ApolloProvider, ApolloClient } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import Constants from 'expo-constants';
import { NativeBaseProvider, Text } from 'native-base'

import ClientCache, {localSchema} from 'app/cache'

function environmentConfig(node_env: string) {
  switch (node_env) {
    case 'development':
      return Constants.manifest?.extra?.DEVELOPMENT
    case 'production':
      return Constants.manifest?.extra?.PRODUCTION
    default:
      null
  }
}

export function App() {
  const { NODE_ENV } = process.env
  if (!NODE_ENV) return null

  const config = environmentConfig(NODE_ENV)

  const client = new ApolloClient({
    uri: config.server_uri,
    cache: new ClientCache(),
    typeDefs: localSchema,
  })

  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Text>Placeholder</Text>
        </NavigationContainer>
      </NativeBaseProvider>
    </ApolloProvider>
  )
}

export default App
