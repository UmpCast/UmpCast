import { NavigationContainer, Route } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { Client, Provider as UrqlProvider } from 'urql'

import { WrapperProps } from '@/types/component'
import urqlMockingClient from '@/utils/urql'

import appTheme from '@/theme'
import { navigationLinking } from '@/navigation'

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
    return (
        <UrqlProvider value={client}>
            <NativeBaseProvider
                theme={appTheme}
                initialWindowMetrics={{
                    frame: { x: 0, y: 0, width: 0, height: 0 },
                    insets: { top: 0, left: 0, right: 0, bottom: 0 }
                }}
            >
                {withNavigation ? (
                    <NavigationContainer
                        linking={navigationLinking}
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
            </NativeBaseProvider>
        </UrqlProvider>
    )
}
