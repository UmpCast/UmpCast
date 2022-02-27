import { fireEvent } from '@testing-library/react-native'

import AppMockProvider from '@/core/App/Mock/Provider'
import { createRender, CreateRenderAPI } from '@/mock/render'

import OrgEditScreen from './Screen'
import { _useRoute } from '@/mock/modules/reactNavigation'

class Setup {
    utils: CreateRenderAPI

    constructor() {
        this.utils = createRender((client) => (
            <AppMockProvider client={client}>
                <OrgEditScreen />
            </AppMockProvider>
        ))
    }

    withRoute() {
        _useRoute.mockReturnValue({
            params: {
                id: 'organization-1'
            }
        })

        return this
    }
}

it('renders with org info', async () => {
    const { utils } = new Setup().withRoute()

    utils.resolvers.Query.organization.mockImplementationOnce(() => ({
        title: 'Organization 1',
        description: 'Organization 1 description',
        email: 'organization-1@gmail.com'
    }))

    await utils.findByDisplayValue(/^Organization 1$/i)
    await utils.findByDisplayValue(/Organization 1 description/i)
    await utils.findByDisplayValue(/organization-1@gmail.com/i)

    expect(utils.resolvers.Query.organization.mock.calls[0][1]).toMatchObject({
        id: 'organization-1'
    })
})

it('saves edits to org info', async () => {
    const { utils } = new Setup().withRoute()

    utils.resolvers.Query.organization.mockImplementationOnce(() => ({
        id: 'organization-1',
        title: 'Organization 1',
        email: '',
        websiteUrl: ''
    }))

    utils.resolvers.Mutation.updateOrganization.mockImplementationOnce(() => {
        utils.resolvers.Query.organization.mockImplementationOnce(() => ({
            id: 'organization-1',
            title: 'Organization 2'
        }))
    })

    const titleInput = await utils.findByTestId('title-input')
    const saveButton = await utils.findByText(/save changes/i)

    fireEvent.changeText(titleInput, 'Organization 2')
    fireEvent.press(saveButton)

    await utils.findByDisplayValue(/Organization 2/i)

    expect(
        utils.resolvers.Mutation.updateOrganization.mock.calls[0][1]
    ).toMatchObject({
        input: {
            title: 'Organization 2'
        }
    })
})
