import AuthSignInView from '@/core/Auth/SignIn/Screen'
import DivisionEditList from '@/core/Division/Edit/List'
import PositionCreateScreen from '@/core/Position/Create/Screen'
import SeasonStructureRightHeader from '@/core/Season/Structure/RightHeader'
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
                    name={RootStackRoutes.SeasonStructure}
                    options={(props) => ({
                        title: 'Season Structure',
                        headerRight: () => (
                            <SeasonStructureRightHeader {...props} />
                        )
                    })}
                    component={DivisionEditList}
                />
            </RootStack.Navigator>
        </AppMockProvider>
    )
}
