import AppMockProvider from '@/core/App/Mock/Provider'
import { createRender } from '@/mock/render'

import UserRegistrationScreen from './Screen'

const setup = () =>
    createRender((client) => (
        <AppMockProvider client={client}>
            <UserRegistrationScreen />
        </AppMockProvider>
    ))

it('should render correctly', async () => {
    const utils = setup()

    await utils.findByText(/register/i)
    await utils.findByText(/cancel registration/i)
})
