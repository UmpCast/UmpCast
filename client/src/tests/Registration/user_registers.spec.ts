import { act } from '@testing-library/react-native'

import setupFirebaseAuthState from '@/mocks/environments/setupFirebaseAuthState'

import { buildUserRegisters, renderUserRegisters } from './setup/user_registers'

jest.mock('firebase/auth')

it('registers the user when valid inputs provided', async () => {
    const { VALID_INPUT } = buildUserRegisters()

    const { triggerAuthStateChange } = setupFirebaseAuthState()

    const resolvers = {
        Query: {
            isRegistered: jest.fn()
        },
        Mutation: {
            register: jest.fn()
        }
    }
    resolvers.Query.isRegistered.mockReturnValue(false)

    const { findByText, typeInput, submitForm } = renderUserRegisters({
        setup: 'sign-in',
        resolvers
    })

    await findByText(/loading/i)

    act(() => triggerAuthStateChange(true))

    await act(async () => {
        // eslint-disable-next-line no-await-in-loop
        for (const [field, value] of Object.entries(VALID_INPUT))
            await typeInput(field, value)
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
