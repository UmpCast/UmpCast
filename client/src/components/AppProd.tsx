import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import {
    cacheExchange,
    createClient,
    dedupExchange,
    fetchExchange,
    Provider as UrqlProvider
} from 'urql'

import { appAuthExchange } from '@/exchanges'
import { loadAppExtra } from '@/utils/expo'

import AppNavigator from './AppNavigator'
import appTheme from '@/theme'
import { navigationLinking } from '@/navigation'

export const appClient = createClient({
    url: `${loadAppExtra().SERVER_GRAPHQL_URL}/graphql`,
    exchanges: [dedupExchange, cacheExchange, appAuthExchange, fetchExchange]
})

export default function Main() {
    return (
        <UrqlProvider value={appClient}>
            <NativeBaseProvider theme={appTheme}>
                <NavigationContainer linking={navigationLinking}>
                    <AppNavigator />
                </NavigationContainer>
            </NativeBaseProvider>
        </UrqlProvider>
    )
}
