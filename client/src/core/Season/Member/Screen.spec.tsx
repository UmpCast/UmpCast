import { SeasonPermission } from '@/generated'
import { _useRoute } from '@/mock/modules/reactNavigation'
import { BaseSetup } from '@/mock/render'
import SeasonMemberScreen from './Screen'

class Setup extends BaseSetup {
    season = {
        id: 'season-1'
    }

    constructor() {
        super(<SeasonMemberScreen />)

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

    season.mockImplementationOnce((_, { id }) => {
        return {
            id,
            memberList: [
                {
                    user: {
                        id: 'user-1',
                        firstName: 'User',
                        lastName: '1'
                    },
                    permissionList: [SeasonPermission.Manager]
                },
                {
                    user: {
                        id: 'user-2',
                        firstName: 'User',
                        lastName: '2'
                    },
                    permissionList: [SeasonPermission.Referee]
                }
            ]
        }
    })
    const api = setup.render()
    await api.findByText(/user 1/i)
    await api.findByText(/user 2/i)
    await api.findByText(/manager/i)
    await api.findByText(/referee/i)
})
