import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'

export function MockNativeBaseProvider({ children }: any) {
    return (
        <NativeBaseProvider
            initialWindowMetrics={{
                frame: { x: 0, y: 0, width: 0, height: 0 },
                insets: { top: 0, left: 0, right: 0, bottom: 0 }
            }}
        >
            {children}
        </NativeBaseProvider>
    )
}

export default function MockAppProvider({ children }: any) {
    return (
        <MockNativeBaseProvider>
            <NavigationContainer>{children}</NavigationContainer>
        </MockNativeBaseProvider>
    )
}