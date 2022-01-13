import { NavigationContainer, Route } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { Client, Provider as UrqlProvider } from 'urql'

import { WrapperProps } from '@/types/component'
import urqlMockingClient from '@/utils/urql'

import { appNavLinking } from './AppProd'
import { useState, useEffect } from 'react'

export interface MockNBProviderProps {
    children: JSX.Element
}

export function MockNBProvider({ children }: MockNBProviderProps) {
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

export interface MockAppProviderProps extends WrapperProps {
    withNavigation?: boolean
    initialRoute?: Omit<Route<string>, 'key'>
    client?: Client
}

export default function MockAppProvider({
    withNavigation = false,
    initialRoute = undefined,
    client = urqlMockingClient(),
    children
}: MockAppProviderProps) {
    const [ready, setReady] = useState(false)
    useEffect(() => {
        Promise.resolve().then(() => setReady(true))
    }, [])

    if (!ready) return null

    return (
        <UrqlProvider value={client}>
            <MockNBProvider>
                {withNavigation ? (
                    <NavigationContainer
                        linking={appNavLinking}
                        initialState={
                            initialRoute && {
                                routes: [initialRoute]
                            }
                        }
                    >
                        {children}
                    </NavigationContainer>
                ) : (
                    children
                )}
            </MockNBProvider>
        </UrqlProvider>
    )
}
