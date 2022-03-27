import createMockClient from '@/server/client'
import serverResolvers from '@/server/resolvers'
import { NavigationContainer } from '@react-navigation/native'
import AppRootStackNavigator from './navigation/navigators/Root/StackNavigator'
import AppMockProvider from './testing/AppMockProvider'

const client = createMockClient({
    mocks: {
        DateTime: () => '2022-03-03T19:00:17.865Z'
    },
    resolvers: serverResolvers
})

export default function AppDevEntry() {
    return (
        <AppMockProvider client={client}>
            <NavigationContainer>
                <AppRootStackNavigator />
            </NavigationContainer>
        </AppMockProvider>
    )
}
