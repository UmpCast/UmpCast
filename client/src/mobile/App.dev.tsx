import createMockClient from '@/graphql/mock/client'

import AppNavigationContainer from './navigation/Container'
import RootStackNavigator from './navigation/navigators/Root/StackNavigator'
import AppMockProvider from '../testing/AppMockProvider'
import serverMocks from '@/graphql/mock/mock'

const client = createMockClient({
    mocks: serverMocks
})

export default function AppDev() {
    return (
        <AppMockProvider client={client}>
            <AppNavigationContainer>
                <RootStackNavigator />
            </AppNavigationContainer>
        </AppMockProvider>
    )
}
