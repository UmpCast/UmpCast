import createMockClient from '@/graphql/mock/client'
import serverResolvers from '@/graphql/mock/resolvers'

import AppNavigationContainer from './navigation/Container'
import RootStackNavigator from './navigation/navigators/Root/StackNavigator'
import AppMockProvider from '../testing/AppMockProvider'

const client = createMockClient({
    mocks: {
        DateTime: () => '2022-03-03T19:00:17.865Z'
    },
    resolvers: serverResolvers
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
