import { fireEvent, waitFor } from '@testing-library/react-native'

import {
    RootStackParamList,
    RootStackRoute
} from '@/navigation/navigators/Root/Stack'
import { _useRoute } from '@/testing/modules/reactNavigation'
import { ScreenSetup } from '@/testing/setup/screen'
import { TestID } from '@/testing/testID'

import OrganizationSettingsProfileScreen from '.'

class Setup extends ScreenSetup<
    RootStackParamList,
    RootStackRoute.OrganizationSettingsProfile
> {
    constructor() {
        super(OrganizationSettingsProfileScreen)
    }
}

it('renders with org info', async () => {
    const setup = new Setup()
    const {
        Query: { organization }
    } = setup.resolvers

    organization.mockImplementationOnce(() => ({
        id: 'organization-1',
        name: 'Organization 1',
        description: 'Organization 1 description',
        email: 'organization-1@gmail.com'
    }))
    const api = setup.render({
        orgId: 'organization-1'
    })
    await api.findByDisplayValue(/^Organization 1$/i)
    await api.findByDisplayValue(/Organization 1 description/i)
    await api.findByDisplayValue(/organization-1@gmail.com/i)
    expect(setup.resolvers.Query.organization.mock.calls[0][1]).toMatchObject({
        id: 'organization-1'
    })
})

it('saves edits to org info', async () => {
    const setup = new Setup()
    const {
        Query: { organization },
        Mutation: { updateOrganization }
    } = setup.resolvers

    organization.mockImplementationOnce(() => ({
        id: 'organization-1',
        name: 'Organization 1',
        email: null,
        websiteUrl: null
    }))
    const api = setup.render({
        orgId: 'organization-1'
    })
    const nameInput = await api.findById(TestID.FORM_INPUT, 'name')
    const saveButton = await api.findByText(/save changes/i)

    updateOrganization.mockImplementationOnce(() => ({
        errors: []
    }))
    fireEvent.changeText(nameInput, 'Organization 2')
    fireEvent.press(saveButton)
    await waitFor(() => {
        expect(
            setup.resolvers.Mutation.updateOrganization.mock.calls[0][1]
        ).toMatchObject({
            input: {
                organizationId: 'organization-1',
                name: 'Organization 2'
            }
        })
    })
})