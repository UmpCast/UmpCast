import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import {
    cacheExchange,
    createClient,
    dedupExchange,
    fetchExchange,
    Provider as UrqlProvider
} from 'urql'

import { RootStackRoutes } from '@/rootStack'
import { loadAppExtra } from '@/utils/expo'

import AppNavigator from './AppNavigator'
import { appAuthExchange } from '@/exchanges'

export const appNavConfig = {
    screens: {
        [RootStackRoutes.SignIn]: 'signin',
        [RootStackRoutes.SignInEmailSent]: 'email-sent',
        [RootStackRoutes.SignInLinkRedirectAlt]: '__/auth/action',
        [RootStackRoutes.SignInLinkRedirect]: 'email-received',
        [RootStackRoutes.Register]: 'register',
        [RootStackRoutes.Home]: 'home'
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
    exchanges: [dedupExchange, cacheExchange, appAuthExchange, fetchExchange]
})

export default function Main() {
    return (
        <UrqlProvider value={appClient}>
            <NativeBaseProvider>
                <NavigationContainer linking={appNavLinking}>
                    <AppNavigator />
                </NavigationContainer>
            </NativeBaseProvider>
        </UrqlProvider>
    )
}
