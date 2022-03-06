import AppNavigationContainer from '@/core/App/Navigation/Container'
import { RootStack, RootStackRoutes } from '@/core/App/Root/Stack'
import { SeasonPermission } from '@/generated'
import { _useNavigation, _useRoute } from '@/mock/modules/reactNavigation'
import { BaseSetup } from '@/mock/render'
import { fireEvent, waitFor, within } from '@testing-library/react-native'
import SeasonMemberAddScreen from './Screen'

class Setup extends BaseSetup {
    season = {
        id: 'season-1'
    }

    constructor() {
        super(null)
        this.node = (
            <AppNavigationContainer
                initialState={{
                    routes: [
                        {
                            name: RootStackRoutes.SeasonMembersAdd
                        }
                    ]
                }}
            >
                <RootStack.Navigator>
                    <RootStack.Screen
                        name={RootStackRoutes.SeasonMembersAdd}
                        component={SeasonMemberAddScreen}
                        options={{ title: 'test' }}
                    />
                </RootStack.Navigator>
            </AppNavigationContainer>
        )
        _useRoute.mockReturnValue({
            params: {
                seasonId: this.season.id
            }
        })
    }
}

it('shows organization members with correct statuses', async () => {
    const setup = new Setup()
    const {
        Query: { season }
    } = setup.resolvers

    season.mockImplementationOnce((_, { id }) => {
        return {
            id,
            memberStatusList: [
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
        }
    })
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
        Mutation: { batchAddMemberToSeason }
    } = setup.resolvers

    season.mockImplementationOnce((_, { id }) => {
        return {
            id,
            memberStatusList: [
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

    batchAddMemberToSeason.mockImplementationOnce(() => {
        season.mockImplementationOnce((_, { id }) => {
            return {
                id,
                memberStatusList: []
            }
        })
        return {
            recruited: ['user-1', 'user-2']
        }
    })

    const addButton = await api.findByText(/add/i)
    fireEvent.press(addButton)
    await waitFor(() => expect(_useNavigation.goBack).toHaveBeenCalled())
    expect(batchAddMemberToSeason.mock.calls[0][1]).toMatchObject({
        input: {
            seasonId: setup.season.id,
            batch: [
                {
                    userId: 'user-1',
                    permissionList: [SeasonPermission.Referee]
                },
                {
                    userId: 'user-2',
                    permissionList: [SeasonPermission.Manager]
                }
            ]
        }
    })
    expect(season).toHaveBeenCalledTimes(2)
})
