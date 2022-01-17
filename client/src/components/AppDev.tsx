import { GetSeasonStructureDocument, IsRegisteredDocument } from '@/generated'
import server from '@/utils/dev/server'
import urqlMockingClient from '@/utils/dev/urql'

import AppNavigator from './AppNavigator'
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
                        }
                    ]
                })
            }
        },
        withDevTools: true
    })

    client
        .query(GetSeasonStructureDocument, {
            id: 1
        })
        .toPromise()
        .then(console.log)

    return null

    return (
        <MockAppProvider client={client} withNavigation>
            <AppNavigator />
        </MockAppProvider>
    )
}
