import AppMockProvider from '@/core/App/Mock/Provider'
import { RootStackRoutes } from '@/core/App/Root/Stack'
import { _useNavigation, _useRoute } from '@/mock/modules/reactNavigation'
import { createRender, CreateRenderAPI } from '@/mock/render'
import { fireEvent, waitFor } from '@testing-library/react-native'
import OrgSettingsScreen from './Screen'

class Setup {
    utils: CreateRenderAPI

    constructor() {
        this.utils = createRender((client) => (
            <AppMockProvider client={client}>
                <OrgSettingsScreen />
            </AppMockProvider>
        ))
    }

    withRoute() {
        _useRoute.mockReturnValue({
            params: {
                id: 'organization-1'
            }
        })
    }

    withOrganization() {
        const {
            Query: { organization }
        } = this.utils.resolvers

        organization.mockImplementation(() => {
            return {
                id: 'organization-1'
            }
        })
    }
}

it('navigates to edit profile', async () => {
    const setup = new Setup()
    setup.withRoute()
    setup.withOrganization()

    const { utils } = setup

    const navButton = await utils.findByText(/edit profile/i)

    fireEvent.press(navButton)

    await waitFor(() => {
        const [routeName, params] = _useNavigation.navigate.mock.calls[0]
        expect(routeName).toEqual(RootStackRoutes.OrgEdit)
        expect(params).toMatchObject({
            id: 'organization-1'
        })
    })
})

it('deletes an organization', async () => {
    const setup = new Setup()
    setup.withRoute()
    setup.withOrganization()

    const { utils } = setup
    const {
        resolvers: {
            Mutation: { deleteOrganization }
        }
    } = utils

    const deleteButton = await utils.findByText(/delete organization/i)

    deleteOrganization.mockImplementation(() => {
        return {
            errors: []
        }
    })

    fireEvent.press(deleteButton)

    const confirmButton = await utils.findByText(/yes/i)

    fireEvent.press(confirmButton)

    await waitFor(() => {
        expect(deleteOrganization.mock.calls[0][1]).toMatchObject({
            id: 'organization-1'
        })
    })

    expect(_useNavigation.goBack).toHaveBeenCalled()
})
