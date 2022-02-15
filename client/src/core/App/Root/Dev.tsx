import OrgJoinedScreenFixtures from '@/core/Org/Joined/Screen.fixtures'
import SeasonStructureEditor from '@/core/Season/Structure/Editor'
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
                <SeasonStructureEditor seasonId="season-1" />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
