import createMockClient from '@/server/client'
import serverResolvers from '@/server/resolvers'
import AppInitializedNavigator from './AppInitializedNavigator'
import AppMockProvider from './AppMockProvider'
import AppNavigationContainer from './AppNavigationContainer'

const client = createMockClient({
    mocks: {
        DateTime: () => '2022-03-03T19:00:17.865Z'
    },
    resolvers: serverResolvers
})

export default function AppEntryDev() {
    return (
        <AppMockProvider client={client}>
            <AppNavigationContainer>
                <AppInitializedNavigator />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
