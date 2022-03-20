import { NativeBaseProvider } from 'native-base'
import {
    cacheExchange,
    createClient,
    dedupExchange,
    fetchExchange,
    Provider as UrqlProvider
} from 'urql'

import appTheme from '@/config/nativeBase/theme'
import authExchange from '@/config/urql/auth'
import { loadAppExtra } from '@/utils/expo'

import AppRootNavigationContainer from '../Navigation/Container'
import AppRootStackNavigator from '../Root/StackNavigator'

export const appClient = createClient({
    url: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`,
    exchanges: [dedupExchange, cacheExchange, authExchange, fetchExchange]
})

export default function AppProdEntry() {
    return (
        <UrqlProvider value={appClient}>
            <NativeBaseProvider theme={appTheme}>
                <AppRootNavigationContainer>
                    <AppRootStackNavigator />
                </AppRootNavigationContainer>
            </NativeBaseProvider>
        </UrqlProvider>
    )
}
