import AppMockingProvider from '@/mock/components/AppMockingProvider'

import signInScenarios from '@/mock/scenarios/signInScenarios'
import Navigation from '@/app/navigation'

export default function Dev() {
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
