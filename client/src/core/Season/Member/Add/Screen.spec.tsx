import { BaseSetup } from '@/mock/render'
import { within } from '@testing-library/react-native'
import SeasonMemberAddScreen from './Screen'

class Setup extends BaseSetup {
    season = {
        id: 'season-1'
    }

    constructor() {
        super(<SeasonMemberAddScreen />)
    }
}

it('adds users to a season', async () => {
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
                    added: true
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
    item1.getByText(/user 1/i)
    item1.getByTestId('user-1-AddCheckbox')
    expect(item1.queryByText(/already member/i)).toBeNull()
    item2.getByText(/user 1/i)
    item2.getByText(/already member/i)
    expect(item2.queryByTestId('user-1-AddCheckbox')).toBeNull()
})
