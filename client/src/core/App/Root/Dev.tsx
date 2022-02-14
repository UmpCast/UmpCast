import AuthEmailSentConfirmation from '@/core/Auth/Email/SentConfirmation'
import OrgCreateScreen from '@/core/Org/Create/Screen'
import OrgJoinedScreenFixtures from '@/core/Org/Joined/Screen.fixtures'
import createMockClient from '@/mock/client'
import { NavigationContainer } from '@react-navigation/native'

import AppMockProvider from '../Mock/Provider'
import AppNavigationContainer from '../Navigation/Container'
import { RootStackRoutes, RootStack } from './Stack'

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
            <NavigationContainer
                initialState={{
                    routes: [
                        {
                            name: RootStackRoutes.AuthEmailSent,
                            params: { email: 'someemail' }
                        }
                    ]
                }}
            >
                <RootStack.Navigator>
                    <RootStack.Screen
                        component={AuthEmailSentConfirmation}
                        name={RootStackRoutes.AuthEmailSent}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </AppMockProvider>
    )
}
