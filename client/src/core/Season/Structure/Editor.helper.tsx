import AppMockProvider from '@/core/App/Mock/Provider'
import navigationNative from '@/mock/modules/navigationNative'
import { createRender } from '@/mock/render'

import SeasonStructureEditor from './Editor'

export const setup = () => {
    const navigate = jest.fn()

    navigationNative.useNavigation.mockReturnValue({
        navigate
    })

    const utils = createRender((client) => (
        <AppMockProvider client={client}>
            <SeasonStructureEditor seasonId="season-1" />
        </AppMockProvider>
    ))

    return {
        utils,
        navigate
    }
}
