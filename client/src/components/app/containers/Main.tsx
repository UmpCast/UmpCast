import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import {
    cacheExchange,
    createClient,
    dedupExchange,
    fetchExchange,
    Provider as UrqlProvider
} from 'urql'

import { RootStackRoutes } from '@/navigation/rootStack'
import { loadAppExtra } from '@/utils/expo'
import { firebaseAuthExchange } from '@/utils/urql'

import InitializedApp from './InitializedApp'

export const appNavConfig = {
    screens: {
        [RootStackRoutes.SignIn]: 'signin',
        [RootStackRoutes.SignInEmailSent]: 'email-sent',
        [RootStackRoutes.SignInEmailRecievedAlt]: '__/auth/action',
        [RootStackRoutes.SignInEmailRecieved]: 'email-received'
    }
}

export const appNavLinking = {
    prefixes: [
        loadAppExtra().APP_URL,
        loadAppExtra().FIREBASE_AUTH_URL,
        `${loadAppExtra().APP_SCHEME}://`
    ],
    config: appNavConfig
}

export const appClient = createClient({
    url: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`,
    exchanges: [
        dedupExchange,
        cacheExchange,
        firebaseAuthExchange,
        fetchExchange
    ]
})

export default function Main() {
    return (
        <UrqlProvider value={appClient}>
            <NativeBaseProvider>
                <NavigationContainer linking={appNavLinking}>
                    <InitializedApp />
                </NavigationContainer>
            </NativeBaseProvider>
        </UrqlProvider>
    )
}