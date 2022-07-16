import { Query } from '@/generated'
import AppMockProvider from '@/graphql/mock/Provider'
import createMockClient from '@/graphql/mock/client'
import serverMocks from '@/graphql/mock/mocks'
import { DeepPartial } from '@/utils/primitive'

import AppNavigationContainer from './navigation/Container'
import RootStackNavigator from './navigation/navigators/Root/StackNavigator'

const client = createMockClient({
    mocks: {
        ...serverMocks,
        Query(): DeepPartial<Query> {
            return {
                game: {
                    name: 'Stanford Cardinals vs. Say Hey Baseball',
                    startTime: '2022-07-01T21:00:00.000Z',
                    endTime: '2022-07-01T23:00:00.000Z',
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
