import MockAppProvider, {
    MockAppProviderProps
} from '@/components/MockAppProvider'
import AppNavigator from '@/components/organisms/AppNavigator'
import { createRender } from '@/tests/setup'

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
