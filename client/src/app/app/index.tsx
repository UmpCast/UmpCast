import AppMockingProvider from '@/mock/components/AppMockingProvider'
import { EmailVerifCreateScreen, EmailVerifSentScreen } from '../authentication'
import { UnauthStack } from '../authentication/containers/UnauthStack'

export default function App() {
    return (
        <AppMockingProvider>
            <UnauthStack.Navigator>
                <UnauthStack.Screen
                    component={EmailVerifCreateScreen}
                    name="EmailVerification"
                />
                <UnauthStack.Screen
                    component={EmailVerifSentScreen}
                    name="VerificationSent"
                />
            </UnauthStack.Navigator>
        </AppMockingProvider>
    )
}
