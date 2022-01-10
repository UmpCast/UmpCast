import { render, fireEvent } from '@testing-library/react-native'

import MockAppProvider from '@/components/MockAppProvider'
import SignInWithFBButton from '@/components/SignInWithFBButton'
import buildAuth from '@/mocks/factories/buildAuth'
import { TestRenderOptions } from '@/types/render'
import urqlMockingClient from '@/utils/urql'

export function buildWithFB() {
    const auth = buildAuth()

    return {
        AUTH: auth
    }
}

export function renderWithFB({ resolvers }: TestRenderOptions<'default'> = {}) {
    const client = urqlMockingClient({ resolvers })

    const utils = render(
        <MockAppProvider client={client}>
            <SignInWithFBButton />
        </MockAppProvider>
    )
    const clickContinue = async () =>
        fireEvent.press(await utils.findByText(/continue with facebook/i))

    return {
        clickContinue,
        ...utils
    }
}
