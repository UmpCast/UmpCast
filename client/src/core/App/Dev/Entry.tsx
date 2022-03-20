import createMockClient from '@/server/client'
import serverResolvers from '@/server/resolvers'

import AppMockProvider from '../../../testing/AppMockProvider'
import AppRootNavigationContainer from '../Navigation/Container'
import AppRootStackNavigator from '../Root/StackNavigator'

const client = createMockClient({
    mocks: {
        DateTime: () => '2022-03-03T19:00:17.865Z'
    },
    resolvers: serverResolvers
})

export default function AppDevEntry() {
    return (
        <AppMockProvider client={client}>
            <AppRootNavigationContainer>
                <AppRootStackNavigator />
            </AppRootNavigationContainer>
        </AppMockProvider>
    )
}
