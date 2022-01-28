import AuthSignInView from '@/core/Auth/SignIn/Screen'
import PositionCreateScreen from '@/core/Position/Create/Screen'
import createMockClient from '@/mock/client'
import { RootStack, RootStackRoutes } from '@/navigation'

import AppMockProvider from '../Mock/Provider'

// inspect({
//     iframe: false
// })

const client = createMockClient({
    resolvers: {
        Query: {
            isRegistered: () => false,
            season: () => ({
                id: '1'
            })
        },
        Mutation: {
            createPosition: () => ({
                errors: []
            })
        }
    }
})

export default function AppEntryDev() {
    return (
        <AppMockProvider client={client} withNavigation>
            <RootStack.Navigator>
                <RootStack.Screen
                    name={RootStackRoutes.CreatePosition}
                    component={PositionCreateScreen}
                />
            </RootStack.Navigator>
        </AppMockProvider>
    )
}
