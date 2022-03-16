import AppInitializedNavigator from '@/components/AppInitializedNavigator'
import createMockClient from '@/server/client'
import serverResolvers from '@/server/resolvers'

import AppMockProvider from '../../../testing/AppMockProvider'
import AppRenderNavigationContainer from './NavigationContainer'

const client = createMockClient({
    mocks: {
        DateTime: () => '2022-03-03T19:00:17.865Z'
    },
    resolvers: serverResolvers
})

export default function AppRenderDevRoot() {
    return (
        <AppMockProvider client={client}>
            <AppRenderNavigationContainer>
                <AppInitializedNavigator />
            </AppRenderNavigationContainer>
        </AppMockProvider>
    )
}
