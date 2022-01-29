import { act, fireEvent, waitFor } from '@testing-library/react-native'

import AppMockProvider from '@/core/App/Mock/Provider'
import { createRender } from '@/mock/render'

import factory from '../factory'

import RegisterUserForm from './Form'

const setup = () =>
    createRender((client) => (
        <AppMockProvider client={client}>
            <RegisterUserForm />
        </AppMockProvider>
    ))

it('should register the user when valid inputs provided', async () => {
    const USER_INPUT = factory.RegistrationInput()

    // Render form
    const utils = setup()

    // Submit valid form
    utils.resolvers.Mutation.register.mockReturnValue({
        errors: []
    })

    await act(() => utils.fillForm(USER_INPUT))
    fireEvent.press(await utils.findByText(/submit/i))

    await waitFor(() => {
        expect(
            utils.resolvers.Mutation.register.mock.calls[0][1]
        ).toMatchObject({
            input: {
                ...USER_INPUT,
                zipCode: Number(USER_INPUT.zipCode),
                phoneNumber: Number(USER_INPUT.phoneNumber)
            }
        })
    })
})

it('should render correctly when shown', async () => {
    const USER_INPUT = factory.RegistrationInput()

    // Render form
    const utils = setup()

    act(async () => {
        Object.keys(USER_INPUT).forEach((field) => {
            const input = utils.getByTestId(`${field}-input`)
            expect(input).toHaveProp('value', '')
        })
    })
})

it('should perform validation when submitted', async () => {
    const USER_INPUT = factory.RegistrationInput()

    // Render form
    const utils = setup()

    // Submit empty form
    fireEvent.press(await utils.findByText(/submit/i))

    expect((await utils.findAllByText(/is required/i)).length).toBe(
        Object.keys(USER_INPUT).length
    )
})

it('should show server errors when submitted', async () => {
    const USER_INPUT = factory.RegistrationInput()

    // Render form
    const utils = setup()

    // Submit valid form
    utils.resolvers.Mutation.register.mockReturnValueOnce({
        errors: [
            {
                key: 'zipCode',
                message: 'external zip code error'
            }
        ]
    })

    await act(() => utils.fillForm(USER_INPUT))
    fireEvent.press(await utils.findByText(/submit/i))

    await utils.findByText('external zip code error')
})