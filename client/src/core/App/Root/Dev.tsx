import OrgJoinedScreen from '@/core/Org/Joined/Screen'
import OrgJoinedScreenFixtures from '@/core/Org/Joined/Screen.fixtures'
import createMockClient from '@/mock/client'

import AppMockProvider from '../Mock/Provider'
import AppNavigationContainer from '../Navigation/Container'

const client = createMockClient({
    resolvers: {
        Query: {
            isRegistered: () => true,
            ...OrgJoinedScreenFixtures[0].Query
        }
    }
})

export default function AppEntryDev() {
    return (
        <AppMockProvider client={client}>
            <AppNavigationContainer>
                <OrgJoinedScreen />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
