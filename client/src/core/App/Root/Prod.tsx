import { NativeBaseProvider } from 'native-base'
import {
    cacheExchange,
    createClient,
    dedupExchange,
    fetchExchange,
    Provider as UrqlProvider
} from 'urql'

import AppInitializedNavigator from '@/core/App/Initialized/Navigator'
import authExchange from '@/config/exchanges/auth'
import appTheme from '@/config/theme'
import { loadAppExtra } from '@/utils/expo'

import AppNavigationContainer from '../Navigation/Container'

export const appClient = createClient({
    url: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`,
    exchanges: [dedupExchange, cacheExchange, authExchange, fetchExchange]
})

export default function AppEntryProd() {
    return (
        <UrqlProvider value={appClient}>
            <NativeBaseProvider theme={appTheme}>
                <AppNavigationContainer>
                    <AppInitializedNavigator />
                </AppNavigationContainer>
            </NativeBaseProvider>
        </UrqlProvider>
    )
}
