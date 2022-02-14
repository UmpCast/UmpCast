import AppMockProvider from '@/core/App/Mock/Provider'
import navigationNative from '@/mock/modules/navigationNative'
import { createRender } from '@/mock/render'

import AuthEmailSentConfirmation from './SentConfirmation'

const setup = () => {
    const utils = createRender((client) => (
        <AppMockProvider client={client}>
            <AuthEmailSentConfirmation />
        </AppMockProvider>
    ))

    return {
        utils
    }
}

it.only('should show confirmation when sign in link sent', async () => {
    navigationNative.useRoute.mockReturnValue({
        params: {
            email: 'valid@gmail.com'
        }
    })

    const { utils } = setup()

    await utils.findByText('valid@gmail.com')
})
