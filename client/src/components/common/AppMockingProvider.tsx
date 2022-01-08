import { NavigationContainer, Route } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { Client, Provider as UrqlProvider } from 'urql'

import { appNavLinking } from '@/components/app/containers/Main'
import urqlMockingClient from '@/utils/urql'

import { WrapperProps } from './types'

export interface AppMockingProviderProps extends WrapperProps {
    withNavigation?: boolean
    initialRoute?: Omit<Route<string>, 'key'>
    client?: Client
}

export interface MockNativeBaseProviderProps {
    children: JSX.Element
}

export function MockNativeBaseProvider({
    children
}: MockNativeBaseProviderProps) {
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

export default function AppMockingProvider({
    withNavigation = false,
    initialRoute = undefined,
    client = urqlMockingClient(),
    children
}: AppMockingProviderProps) {
    return (
        <UrqlProvider value={client}>
            <MockNativeBaseProvider>
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
            </MockNativeBaseProvider>
        </UrqlProvider>
    )
}
