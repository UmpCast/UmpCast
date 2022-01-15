import { act, fireEvent } from '@testing-library/react-native'

import _FirebaseAuth from '@/mocks/modules/_FirebaseAuth'
import { stubResolvers } from '@/utils/testing'

import * as setup from './setup/user_registers'

jest.mock('firebase/auth')

it('should register the user when valid inputs provided', async () => {
    const resolvers = stubResolvers()
    const { VALID_INPUT } = setup.build()

    const { listenForCallback, triggerAuthStateChanged } =
        _FirebaseAuth.mock.onAuthStateChanged()
    listenForCallback()
    // givern user not registered...
    resolvers.Query.isRegistered.mockReturnValueOnce(false)

    const { findByText, fillForm } = setup.render({
        uses: 'entire-app',
        resolvers
    })

    await findByText(/loading/i)

    // but signed in
    act(() =>
        triggerAuthStateChanged({
            hasAuth: true
        })
    )

    await findByText(/register/i)

    // when valid inputs provided...
    await act(() => fillForm(VALID_INPUT))

    resolvers.Query.isRegistered.mockReturnValueOnce(true)
    resolvers.Mutation.register.mockReturnValue({
        errors: []
    })

    // and form submitted
    fireEvent.press(await findByText(/submit/i))

    // then the user is redirected to home...
    await findByText(/home/i)
    // and registration was requested
    expect(resolvers.Mutation.register.mock.calls[0][1]).toMatchObject({
        input: {
            ...VALID_INPUT,
            zipCode: Number(VALID_INPUT.zipCode),
            phoneNumber: Number(VALID_INPUT.phoneNumber)
        }
    })
})

it('should render correctly when displayed', async () => {
    const { VALID_INPUT } = setup.build()

    // when form is rendered
    const { getByTestId, findByText } = setup.render({
        uses: 'form-only'
    })

    // then inputs are empty...
    await act(async () => {
        Object.keys(VALID_INPUT).forEach((field) => {
            const input = getByTestId(`${field}-input`)
            expect(input).toHaveProp('value', '')
        })
    })
    // and a submit button is shown
    await findByText(/submit/i)
})

it('should perform validation', async () => {
    const { VALID_INPUT } = setup.build()

    // when form is rendered
    const { findAllByText, findByText } = setup.render({
        uses: 'form-only'
    })

    // when user presses submits
    fireEvent.press(await findByText(/submit/i))

    // then form should be validated
    expect((await findAllByText(/is required/i)).length).toBe(
        Object.keys(VALID_INPUT).length
    )
})

it('should display them when server responds with errors', async () => {
    const resolvers = stubResolvers()
    const { VALID_INPUT } = setup.build()

    const { findByText, fillForm } = setup.render({
        uses: 'form-only',
        resolvers
    })

    // given server errors
    resolvers.Mutation.register.mockReturnValueOnce({
        errors: [
            {
                key: 'zipCode',
                message: 'external zip code error'
            }
        ]
    })

    // when user submits with valid inputs
    await act(() => fillForm(VALID_INPUT))
    fireEvent.press(await findByText(/submit/i))

    // then errors are displayed in form
    await findByText('external zip code error')
})
