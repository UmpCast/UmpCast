import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { loadAppExtra } from '@/app/common/utils/appBuild'

export const appNavConfig = {
    screens: {
        VerificationSent: 'verification-sent',
        EmailVerification: 'email-verification',
        Verify: 'verify'
    }
}

export const appNavLinking = {
    prefixes: [loadAppExtra().APP_URL, `${loadAppExtra().APP_SCHEME}://`],
    config: appNavConfig
}

export interface AppNavigationContainerProps {
    children: JSX.Element
}

export default function AppNavigationContainer({
    children
}: AppNavigationContainerProps) {
    return (
        <NavigationContainer linking={appNavLinking}>
            {children}
        </NavigationContainer>
    )
}
