import { render as rtlRender } from '@testing-library/react-native'

import MockAppProvider from '@/components/MockAppProvider'
import SignInWithFBButton from '@/components/SignInWithFBButton'
import buildAuth from '@/mocks/factories/buildAuth'
import { TestRenderOptions } from '@/types/render'
import urqlMockingClient from '@/utils/urql'

export function build() {
    const auth = buildAuth()

    return {
        AUTH: auth
    }
}

export function render({ resolvers }: TestRenderOptions<'default'> = {}) {
    const client = urqlMockingClient({ resolvers })

    return rtlRender(
        <MockAppProvider client={client}>
            <SignInWithFBButton />
        </MockAppProvider>
    )
}
