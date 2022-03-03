import { fireEvent } from '@testing-library/react-native'

import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { OrganizationPermissionLevel } from '@/generated'
import { _useNavigation } from '@/mock/modules/reactNavigation'
import { BaseSetup } from '@/mock/render'

import OrgInfoSheet from './Sheet'

class Setup extends BaseSetup {
    onClose = jest.fn()

    constructor() {
        super(null)
        this.node = (
            <OrgInfoSheet
                isOpen
                onClose={this.onClose}
                permit={{
                    id: 'permit-1',
                    organization: {
                        id: 'organization-1',
                        title: 'organization 1',
                        email: null,
                        websiteUrl: null,
                        description: null,
                        logoUrl: null
                    },
                    permissionLevel: OrganizationPermissionLevel.Owner
                }}
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
    const settingsButton = await api.findByText(/members/i)

    fireEvent.press(settingsButton)
    expect(_useNavigation.navigate).toHaveBeenCalledWith(
        RootStackRoutes.OrgMembers,
        {
            id: 'organization-1'
        }
    )
})
