import { fireEvent, waitFor } from '@testing-library/react-native'

import { RootStackRoutes } from '@/core/App/Root/Stack'
import { _useNavigation, _useRoute } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'

import OrgSettingsScreen from './Screen'

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
    const app = setup.render()
    const navButton = await app.findByText(/edit profile/i)

    fireEvent.press(navButton)
    expect(_useNavigation.navigate).toHaveBeenCalledWith(
        RootStackRoutes.OrgEdit,
        {
            id: 'organization-1'
        }
    )
})

it('deletes an organization', async () => {
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
    const app = setup.render()
    const deleteButton = await app.findByText(/delete organization/i)

    fireEvent.press(deleteButton)
    const confirmButton = await app.findByText(/yes/i)

    deleteOrganization.mockImplementation(() => ({
        errors: []
    }))
    fireEvent.press(confirmButton)
    await waitFor(() => {
        expect(deleteOrganization.mock.calls[0][1]).toMatchObject({
            id: 'organization-1'
        })
    })
    expect(_useNavigation.goBack).toHaveBeenCalled()
})
