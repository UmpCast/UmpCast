import React from 'react'
import { mirageServer } from '@/mock/mirage/mirageServer'
import { EmailVerifCreateScreen, EmailVerifSentScreen } from '../authentication'
import { UnauthStack } from '../authentication/containers/UnauthStack'
import AppProvider from './containers/AppProvider'

const seed = () => {
    mirageServer.create('organizationType')
}

seed()

export default function App() {
    return (
        <AppProvider>
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
        </AppProvider>
    )
}
