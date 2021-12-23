import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import appNavLinking from '../utils/appNavLinking'

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
