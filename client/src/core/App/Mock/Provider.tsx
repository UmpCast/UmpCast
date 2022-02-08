import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { useState, useEffect } from 'react'
import { Client, Provider as UrqlProvider } from 'urql'

import { navigationLinking } from '@/core/App/Root/Stack'
import appTheme from '@/theme'

import createMockClient from '../../../mock/client'

export interface AppMockProviderProps {
    withNavigation?: boolean
    client?: Client
    children: JSX.Element
}

export default function AppMockProvider({
    withNavigation = false,
    client = createMockClient(),
    children
}: AppMockProviderProps) {
    const [ready, setReady] = useState(false)
    useEffect(() => {
        Promise.resolve().then(() => setReady(true))
    }, [])

    if (!ready) return null

    return (
        <UrqlProvider value={client}>
            <NativeBaseProvider
                initialWindowMetrics={{
                    frame: { x: 0, y: 0, width: 0, height: 0 },
                    insets: { top: 0, left: 0, right: 0, bottom: 0 }
                }}
                theme={appTheme}
            >
                {withNavigation ? (
                    <NavigationContainer linking={navigationLinking}>
                        {children}
                    </NavigationContainer>
                ) : (
                    children
                )}
            </NativeBaseProvider>
        </UrqlProvider>
    )
}
