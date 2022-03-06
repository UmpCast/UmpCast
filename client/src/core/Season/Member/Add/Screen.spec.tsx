import { fireEvent, waitFor, within } from '@testing-library/react-native'

import { RootStack, RootStackRoutes } from '@/core/App/Root/Stack'
import { SeasonPermission } from '@/generated'
import { BaseSetup } from '@/testing/setup'

import SeasonMemberAddScreen from './Screen'
import { _useNavigation, _useRoute } from '@/testing/modules/reactNavigation'
import AppMockProvider from '@/core/App/Mock/Provider'
import AppNavigationContainer from '@/core/App/Navigation/Container'
import { ReactNode } from 'react'

class Setup extends BaseSetup {
    season = {
        id: 'season-1'
    }

    constructor() {
        super(null)
        this.node = (
            <RootStack.Screen
                component={SeasonMemberAddScreen}
                name={RootStackRoutes.SeasonMembersAdd}
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
                        routes: [{ name: RootStackRoutes.SeasonMembersAdd }]
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
        membershipStatuses: [
            {
                permit: {
                    user: {
                        id: 'user-1',
                        firstName: 'User',
                        lastName: '1'
                    }
                },
                added: false
            },
            {
                permit: {
                    user: {
                        id: 'user-2',
                        firstName: 'User',
                        lastName: '2'
                    }
                },
                added: true
            }
        ]
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
        Mutation: { addSeasonMembers }
    } = setup.resolvers

    season.mockImplementationOnce((_, { id }) => {
        return {
            id,
            membershipStatuses: [
                {
                    permit: {
                        user: {
                            id: 'user-1',
                            firstName: 'User',
                            lastName: '1'
                        }
                    },
                    added: false
                },
                {
                    permit: {
                        user: {
                            id: 'user-2',
                            firstName: 'User',
                            lastName: '2'
                        }
                    },
                    added: false
                }
            ]
        }
    })
    const api = setup.render()

    const item1 = within(await api.findByTestId('user-1-AddItem'))
    const item2 = within(await api.findByTestId('user-2-AddItem'))

    fireEvent.press(await item1.findByText(/referee/i))
    fireEvent.press(await item2.findByText(/manager/i))

    addSeasonMembers.mockImplementationOnce(() => {
        season.mockImplementationOnce((_, { id }) => ({
            id,
            memberStatusList: []
        }))
        return {
            recruited: ['user-1', 'user-2']
        }
    })

    const addButton = await api.findByText(/add/i)
    fireEvent.press(addButton)
    await waitFor(() => expect(_useNavigation.goBack).toHaveBeenCalled())
    expect(addSeasonMembers.mock.calls[0][1]).toMatchObject({
        input: {
            seasonId: setup.season.id,
            requests: [
                {
                    userId: 'user-1',
                    permissions: [SeasonPermission.Referee]
                },
                {
                    userId: 'user-2',
                    permissions: [SeasonPermission.Manager]
                }
            ]
        }
    })
    expect(season).toHaveBeenCalledTimes(2)
})
