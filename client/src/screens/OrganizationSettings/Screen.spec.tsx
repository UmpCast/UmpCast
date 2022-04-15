import { fireEvent, waitFor } from '@testing-library/react-native'

import {
    RootStackParamList,
    RootStackRoute
} from '@/navigation/navigators/Root/Stack'
import { _useRoute, _useNavigation } from '@/testing/modules/reactNavigation'
import { ScreenSetup } from '@/testing/setup/screen'

import OrgSettingsScreen from './Screen'

class Setup extends ScreenSetup<
    RootStackParamList,
    RootStackRoute.OrganizationSettings
> {
    constructor() {
        super(OrgSettingsScreen)
    }
}

it('navigates to edit profile', async () => {
    const setup = new Setup()
    const {
        resolvers: {
            Query: { organization }
        },
        navigation: { navigate }
    } = setup

    organization.mockImplementation(() => ({
        id: 'organization-1'
    }))
    const api = setup.render({
        orgId: 'organization-1'
    })
    const profileItem = await api.findByText(/profile/i)

    fireEvent.press(profileItem)
    expect(navigate).toHaveBeenCalledWith(
        RootStackRoute.OrganizationSettingsProfile,
        {
            orgId: 'organization-1'
        }
    )
})

it('deletes an organization', async () => {
    const setup = new Setup()
    const {
        resolvers: {
            Query: { organization },
            Mutation: { deleteOrganization }
        },
        navigation: { goBack }
    } = setup

    organization.mockImplementation(() => ({
        id: 'organization-1'
    }))
    const api = setup.render({
        orgId: 'organization-1'
    })
    const deleteButton = await api.findByText(/delete organization/i)

    fireEvent.press(deleteButton)
    const confirmButton = await api.findByText(/yes/i)

    deleteOrganization.mockImplementation(() => ({
        success: true
    }))
    fireEvent.press(confirmButton)
    await waitFor(() => {
        expect(goBack).toHaveBeenCalled()
    })
    expect(deleteOrganization.mock.calls[0][1]).toMatchObject({
        input: {
            organizationId: 'organization-1'
        }
    })
})
