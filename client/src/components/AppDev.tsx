import { Box } from 'native-base'

import urqlMockingClient from '@/utils/dev/urql'

import MockAppProvider from './MockAppProvider'
import DivisionList from './organisms/DivisionList'

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
            <Box p={3}>
                <DivisionList seasonId="1" />
            </Box>
        </MockAppProvider>
    )
}
