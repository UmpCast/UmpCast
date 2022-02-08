import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import {
    cacheExchange,
    createClient,
    dedupExchange,
    fetchExchange,
    Provider as UrqlProvider
} from 'urql'

import AppInitializedNavigator from '@/core/App/Initialized/Navigator'
import { appAuthExchange } from '@/exchanges'
import { navigationLinking } from '@/core/App/Root/Stack'
import appTheme from '@/theme'
import { loadAppExtra } from '@/utils/expo'

export const appClient = createClient({
    url: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`,
    exchanges: [dedupExchange, cacheExchange, appAuthExchange, fetchExchange]
})

export default function AppEntryProd() {
    return (
        <UrqlProvider value={appClient}>
            <NativeBaseProvider theme={appTheme}>
                <NavigationContainer linking={navigationLinking}>
                    <AppInitializedNavigator />
                </NavigationContainer>
            </NativeBaseProvider>
        </UrqlProvider>
    )
}
