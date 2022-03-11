import { act, fireEvent, waitFor, within } from '@testing-library/react-native'

import AppMockProvider from '@/core/App/Mock/Provider'
import { createRender } from '@/testing/render'

import RegisterUserForm from './Form'

const setup = () =>
    createRender((client) => (
        <AppMockProvider client={client}>
            <RegisterUserForm />
        </AppMockProvider>
    ))

it('should register the user when valid inputs provided', async () => {
    // Render form
    const utils = setup()

    await act(() =>
        utils.fillForm({
            firstName: 'User',
            lastName: '1'
        })
    )

    utils.resolvers.Mutation.createUser.mockImplementationOnce(() => ({
        errors: []
    }))
    fireEvent.press(await utils.findByText(/submit/i))
    await waitFor(() => {
        expect(
            utils.resolvers.Mutation.createUser.mock.calls[0][1]
        ).toMatchObject({
            input: {
                firstName: 'User',
                lastName: '1',
                phoneNumber: null
            }
        })
    })
})

it('should render correctly when shown', async () => {
    // Render form
    const utils = setup()
    await within(
        await utils.findByTestId('firstName-control')
    ).findByDisplayValue('')
    await within(
        await utils.findByTestId('lastName-control')
    ).findByDisplayValue('')
    await within(
        await utils.findByTestId('phoneNumber-control')
    ).findByDisplayValue('')
})

it('should perform validation when submitted', async () => {
    // Render form
    const utils = setup()

    // Submit empty form
    fireEvent.press(await utils.findByText(/submit/i))

    await utils.findByText(/first name is required/i)
})

it('should show server errors when submitted', async () => {
    const utils = setup()

    await act(() =>
        utils.fillForm({
            firstName: 'User',
            lastName: '1'
        })
    )

    utils.resolvers.Mutation.createUser.mockReturnValueOnce({
        errors: [
            {
                key: 'firstName',
                message: 'server error'
            }
        ]
    })
    fireEvent.press(await utils.findByText(/submit/i))
    await utils.findByText('server error')
})
