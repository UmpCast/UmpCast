import { render, fireEvent } from '@testing-library/react-native'

import MockAppProvider from '@/components/MockAppProvider'
import SignInWithGoogleButton from '@/components/SignInWithGoogleButton'
import buildAuth from '@/mocks/factories/buildAuth'
import { TestRenderOptions } from '@/types/render'
import urqlMockingClient from '@/utils/urql'

export function buildWithGoogle() {
    const auth = buildAuth()

    return {
        AUTH: auth
    }
}

export function renderWithGoogle({ resolvers }: TestRenderOptions<'default'>) {
    const client = urqlMockingClient({ resolvers })

    const utils = render(
        <MockAppProvider client={client}>
            <SignInWithGoogleButton />
        </MockAppProvider>
    )

    const clickContinue = async () =>
        fireEvent.press(await utils.findByText(/continue with google/i))

    return {
        clickContinue,
        ...utils
    }
}
