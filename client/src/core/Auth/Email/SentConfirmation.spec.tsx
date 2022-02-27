import AppMockProvider from '@/core/App/Mock/Provider'
import { _useRoute } from '@/mock/modules/reactNavigation'
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

it('should show confirmation when sign in link sent', async () => {
    _useRoute.mockReturnValue({
        params: {
            email: 'valid@gmail.com'
        }
    })

    const { utils } = setup()

    await utils.findByText('valid@gmail.com')
})
