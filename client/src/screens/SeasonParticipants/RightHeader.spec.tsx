import { fireEvent, waitFor } from '@testing-library/react-native'

import { OrganizationRoleType } from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { _useNavigation, _useRoute } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'

import SeasonParticipantsScreenHeaderRight from './RightHeader'

class Setup extends BaseSetup {
    seasonId = 'season-1'

    constructor() {
        super(<SeasonParticipantsScreenHeaderRight />)
        _useRoute.mockReturnValue({
            params: {
                seasonId: this.seasonId
            }
        })
    }
}

it('hides the add button when viewer is not owner', async () => {
    const setup = new Setup()
    const {
        Query: { viewer }
    } = setup.resolvers

    viewer.mockImplementationOnce(() => ({
        season: {
            permit: {
                membership: {
                    role: OrganizationRoleType.Member
                }
            }
        }
    }))
    const api = setup.render()
    await waitFor(() => expect(viewer).toHaveBeenCalled())
    expect(api.queryByText(/add/i)).toBeNull()
})

it('navigates to the member add screen', async () => {
    const setup = new Setup()
    const {
        Query: { viewer }
    } = setup.resolvers

    viewer.mockImplementationOnce(() => ({
        season: {
            permit: {
                membership: {
                    role: OrganizationRoleType.Owner
                }
            }
        }
    }))
    const api = setup.render()
    const addButton = await api.findByText(/add/i)

    fireEvent.press(addButton)
    expect(_useNavigation.navigate).toHaveBeenCalledWith(
        RootStackRoute.SeasonParticipantsAdd,
        {
            seasonId: setup.seasonId
        }
    )
})