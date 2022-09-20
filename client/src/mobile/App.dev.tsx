import { CreatePositionPayload, Game, Mutation, Season, User } from '@/graphql/generated'
import AppMockProvider from '@/mock/Provider'
import createMockClient from '@/mock/client'
import serverMocks from '@/mock/mocks'
import { DeepPartial } from '@/utils/primitive'

import AppNavigationContainer from './navigation/Container'
import RootStackNavigator from './navigation/navigators/Root/StackNavigator'

const client = createMockClient({
    mocks: serverMocks,
    resolvers: {
        Query: {
            viewer(): DeepPartial<User> {
                return {
                    id: '1'
                }
            },
            season(_, { id }): DeepPartial<Season> {
                return {
                    id,
                    viewerCanCreateGame: true
                }
            },
            game(_, { id }): DeepPartial<Game> {
                return {
                    id,
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
                }
            }
        },
        Mutation: {
            createPosition(): DeepPartial<CreatePositionPayload> {
                return {
                    errors: []
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
