import AppMockProvider from '../Mock/Provider'

import createMockClient from '@/mock/client'

import OrgJoinedScreenFixtures from '@/core/Org/Joined/Screen.fixtures'
import UserGroupNavigator from '@/core/User/Group/Navigator'
import { NavigationContainer } from '@react-navigation/native'
import { RootStack, RootStackRoutes } from './Stack'

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
        <AppMockProvider client={client} withNavigation>
            <RootStack.Navigator>
                <RootStack.Screen
                    component={UserGroupNavigator}
                    name={RootStackRoutes.UserGroup}
                />
            </RootStack.Navigator>
        </AppMockProvider>
    )
}
