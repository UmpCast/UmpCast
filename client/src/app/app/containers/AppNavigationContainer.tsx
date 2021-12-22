import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { loadAppExtra } from '@/app/common/utils/appBuild'

export interface AppNavigationContainerProps {
    children: JSX.Element
}

export default function AppNavigationContainer({
    children
}: AppNavigationContainerProps) {
    const config = {
        screens: {
            VerificationSent: 'verification-sent',
            EmailVerification: 'email-verification',
            Verify: 'verify'
        }
    }
    const linking = {
        prefixes: [loadAppExtra().APP_URL, `${loadAppExtra().APP_SCHEME}://`],
        config
    }

    return (
        <NavigationContainer linking={linking}>{children}</NavigationContainer>
    )
}
