import { fireEvent, waitFor } from '@testing-library/react-native'

import AppMockProvider from '@/core/App/Mock/Provider'
import { _useNavigation } from '@/mock/modules/reactNavigation'
import { createRender } from '@/mock/render'

import OrgCreateScreen from './Screen'

const setup = () => {
    const utils = createRender((client) => (
        <AppMockProvider client={client}>
            <OrgCreateScreen />
        </AppMockProvider>
    ))

    return {
        utils
    }
}

it('creates an organization and navigates back', async () => {
    const { utils } = setup()

    const createOrganizationInput = {
        title: 'organization 1',
        description: 'organization 1 description'
    }

    await utils.fillForm(createOrganizationInput)

    const createButton = await utils.findByText(/^create$/i)

    utils.resolvers.Mutation.createOrganization.mockImplementation(() => ({
        errors: []
    }))

    fireEvent.press(createButton)

    await waitFor(() => {
        expect(
            utils.resolvers.Mutation.createOrganization.mock.calls[0][1]
        ).toMatchObject({
            input: createOrganizationInput
        })

        expect(_useNavigation.goBack).toHaveBeenCalled()
    })
})
