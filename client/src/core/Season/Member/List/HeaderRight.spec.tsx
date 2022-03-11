import { fireEvent, waitFor } from '@testing-library/react-native'

import { RootStackRoutes } from '@/core/App/Root/Stack'
import { OrganizationRoleType } from '@/generated'
import { _useNavigation, _useRoute } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'

import SeasonMemberListHeaderRight from './HeaderRight'

class Setup extends BaseSetup {
    seasonId = 'season-1'

    constructor() {
        super(<SeasonMemberListHeaderRight />)
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
            member: {
                role: OrganizationRoleType.Member
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
            member: {
                role: OrganizationRoleType.Owner
            }
        }
    }))
    const api = setup.render()
    const addButton = await api.findByText(/add/i)

    fireEvent.press(addButton)
    expect(_useNavigation.navigate).toHaveBeenCalledWith(
        RootStackRoutes.SeasonMembersAdd,
        {
            seasonId: setup.seasonId
        }
    )
})
