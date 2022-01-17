import { Box } from 'native-base'

import { GetSeasonStructureDocument, IsRegisteredDocument } from '@/generated'
import server from '@/utils/dev/server'
import urqlMockingClient from '@/utils/dev/urql'

import AppNavigator from './AppNavigator'
import DivisionList from './DivisionList'
import MockAppProvider from './MockAppProvider'

export default function AppDev() {
    const client = urqlMockingClient({
        resolvers: {
            Query: {
                season: () => ({
                    divisionList: [
                        {
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
                })
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
