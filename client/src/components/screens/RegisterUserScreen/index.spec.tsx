import MockAppProvider from '@/test/components/MockAppProvider'
import { createRender } from '@/test/setup'

import RegisterUserScreen from '.'

const setup = () =>
    createRender((client) => (
        <MockAppProvider client={client}>
            <RegisterUserScreen />
        </MockAppProvider>
    ))

it('should render correctly', async () => {
    const utils = setup()

    await utils.findByText(/register/i)
    await utils.findByText(/cancel registration/i)
})
