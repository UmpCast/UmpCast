import { NativeBaseProvider } from 'native-base'
import {
    cacheExchange,
    createClient,
    dedupExchange,
    fetchExchange,
    Provider as UrqlProvider
} from 'urql'

import authExchange from '@/config/urql/auth'

import AppNavigationContainer from './navigation/Container'
import { expoExtra } from '@/utils/expo'
import appTheme from '@/config/nativeBase/theme'
import TabsNavigator from './navigation/navigators/TabsNavigator'

export const appClient = createClient({
    url: `${expoExtra.SERVER_GRAPHQL_URL}/graphql`,
    exchanges: [dedupExchange, cacheExchange, authExchange, fetchExchange]
})

export default function AppProd() {
    return (
        <UrqlProvider value={appClient}>
            <NativeBaseProvider theme={appTheme}>
                <AppNavigationContainer>
                    <TabsNavigator />
                </AppNavigationContainer>
            </NativeBaseProvider>
        </UrqlProvider>
    )
}
