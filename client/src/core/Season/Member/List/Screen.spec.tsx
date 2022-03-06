import {
    fireEvent,
    waitForElementToBeRemoved
} from '@testing-library/react-native'

import { SeasonPermission } from '@/generated'
import { _useRoute } from '@/mock/modules/reactNavigation'
import { BaseSetup } from '@/mock/render'

import SeasonMemberListScreen from './Screen'

class Setup extends BaseSetup {
    season = {
        id: 'season-1'
    }

    constructor() {
        super(<SeasonMemberListScreen />)

        _useRoute.mockReturnValue({
            params: {
                id: this.season.id
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
        members: [
            {
                user: {
                    id: 'user-1',
                    firstName: 'User',
                    lastName: '1'
                },
                permissions: [SeasonPermission.Manager]
            },
            {
                user: {
                    id: 'user-2',
                    firstName: 'User',
                    lastName: '2'
                },
                permissions: [SeasonPermission.Referee]
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
        Query: { season },
        Mutation: { removeSeasonMember }
    } = setup.resolvers

    season.mockImplementationOnce((_, { id }) => ({
        id,
        members: [
            {
                user: {
                    id: 'user-1',
                    firstName: 'User',
                    lastName: '1'
                }
            }
        ],
        viewerCanRemoveMember: true
    }))
    const api = setup.render()
    await api.findByText(/user 1/i)
    const removeButton = await api.findByText(/remove/i)

    removeSeasonMember.mockImplementationOnce(() => {
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
    expect(removeSeasonMember.mock.calls[0][1]).toMatchObject({
        input: {
            seasonId: setup.season.id,
            userId: 'user-1'
        }
    })
})
