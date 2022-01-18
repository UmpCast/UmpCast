import { Box } from 'native-base'

import urqlMockingClient from '@/utils/dev/urql'

import MockAppProvider from './MockAppProvider'
import DivisionList from './organisms/DivisionList'
import { RootStack, RootStackRoutes } from '@/navigation'
import PositionCreateScreen from './screens/PositionCreateScreen'

export default function AppDev() {
    const client = urqlMockingClient({
        resolvers: {
            Query: {
                season: () => ({
                    divisionList: [
                        {
                            id: '1',
                            name: 'AAA',
                            positionList: [
                                {
                                    name: 'Base'
                                },
                                {
                                    name: 'Plate'
                                }
                            ]
                        },
                        {
                            name: 'PCL',
                            positionList: []
                        }
                    ]
                }),
                isRegistered: () => false
            }
        },
        withDevTools: true
    })

    return (
        <MockAppProvider client={client} withNavigation>
            <RootStack.Navigator>
                <RootStack.Screen
                    name={RootStackRoutes.SeasonStructure}
                    component={() => (
                        <Box p={3}>
                            <DivisionList seasonId="1" />
                        </Box>
                    )}
                />
                <RootStack.Screen
                    name={RootStackRoutes.PositionCreate}
                    component={PositionCreateScreen}
                />
            </RootStack.Navigator>
        </MockAppProvider>
    )
}
