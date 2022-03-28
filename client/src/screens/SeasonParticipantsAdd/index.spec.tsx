import { fireEvent, waitFor, within } from '@testing-library/react-native'
import { ReactNode } from 'react'

import { SeasonRoleType } from '@/generated'
import AppNavigationContainer from '@/navigation/Container'
import { RootStack, RootStackRoute } from '@/navigation/navigators/Root/Stack'
import AppMockProvider from '@/testing/AppMockProvider'
import { _useRoute, _useNavigation } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'
import { TestID } from '@/testing/testID'

import SeasonParticipantsAddScreen from '.'

class Setup extends BaseSetup {
    season = {
        id: 'season-1'
    }

    constructor() {
        super(null)
        this.node = (
            <RootStack.Screen
                component={SeasonParticipantsAddScreen}
                name={RootStackRoute.SeasonParticipantsAdd}
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
                <AppNavigationContainer
                    initialState={{
                        routes: [{ name: RootStackRoute.SeasonParticipantsAdd }]
                    }}
                >
                    <RootStack.Navigator>{node}</RootStack.Navigator>
                </AppNavigationContainer>
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
    const item1 = within(
        await api.findById(
            TestID.COMPONENT,
            'SeasonParticipantAddItem',
            'user-1'
        )
    )
    const item2 = within(
        await api.findById(
            TestID.COMPONENT,
            'SeasonParticipantAddItem',
            'user-2'
        )
    )
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

    const item1 = within(
        await api.findById(
            TestID.COMPONENT,
            'SeasonParticipantAddItem',
            'user-1'
        )
    )
    const item2 = within(
        await api.findById(
            TestID.COMPONENT,
            'SeasonParticipantAddItem',
            'user-2'
        )
    )
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
