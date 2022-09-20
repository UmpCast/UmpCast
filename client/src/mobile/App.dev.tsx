import { addMonths } from 'date-fns'
import * as faker from 'faker'

import { CreatePositionPayload, Game, Season, User } from '@/graphql/generated'
import AppMockProvider from '@/mock/Provider'
import createMockClient from '@/mock/client'
import serverMocks from '@/mock/mocks'
import { DeepPartial } from '@/utils/primitive'

import AppNavigationContainer from './navigation/Container'
import { RootStackRoute } from './navigation/navigators/Root/Stack'
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
                const now = new Date()

                return {
                    id,
                    viewerCanCreateGame: true,
                    games: [...Array(30)]
                        .map(() => ({
                            startTime: faker.date.between(addMonths(now, -1), addMonths(now, 1))
                        }))
                        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
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
            <AppNavigationContainer
                initialState={{
                    routes: [
                        {
                            name: RootStackRoute.SeasonCalendar,
                            params: {
                                seasonId: 2
                            }
                        }
                    ]
                }}
            >
                <RootStackNavigator />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
