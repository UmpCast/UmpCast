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
                    id: 1,
                    divisionList: [
                        {
                            id: 1,
                            name: 'division 1',
                            positionList: [
                                {
                                    id: 1,
                                    name: 'position 1'
                                }
                            ]
                        },
                        {
                            id: 2,
                            name: 'division 2',
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
            <DivisionList seasonId="1" />
        </MockAppProvider>
    )
}
