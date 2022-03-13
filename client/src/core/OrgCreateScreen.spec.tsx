import { fireEvent, waitFor } from '@testing-library/react-native'

import { _useNavigation } from '@/testing/modules/reactNavigation'
import { BaseSetup } from '@/testing/setup'

import OrgCreateScreen from './OrgCreateScreen'

class Setup extends BaseSetup {
    constructor() {
        super(<OrgCreateScreen />)
    }
}
it('creates an organization and navigates back', async () => {
    const setup = new Setup()

    const input = {
        name: 'organization 1',
        description: 'organization 1 description'
    }
    const api = setup.render()

    await api.fillForm(input)

    const createButton = await api.findByText(/^create$/i)

    setup.resolvers.Mutation.createOrganization.mockImplementation(() => ({
        errors: []
    }))

    fireEvent.press(createButton)

    await waitFor(() => {
        expect(
            setup.resolvers.Mutation.createOrganization.mock.calls[0][1]
        ).toMatchObject({
            input
        })

        expect(_useNavigation.goBack).toHaveBeenCalled()
    })
})
