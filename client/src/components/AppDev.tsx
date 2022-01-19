import { Box } from 'native-base'

import { RootStack, RootStackRoutes } from '@/navigation'
import urqlMockingClient from '@/utils/dev/urql'

import MockAppProvider from './MockAppProvider'
import DivisionList from './organisms/DivisionList'
import PositionCreateScreen from './screens/PositionCreateScreen'

import { inspect } from '@xstate/inspect'

inspect({
    iframe: false
})

export function Test() {
    return (
        <Box p={3}>
            <DivisionList seasonId="1" />
        </Box>
    )
}

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
                    component={Test}
                    name={RootStackRoutes.SeasonStructure}
                />
                <RootStack.Screen
                    component={PositionCreateScreen}
                    name={RootStackRoutes.PositionCreate}
                />
            </RootStack.Navigator>
        </MockAppProvider>
    )
}
