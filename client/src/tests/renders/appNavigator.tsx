import AppNavigator from '@/components/AppNavigator'
import MockAppProvider, {
    MockAppProviderProps
} from '@/components/MockAppProvider'
import { createRender } from '@/utils/testing'

export default function renderAppNavigator({
    route
}: {
    route?: MockAppProviderProps['initialRoute']
} = {}) {
    return createRender((client) => (
        <MockAppProvider client={client} initialRoute={route} withNavigation>
            <AppNavigator />
        </MockAppProvider>
    ))
}
