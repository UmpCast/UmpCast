import AuthSignInView from '@/core/Auth/SignIn/Screen'
import DivisionCreateForm from '@/core/Division/Create/Form'
import DivisionCreateScreen from '@/core/Division/Create/Screen'
import DivisionEditList from '@/core/Division/Edit/List'
import PositionCreateScreen from '@/core/Position/Create/Screen'
import SeasonStructureRightHeader from '@/core/Season/Structure/RightHeader'
import SeasonStructureScreen from '@/core/Season/Structure/Screen'
import createMockClient from '@/mock/client'
import { navigationLinking, RootStack, RootStackRoutes } from '@/navigation'
import { NavigationContainer } from '@react-navigation/native'

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
            }),
            createDivision: () => ({
                errors: []
            })
        }
    }
})

export default function AppEntryDev() {
    return (
        <AppMockProvider client={client}>
            <NavigationContainer linking={navigationLinking}>
                <RootStack.Navigator>
                    <RootStack.Screen
                        component={() => null}
                        name={RootStackRoutes.Home}
                        options={{ headerShown: false }}
                    />
                    <RootStack.Screen
                        name={RootStackRoutes.PositionCreate}
                        component={PositionCreateScreen}
                    />
                    <RootStack.Screen
                        name={RootStackRoutes.DivisionCreate}
                        component={DivisionCreateScreen}
                    />
                    <RootStack.Screen
                        name={RootStackRoutes.SeasonStructure}
                        options={(props) => ({
                            headerRight: () => (
                                <SeasonStructureRightHeader {...props} />
                            )
                        })}
                        component={SeasonStructureScreen}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </AppMockProvider>
    )
}
