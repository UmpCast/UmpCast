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
import TabsNavigator from './navigation/navigators/TabsNavigator'
import { getAppTheme } from '@/config/nativeBase/appTheme'

export const appClient = createClient({
    url: `${expoExtra.SERVER_GRAPHQL_URL}/graphql`,
    exchanges: [dedupExchange, cacheExchange, authExchange, fetchExchange]
})

export default function AppProd() {
    const appTheme = getAppTheme("light")
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
