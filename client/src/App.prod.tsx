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
import AppRootStackNavigator from './navigation/navigators/Root/StackNavigator'
import AppNavigationContainer from './navigation/Container'

export const appClient = createClient({
    url: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`,
    exchanges: [dedupExchange, cacheExchange, authExchange, fetchExchange]
})

export default function AppProdEntry() {
    return (
        <UrqlProvider value={appClient}>
            <NativeBaseProvider theme={appTheme}>
                <AppNavigationContainer>
                    <AppRootStackNavigator />
                </AppNavigationContainer>
            </NativeBaseProvider>
        </UrqlProvider>
    )
}
