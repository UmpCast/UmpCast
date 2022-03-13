import { fireEvent, waitFor } from '@testing-library/react-native'

import { _useRoute, _useNavigation } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'

import { RootStackRoutes } from './AppRootStack'
import OrgSettingsScreen from './OrgSettingsScreen'

class Setup extends BaseSetup {
    constructor() {
        super(<OrgSettingsScreen />)
    }
}

it('navigates to edit profile', async () => {
    const setup = new Setup()
    const {
        resolvers: {
            Query: { organization }
        }
    } = setup

    _useRoute.mockReturnValue({
        params: {
            id: 'organization-1'
        }
    })
    organization.mockImplementation(() => ({
        id: 'organization-1'
    }))
    const api = setup.render()
    const navButton = await api.findByText(/edit profile/i)

    fireEvent.press(navButton)
    expect(_useNavigation.navigate).toHaveBeenCalledWith(
        RootStackRoutes.OrgEdit,
        {
            id: 'organization-1'
        }
    )
})

it('deletes an organization1', async () => {
    const setup = new Setup()
    const {
        resolvers: {
            Query: { organization },
            Mutation: { deleteOrganization }
        }
    } = setup

    _useRoute.mockReturnValue({
        params: {
            id: 'organization-1'
        }
    })
    organization.mockImplementation(() => ({
        id: 'organization-1'
    }))
    const api = setup.render()
    const deleteButton = await api.findByText(/delete organization/i)

    fireEvent.press(deleteButton)
    const confirmButton = await api.findByText(/yes/i)

    deleteOrganization.mockImplementation(() => ({
        success: true
    }))
    fireEvent.press(confirmButton)
    await waitFor(() => {
        expect(_useNavigation.goBack).toHaveBeenCalled()
    })
    expect(deleteOrganization.mock.calls[0][1]).toMatchObject({
        input: {
            organizationId: 'organization-1'
        }
    })
})
