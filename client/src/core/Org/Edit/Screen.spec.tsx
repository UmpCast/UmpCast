import { fireEvent } from '@testing-library/react-native'

import { _useRoute } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'

import OrgEditScreen from './Screen'

class Setup extends BaseSetup {
    constructor() {
        super(<OrgEditScreen />)

        _useRoute.mockReturnValue({
            params: {
                id: 'organization-1'
            }
        })
    }
}

it('renders with org info', async () => {
    const setup = new Setup()
    const {
        Query: { organization }
    } = setup.resolvers

    organization.mockImplementationOnce(() => ({
        title: 'Organization 1',
        description: 'Organization 1 description',
        email: 'organization-1@gmail.com'
    }))
    const api = setup.render()
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
        title: 'Organization 1',
        email: '',
        websiteUrl: ''
    }))
    const api = setup.render()
    const titleInput = await api.findByTestId('title-input')
    const saveButton = await api.findByText(/save changes/i)

    updateOrganization.mockImplementationOnce(() => {
        organization.mockImplementationOnce(() => ({
            id: 'organization-1',
            title: 'Organization 2'
        }))
    })
    fireEvent.changeText(titleInput, 'Organization 2')
    fireEvent.press(saveButton)
    await api.findByDisplayValue(/Organization 2/i)
    expect(
        setup.resolvers.Mutation.updateOrganization.mock.calls[0][1]
    ).toMatchObject({
        input: {
            title: 'Organization 2'
        }
    })
})
