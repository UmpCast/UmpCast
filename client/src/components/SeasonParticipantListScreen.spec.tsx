import {
    fireEvent,
    waitForElementToBeRemoved
} from '@testing-library/react-native'

import { OrganizationRoleType, SeasonRoleType } from '@/generated'
import { _useRoute } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'

import SeasonParticipantListScreen from './SeasonParticipantListScreen'

class Setup extends BaseSetup {
    season = {
        id: 'season-1'
    }

    constructor() {
        super(<SeasonParticipantListScreen />)

        _useRoute.mockReturnValue({
            params: {
                seasonId: this.season.id
            }
        })
    }
}

it('shows current season members', async () => {
    const setup = new Setup()
    const {
        Query: { season }
    } = setup.resolvers

    season.mockImplementationOnce((_, { id }) => ({
        id,
        participants: [
            {
                node: {
                    id: 'user-1',
                    firstName: 'User',
                    lastName: '1'
                },
                permit: {
                    roles: [SeasonRoleType.Manager]
                }
            },
            {
                node: {
                    id: 'user-2',
                    firstName: 'User',
                    lastName: '2'
                },
                permit: {
                    roles: [SeasonRoleType.Referee]
                }
            }
        ]
    }))
    const api = setup.render()
    await api.findByText(/user 1/i)
    await api.findByText(/user 2/i)
    await api.findByText(/manager/i)
    await api.findByText(/referee/i)
})

it('unrecruits a user from the season', async () => {
    const setup = new Setup()
    const {
        Query: { season, viewer },
        Mutation: { removeSeasonParticipant }
    } = setup.resolvers

    viewer.mockImplementation(() => ({
        season: {
            permit: {
                membership: {
                    role: OrganizationRoleType.Owner
                }
            }
        }
    }))
    season.mockImplementationOnce((_, { id }) => ({
        id,
        participants: [
            {
                node: {
                    id: 'user-1',
                    firstName: 'User',
                    lastName: '1'
                },
                permit: {
                    roles: [SeasonRoleType.Referee]
                }
            }
        ]
    }))
    const api = setup.render()
    await api.findByText(/user 1/i)
    const removeButton = await api.findByText(/remove/i)

    removeSeasonParticipant.mockImplementationOnce(() => {
        season.mockImplementationOnce((_, { id }) => ({
            id,
            members: []
        }))

        return {
            success: true
        }
    })
    fireEvent.press(removeButton)
    await waitForElementToBeRemoved(() => api.queryByText(/user 1/i))
    expect(removeSeasonParticipant.mock.calls[0][1]).toMatchObject({
        input: {
            seasonId: setup.season.id,
            userId: 'user-1'
        }
    })
})
