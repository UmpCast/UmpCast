import AppMockProvider from '@/testing/AppMockProvider'
import { _useRoute } from '@/testing/modules/reactNavigation'
import { createRender } from '@/testing/render'

import AuthEmailSentConfirmation from '.'

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
