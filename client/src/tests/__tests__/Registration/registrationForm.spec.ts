import { act, fireEvent } from '@testing-library/react-native'

import { RegisterUserInput } from '@/hooks/useRegisterForm'
import User from '@/tests/factories/User'
import _FirebaseAuth from '@/tests/mocks/_FirebaseAuth'
import renderAppNavigator from '@/tests/renders/appNavigator'
import renderRegistrationForm from '@/tests/renders/registrationForm'
import { CreateRenderAPI, waitForRender } from '@/tests/setup'

jest.mock('firebase/auth')

function extendAPI(render: CreateRenderAPI) {
    return {
        ...render,
        fillForm: async (input: Partial<RegisterUserInput>) => {
            /* eslint-disable */
            for (const [field, value] of Object.entries(input)) {
                const inputElement = await render.findByTestId(`${field}-input`)
                fireEvent.changeText(inputElement, value)
            }
            /* eslint-enable */
        }
    }
}

it('should register the user when valid inputs provided', async () => {
    const USER_INPUT = User.createInput()

    // Render form
    const { findByText, fillForm, resolvers } = extendAPI(renderAppNavigator())

    const { listenForCallback, triggerAuthStateChanged } =
        _FirebaseAuth.mock.onAuthStateChanged()
    listenForCallback()
    resolvers.Query.isRegistered.mockReturnValueOnce(false)

    await findByText(/loading/i)

    // Firebase responds with empty auth
    act(() =>
        triggerAuthStateChanged({
            hasAuth: true
        })
    )

    await findByText(/register/i)

    // Submit valid form
    resolvers.Query.isRegistered.mockReturnValueOnce(true)
    resolvers.Mutation.register.mockReturnValue({
        errors: []
    })

    await act(() => fillForm(USER_INPUT))
    fireEvent.press(await findByText(/submit/i))

    await findByText(/home/i)
    expect(resolvers.Mutation.register.mock.calls[0][1]).toMatchObject({
        input: {
            ...USER_INPUT,
            zipCode: Number(USER_INPUT.zipCode),
            phoneNumber: Number(USER_INPUT.phoneNumber)
        }
    })
})

describe('should perform standard form functionality', () => {
    test('by rendering correctly when displayed', async () => {
        const USER_INPUT = User.createInput()

        // Render form
        const { getByTestId, findByText } = renderRegistrationForm()
        await waitForRender()

        act(async () => {
            Object.keys(USER_INPUT).forEach((field) => {
                const input = getByTestId(`${field}-input`)
                expect(input).toHaveProp('value', '')
            })
        })

        await findByText(/submit/i)
    })

    test('by showing them when form contains errors', async () => {
        const USER_INPUT = User.createInput()

        // Render form
        const { findAllByText, findByText } = renderRegistrationForm()

        // Submit empty form
        fireEvent.press(await findByText(/submit/i))

        expect((await findAllByText(/is required/i)).length).toBe(
            Object.keys(USER_INPUT).length
        )
    })

    test('by showing them when server responds with errors', async () => {
        const USER_INPUT = User.createInput()

        // Render form
        const { findByText, fillForm, resolvers } = extendAPI(
            renderRegistrationForm()
        )

        // Submit valid form
        resolvers.Mutation.register.mockReturnValueOnce({
            errors: [
                {
                    key: 'zipCode',
                    message: 'external zip code error'
                }
            ]
        })

        await act(() => fillForm(USER_INPUT))
        fireEvent.press(await findByText(/submit/i))

        await findByText('external zip code error')
    })
})
