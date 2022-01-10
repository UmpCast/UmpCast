import { act } from '@testing-library/react-native'

import setupFirebaseAuthState from '@/mocks/environments/setupFirebaseAuthState'

import * as setup from './setup/user_registers'
import stubResolvers from '@/utils/testing'

jest.mock('firebase/auth')

it('registers the user when valid inputs provided', async () => {
    const { VALID_INPUT } = setup.build()
    const { triggerAuthStateChange } = setupFirebaseAuthState()
    const resolvers = stubResolvers()

    resolvers.Query.isRegistered.mockReturnValue(false)
    const { findByText, typeInput, submitForm } = setup.render({
        setup: 'sign-in',
        resolvers
    })
    await findByText(/loading/i)

    act(() => triggerAuthStateChange(true))

    await act(async () => {
        /* eslint-disable */
        for (const [field, value] of Object.entries(VALID_INPUT))
            await typeInput(field, value)
        /* eslint-enable */
    })

    resolvers.Query.isRegistered.mockReturnValue(true)
    resolvers.Mutation.register.mockReturnValue({
        errors: []
    })
    await act(submitForm)
    expect(resolvers.Mutation.register.mock.calls[0][1]).toMatchObject({
        input: {
            ...VALID_INPUT,
            zipCode: Number(VALID_INPUT.zipCode),
            phoneNumber: Number(VALID_INPUT.phoneNumber)
        }
    })
    await findByText(/home/i)
})

it('renders correctly when displayed', () => {
    const {}
})
