import {
    act,
    fireEvent,
    render as rtlRender
} from '@testing-library/react-native'

import AppNavigator from '@/components/AppNavigator'
import MockAppProvider from '@/components/MockAppProvider'
import RegisterUserForm from '@/components/RegisterUserForm'
import User from '@/factories/User'
import { RegisterUserInput } from '@/hooks/useRegisterForm'
import _FirebaseAuth from '@/mocks/_FirebaseAuth'
import { TestRenderOptions } from '@/types/testing'
import { stubResolvers } from '@/utils/testing'
import urqlMockingClient from '@/utils/urql'

jest.mock('firebase/auth')

function render({
    resolvers,
    uses
}: TestRenderOptions<'form-only' | 'entire-app'>) {
    const utils = rtlRender(
        <MockAppProvider
            client={urqlMockingClient({ resolvers })}
            withNavigation={uses === 'entire-app'}
        >
            {uses === 'form-only' ? <RegisterUserForm /> : <AppNavigator />}
        </MockAppProvider>
    )

    const fillForm = async (input: Partial<RegisterUserInput>) => {
        /* eslint-disable */
        for (const [field, value] of Object.entries(input)) {
            const inputElement = await utils.findByTestId(`${field}-input`)
            fireEvent.changeText(inputElement, value)
        }
        /* eslint-enable */
    }

    return {
        ...utils,
        fillForm
    }
}

it('should register the user when valid inputs provided', async () => {
    const USER_INPUT = User.createInput()
    const resolvers = stubResolvers()

    // Render form
    const { listenForCallback, triggerAuthStateChanged } =
        _FirebaseAuth.mock.onAuthStateChanged()
    listenForCallback()
    resolvers.Query.isRegistered.mockReturnValueOnce(false)

    const { findByText, fillForm } = render({
        uses: 'entire-app',
        resolvers
    })

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

it('should render correctly when displayed', async () => {
    const USER_INPUT = User.createInput()

    // Render form
    const { getByTestId, findByText } = render({
        uses: 'form-only'
    })

    await act(async () => {
        Object.keys(USER_INPUT).forEach((field) => {
            const input = getByTestId(`${field}-input`)
            expect(input).toHaveProp('value', '')
        })
    })

    await findByText(/submit/i)
})

it('should perform validation', async () => {
    const USER_INPUT = User.createInput()

    // Render form
    const { findAllByText, findByText } = render({
        uses: 'form-only'
    })

    // Submit empty form
    fireEvent.press(await findByText(/submit/i))

    expect((await findAllByText(/is required/i)).length).toBe(
        Object.keys(USER_INPUT).length
    )
})

it('should display them when server responds with errors', async () => {
    const resolvers = stubResolvers()
    const USER_INPUT = User.createInput()

    // Render form
    const { findByText, fillForm } = render({
        uses: 'form-only',
        resolvers
    })

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
