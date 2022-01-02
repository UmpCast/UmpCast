import * as WebBrowser from 'expo-web-browser'
import AppMockingProvider from '@/mock/components/AppMockingProvider'

import signInScenarios from '@/mock/scenarios/signInScenarios'
import * as Navigation from '@/app/navigation'

WebBrowser.maybeCompleteAuthSession()

export default function App() {
    return (
        <AppMockingProvider
            mocks={{
                Query: () => ({
                    me: null
                })
            }}
            resolvers={signInScenarios.EMAIL_SIGN_IN_DEFAULT}
            withNavigation
        >
            <Navigation.ProtectedAppNavigator />
        </AppMockingProvider>
    )
}
