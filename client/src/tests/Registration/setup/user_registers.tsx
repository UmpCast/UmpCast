import { fireEvent } from '@testing-library/react-native'

import AppNavigator from '@/components/AppNavigator'
import MockAppProvider from '@/components/MockAppProvider'
import RegisterUserForm from '@/components/RegisterUserForm'
import buildUserInput from '@/mocks/factories/buildUserInput'
import { TestRenderOptions } from '@/types/render'
import urqlMockingClient from '@/utils/urql'
import { render as rtlRender } from '@testing-library/react-native'
import { RegisterUserInput } from '@/hooks/useRegisterForm'

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
        Object.entries(input).forEach(([field, value]) => {
            const input = utils.getByTestId(field + '-input')
            fireEvent.changeText(input, value)
        })
    }

    return {
        ...utils,
        fillForm
    }
}
