import { RootStack, RootStackRoutes } from '@/navigation'
import createMockClient from '@/utils/dev/urql'
import { NavigationContainer } from '@react-navigation/native'

import MockAppProvider from '../test/components/MockAppProvider'
import CreatePositionScreen from './screens/CreatePositionScreen'

// inspect({
//     iframe: false
// })

const client = createMockClient({
    resolvers: {
        Query: {
            season: () => {
                return {
                    id: '1'
                }
            }
        },
        Mutation: {
            createPosition: () => {
                return {
                    errors: []
                }
            }
        }
    }
})

export default function AppDev() {
    return (
        <MockAppProvider client={client}>
            <NavigationContainer
                initialState={{
                    routes: [
                        {
                            name: RootStackRoutes.CreatePosition,
                            params: {
                                divisionId: '1'
                            }
                        }
                    ]
                }}
            >
                <RootStack.Navigator>
                    <RootStack.Screen
                        name={RootStackRoutes.CreatePosition}
                        component={CreatePositionScreen}
                    />
                    <RootStack.Screen
                        name={RootStackRoutes.SeasonStructure}
                        component={() => null}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </MockAppProvider>
    )
}
