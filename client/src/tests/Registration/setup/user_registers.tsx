import { fireEvent, render as rtlRender } from '@testing-library/react-native'

import AppNavigator from '@/components/AppNavigator'
import MockAppProvider from '@/components/MockAppProvider'
import RegisterUserForm from '@/components/RegisterUserForm'
import { RegisterUserInput } from '@/hooks/useRegisterForm'
import buildUserInput from '@/mocks/factories/buildUserInput'
import { TestRenderOptions } from '@/types/render'
import urqlMockingClient from '@/utils/urql'

export function build() {
    return {
        VALID_INPUT: buildUserInput()
    }
}

export function render({
    resolvers,
    uses
}: TestRenderOptions<'form-only' | 'entire-app'> = {}) {
    const client = urqlMockingClient({ resolvers })

    const utils = rtlRender(
        <MockAppProvider client={client} withNavigation={uses === 'entire-app'}>
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
