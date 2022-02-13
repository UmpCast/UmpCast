import AppMockProvider from '@/core/App/Mock/Provider'
import navigationNative from '@/mock/modules/navigationNative'
import { createRender } from '@/mock/render'
import { fireEvent, waitFor } from '@testing-library/react-native'
import OrgCreateScreen from './Screen'

const setup = () => {
    const navigation = {
        goBack: jest.fn()
    }

    navigationNative.useNavigation.mockReturnValue(navigation)

    const utils = createRender((client) => (
        <AppMockProvider client={client}>
            <OrgCreateScreen />
        </AppMockProvider>
    ))

    return {
        utils,
        navigation
    }
}

it('creates an organization and navigates back', async () => {
    const { utils, navigation } = setup()

    const createOrganizationInput = {
        title: 'organization 1',
        email: 'organization-1@gmail.com',
        websiteUrl: 'organization-1.org'
    }

    await utils.fillForm(createOrganizationInput)

    const createButton = await utils.findByText(/^create$/i)

    utils.resolvers.Mutation.createOrganization.mockImplementation(() => {
        return {
            errors: []
        }
    })

    fireEvent.press(createButton)

    await waitFor(() => {
        expect(
            utils.resolvers.Mutation.createOrganization.mock.calls[0][1]
        ).toMatchObject({
            input: createOrganizationInput
        })

        expect(navigation.goBack).toHaveBeenCalled()
    })
})
