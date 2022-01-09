import { render, fireEvent } from '@testing-library/react-native'

import AppMockingProvider from '@/components/MockAppProvider'
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
        <AppMockingProvider client={client}>
            <SignInWithGoogleButton />
        </AppMockingProvider>
    )

    const clickContinue = async () =>
        fireEvent.press(await utils.findByText(/continue with google/i))

    return {
        clickContinue,
        ...utils
    }
}
