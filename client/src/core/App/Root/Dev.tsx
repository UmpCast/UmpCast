import OrgCreateScreen from '@/core/Org/Create/Screen'
import OrgEditScreen from '@/core/Org/Edit/Screen'
import OrgJoinedScreenFixtures from '@/core/Org/Joined/Screen.fixtures'
import createMockClient from '@/mock/client'
import { isNonNullType } from 'graphql'

import AppMockProvider from '../Mock/Provider'
import AppNavigationContainer from '../Navigation/Container'
import { RootStack, RootStackRoutes } from './Stack'

const client = createMockClient({
    resolvers: {
        Query: {
            isRegistered: () => true,
            organization: () => {
                return {
                    profilePicture: null
                }
            }
        }
    }
})

export default function AppEntryDev() {
    return (
        <AppMockProvider client={client}>
            <AppNavigationContainer
                initialState={{
                    routes: [
                        {
                            name: RootStackRoutes.OrgEdit,
                            params: {
                                id: 'organization-1'
                            }
                        }
                    ]
                }}
            >
                <RootStack.Navigator>
                    <RootStack.Screen
                        name={RootStackRoutes.OrgEdit}
                        component={OrgEditScreen}
                    />
                </RootStack.Navigator>
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
