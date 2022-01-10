import { fireEvent } from '@testing-library/react-native'

import MockAppProvider from '@/components/MockAppProvider'
import SignInWithFBButton from '@/components/SignInWithFBButton'
import buildAuth from '@/mocks/factories/buildAuth'
import { TestRenderOptions } from '@/types/render'
import urqlMockingClient from '@/utils/urql'
import { extendedRender } from '@/utils/testing'

export function build() {
    const auth = buildAuth()

    return {
        AUTH: auth
    }
}

export function render({ resolvers }: TestRenderOptions<'default'> = {}) {
    const client = urqlMockingClient({ resolvers })

    const utils = extendedRender(
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
