import AppMockProvider from '@/mock/Provider'
import createMockClient from '@/mock/client'
import serverMocks from '@/mock/mocks'

import AppNavigationContainer from './navigation/Container'
import RootStackNavigator from './navigation/navigators/Root/StackNavigator'
import { DeepPartial } from '@/utils/primitive'
import { Query } from '@/graphql/generated'
let n = 0
const v = () => {
    n += 1
    return String(n)
}
const client = createMockClient({
    mocks: {
        ...serverMocks,
        Query(): DeepPartial<Query> {
            return {
                viewer: {
                    id: '1',
                    assignedListings: [
                        {
                            game: {
                                viewerAssignedListing: {}
                            }
                        },
                        {
                            game: {
                                viewerAssignedListing: {}
                            }
                        }
                    ],
                    games: [
                        {
                            viewerAssignedListing: null
                        }
                    ]
                }
            }
        }
    }
})

export default function AppDev() {
    return (
        <AppMockProvider client={client}>
            <AppNavigationContainer
            // initialState={{
            //     routes: [
            //         {
            //             name: RootStackRoute.CreateSeason,
            //             params: {
            //                 orgId: 1
            //             }
            //         }
            //     ]
            // }}
            >
                <RootStackNavigator />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
