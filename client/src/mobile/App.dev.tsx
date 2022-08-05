import { Query } from '@/graphql/generated'
import AppMockProvider from '@/mock/Provider'
import createMockClient from '@/mock/client'
import serverMocks from '@/mock/mocks'
import { DeepPartial } from '@/utils/primitive'

import AppNavigationContainer from './navigation/Container'
import RootStackNavigator from './navigation/navigators/Root/StackNavigator'

const client = createMockClient({
    mocks: {
        ...serverMocks,
        Query(): DeepPartial<Query> {
            return {
                viewer: {
                    id: 'user-id-1'
                },
                game: {
                    name: 'Stanford Cardinals vs. Say Hey Baseball',
                    startTime: new Date('2022/07/01 2:00 pm'),
                    endTime: new Date('2022/07/01 4:00 pm'),
                    listings: [
                        {
                            assignee: {}
                        },
                        {
                            assignee: {}
                        },
                        {
                            assignee: null
                        }
                    ]
                },
                gameListing: {
                    availableAssignees: [{}, {}, {}, {}, {}, {}]
                }
            }
        }
    }
})

export default function AppDev() {
    return (
        <AppMockProvider client={client}>
            <AppNavigationContainer>
                <RootStackNavigator />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
