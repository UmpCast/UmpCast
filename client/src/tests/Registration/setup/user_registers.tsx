import { fireEvent, render } from '@testing-library/react-native'

import AppNavigator from '@/components/AppNavigator'
import MockAppProvider from '@/components/MockAppProvider'
import RegisterUserForm from '@/components/RegisterUserForm'
import buildUserInput from '@/mocks/factories/buildUserInput'
import { TestRenderOptions } from '@/types/render'
import urqlMockingClient from '@/utils/urql'

export function buildUserRegisters() {
    return {
        VALID_INPUT: buildUserInput()
    }
}

export function renderUserRegisters({
    resolvers,
    setup
}: TestRenderOptions<'form-only' | 'sign-in'> = {}) {
    const client = urqlMockingClient({ resolvers })

    const utils = render(
        <MockAppProvider client={client} withNavigation={setup === 'sign-in'}>
            {setup === 'form-only' ? <RegisterUserForm /> : <AppNavigator />}
        </MockAppProvider>
    )

    const typeInput = async (field: string, text: string) =>
        fireEvent.changeText(await utils.findByTestId(`${field}-input`), text)

    const submitForm = async () =>
        fireEvent.press(await utils.findByText(/submit/i))

    return {
        ...utils,
        typeInput,
        submitForm
    }
}
