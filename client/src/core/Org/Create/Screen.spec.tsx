import { fireEvent, waitFor } from '@testing-library/react-native'

import { _useNavigation } from '@/mock/modules/reactNavigation'
import { BaseSetup } from '@/mock/render'

import OrgCreateScreen from './Screen'

class Setup extends BaseSetup {
    constructor() {
        super(<OrgCreateScreen />)
    }
}
it('creates an organization and navigates back', async () => {
    const setup = new Setup()

    const createOrganizationInput = {
        title: 'organization 1',
        description: 'organization 1 description'
    }
    const api = setup.render()
    await api.fillForm(createOrganizationInput)

    const createButton = await api.findByText(/^create$/i)

    setup.resolvers.Mutation.createOrganization.mockImplementation(() => ({
        errors: []
    }))

    fireEvent.press(createButton)

    await waitFor(() => {
        expect(
            setup.resolvers.Mutation.createOrganization.mock.calls[0][1]
        ).toMatchObject({
            input: createOrganizationInput
        })

        expect(_useNavigation.goBack).toHaveBeenCalled()
    })
})
