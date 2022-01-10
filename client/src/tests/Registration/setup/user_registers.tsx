import { fireEvent } from '@testing-library/react-native'

import AppNavigator from '@/components/AppNavigator'
import MockAppProvider from '@/components/MockAppProvider'
import RegisterUserForm from '@/components/RegisterUserForm'
import buildUserInput from '@/mocks/factories/buildUserInput'
import { TestRenderOptions } from '@/types/render'
import urqlMockingClient from '@/utils/urql'
import { extendedRender } from '@/utils/testing'

export function build() {
    return {
        VALID_INPUT: buildUserInput()
    }
}

export function render({
    resolvers,
    setup
}: TestRenderOptions<'form-only' | 'sign-in'> = {}) {
    const client = urqlMockingClient({ resolvers })

    const utils = extendedRender(
        <MockAppProvider client={client} withNavigation={setup === 'sign-in'}>
            {setup === 'form-only' ? <RegisterUserForm /> : <AppNavigator />}
        </MockAppProvider>
    )

    const submitForm = async () =>
        fireEvent.press(await utils.findByText(/submit/i))

    return {
        ...utils,
        submitForm
    }
}
