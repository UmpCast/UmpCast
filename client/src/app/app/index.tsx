import * as WebBrowser from 'expo-web-browser'
import AppMockingProvider from '@/mock/components/AppMockingProvider'

import signInScenarios from '@/mock/scenarios/signInScenarios'
import ProtectedAppNavigator from '../auth/containers/ProtectedAppNavigator'
import getAuthorizedScreens from './utils/getAuthorizedScreens'

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
            <ProtectedAppNavigator
                getAuthorizedScreens={getAuthorizedScreens}
            />
        </AppMockingProvider>
    )
}
