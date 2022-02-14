import AppMockProvider from '../Mock/Provider'

import createMockClient from '@/mock/client'

import OrgJoinedScreenFixtures from '@/core/Org/Joined/Screen.fixtures'
import AppNavigationContainer from '../Navigation/Container'
import OrgCreateScreen from '@/core/Org/Create/Screen'

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
            <AppNavigationContainer></AppNavigationContainer>
        </AppMockProvider>
    )
}
