import AppMockProvider from '../Mock/Provider'

import createMockClient from '@/mock/client'

import OrgJoinedScreenFixtures from '@/core/Org/Joined/Screen.fixtures'
import UserGroupNavigator from '@/core/User/Group/Navigator'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { RootStack, RootStackRoutes } from './Stack'
import AppNavigationContainer from '../Navigation/Container'
import AppBottomNavigator from '../Bottom/Navigator'
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
            <AppNavigationContainer>
                <OrgCreateScreen />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
