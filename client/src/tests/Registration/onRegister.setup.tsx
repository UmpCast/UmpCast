import MockAppProvider from '@/components/MockAppProvider'
import RegisterUserForm from '@/components/RegisterUserForm'
import { TestRenderOptions } from '@/types/render'
import urqlMockingClient from '@/utils/urql'
import { render } from '@testing-library/react-native'

export function buildOnRegister() {}

export function renderOnRegister({
    resolvers
}: TestRenderOptions<'default'> = {}) {
    const client = urqlMockingClient({ resolvers })

    const utils = render(
        <MockAppProvider client={client}>
            <RegisterUserForm />
        </MockAppProvider>
    )

    return {
        ...utils
    }
}
