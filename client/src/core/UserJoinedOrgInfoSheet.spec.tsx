import { fireEvent } from '@testing-library/react-native'

import { OrganizationRoleType } from '@/generated'
import { _useNavigation } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'
import { RootStackRoutes } from './AppRootStack'
import UserJoinedOrgSheet from './UserJoinedOrgInfoSheet'

class Setup extends BaseSetup {
    onClose = jest.fn()

    constructor() {
        super(null)
        this.node = (
            <UserJoinedOrgSheet
                isOpen
                joinedOrg={{
                    node: {
                        id: 'organization-1',
                        name: 'organization 1',
                        email: null,
                        websiteUrl: null,
                        description: null,
                        logoUrl: null
                    },
                    membership: {
                        id: 'membership-1',
                        role: OrganizationRoleType.Owner
                    }
                }}
                onClose={this.onClose}
            />
        )
    }
}

it('navigates to organization settings', async () => {
    const setup = new Setup()
    const api = setup.render()
    const settingsButton = await api.findByText(/settings/i)

    fireEvent.press(settingsButton)
    expect(_useNavigation.navigate).toHaveBeenCalledWith(
        RootStackRoutes.OrgSettings,
        {
            id: 'organization-1'
        }
    )
})

it('navigates to organization member list', async () => {
    const setup = new Setup()
    const api = setup.render()
    const membersButton = await api.findByText(/members/i)

    fireEvent.press(membersButton)
    expect(_useNavigation.navigate).toHaveBeenCalledWith(
        RootStackRoutes.OrgMembers,
        {
            id: 'organization-1'
        }
    )
})
