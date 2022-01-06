import { setContext } from '@apollo/client/link/context'
import { NavigationContainer } from '@react-navigation/native'
import { getAuth } from 'firebase/auth'
import { NativeBaseProvider } from 'native-base'
import { useMemo } from 'react'

import { RootStackRoutes } from '@/navigation/rootStack'
import { loadAppExtra } from '@/utils/expoUtils'

import InitializedApp from './InitializedApp'

import { createClient, Provider as UrqlProvider } from 'urql'

export const authLink = setContext(async () => ({
    headers: { authorization: await getAuth().currentUser?.getIdToken() }
}))

export const appNavConfig = {
    screens: {
        [RootStackRoutes.SignIn]: 'signin',
        [RootStackRoutes.SignInEmailSent]: 'email-sent',
        [RootStackRoutes.SignInEmailRecievedAlt]: '__/auth/action',
        [RootStackRoutes.SignInEmailRecieved]: 'email-signin'
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

export default function Main() {
    const client = useMemo(
        () =>
            createClient({
                url: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`
            }),
        [createClient, loadAppExtra]
    )

    return (
        <UrqlProvider value={client}>
            <NativeBaseProvider>
                <NavigationContainer linking={appNavLinking}>
                    <InitializedApp />
                </NavigationContainer>
            </NativeBaseProvider>
        </UrqlProvider>
    )
}
