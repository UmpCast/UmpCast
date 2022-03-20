import { fireEvent, waitFor, within } from '@testing-library/react-native'
import { ReactNode } from 'react'

import { SeasonRoleType } from '@/generated'
import { _useRoute, _useNavigation } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'

import SeasonParticipantAddScreen from './Screen'
import AppMockProvider from '@/testing/AppMockProvider'
import { AppRootStackRoute } from '@/core/App/Root/Stack'
import AppRootNavigationContainer from '@/core/App/Root/NavigationContainer'
import { AppRootStack } from '@/core/App/Root/Stack'

class Setup extends BaseSetup {
    season = {
        id: 'season-1'
    }

    constructor() {
        super(null)
        this.node = (
            <AppRootStack.Screen
                component={SeasonParticipantAddScreen}
                name={AppRootStackRoute.SeasonParticipantsAdd}
                options={{ title: 'test' }}
            />
        )
        _useRoute.mockReturnValue({
            params: {
                seasonId: this.season.id
            }
        })
    }

    environment(node: ReactNode) {
        return (
            <AppMockProvider client={this.client}>
                <AppRootNavigationContainer
                    initialState={{
                        routes: [
                            { name: AppRootStackRoute.SeasonParticipantsAdd }
                        ]
                    }}
                >
                    <AppRootStack.Navigator>{node}</AppRootStack.Navigator>
                </AppRootNavigationContainer>
            </AppMockProvider>
        )
    }
}

it('shows organization members with correct statuses', async () => {
    const setup = new Setup()
    const {
        Query: { season }
    } = setup.resolvers

    season.mockImplementationOnce((_, { id }) => ({
        id,
        organization: {
            members: [
                {
                    node: {
                        id: 'user-1',
                        firstName: 'User',
                        lastName: '1'
                    },
                    isParticipating: false
                },
                {
                    node: {
                        id: 'user-2',
                        firstName: 'User',
                        lastName: '2'
                    },
                    isParticipating: true
                }
            ]
        }
    }))
    const api = setup.render()
    const item1 = within(await api.findByTestId('user-1-AddItem'))
    const item2 = within(await api.findByTestId('user-2-AddItem'))
    item1.getByText(/user 1/i)
    item1.getByText(/referee/i)
    item1.getByText(/manager/i)
    expect(item1.queryByText(/already a member/i)).toBeNull()
    item2.getByText(/user 2/i)
    item2.getByText(/already a member/i)
    expect(item2.queryByText(/referee/i)).toBeNull()
    expect(item2.queryByText(/manager/i)).toBeNull()
})

it('adds members to a season', async () => {
    const setup = new Setup()
    const {
        Query: { season },
        Mutation: { addSeasonParticipants }
    } = setup.resolvers

    season.mockImplementationOnce((_, { id }) => ({
        id,
        organization: {
            members: [
                {
                    node: {
                        id: 'user-1'
                    },
                    isParticipating: false
                },
                {
                    node: {
                        id: 'user-2'
                    },
                    isParticipating: false
                }
            ]
        }
    }))
    const api = setup.render()

    const item1 = within(await api.findByTestId('user-1-AddItem'))
    const item2 = within(await api.findByTestId('user-2-AddItem'))

    fireEvent.press(await item1.findByText(/referee/i))
    fireEvent.press(await item2.findByText(/manager/i))

    addSeasonParticipants.mockImplementationOnce(() => {
        season.mockImplementationOnce((_, { id }) => ({
            id,
            participants: []
        }))

        return {
            success: true
        }
    })

    const addButton = await api.findByText(/add/i)
    fireEvent.press(addButton)
    await waitFor(() => expect(_useNavigation.goBack).toHaveBeenCalled())
    expect(addSeasonParticipants.mock.calls[0][1]).toMatchObject({
        input: {
            seasonId: setup.season.id,
            requests: [
                {
                    userId: 'user-1',
                    roles: [SeasonRoleType.Referee]
                },
                {
                    userId: 'user-2',
                    roles: [SeasonRoleType.Manager]
                }
            ]
        }
    })
    expect(season).toHaveBeenCalledTimes(2)
})
