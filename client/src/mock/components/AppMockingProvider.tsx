import { appNavLinking } from '@/components/app/containers/Main'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'

import ApolloMockingProvider, {
    ApolloMockingProviderProps
} from './ApolloMockingProvider'

export interface AppMockingProviderProps extends ApolloMockingProviderProps {
    withNavigation?: boolean
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
    children,
    withNavigation = false,
    ...rest
}: AppMockingProviderProps) {
    return (
        <ApolloMockingProvider {...rest}>
            <MockNativeBaseProvider>
                {withNavigation ? (
                    <NavigationContainer linking={appNavLinking}>
                        {children}
                    </NavigationContainer>
                ) : (
                    children
                )}
            </MockNativeBaseProvider>
        </ApolloMockingProvider>
    )
}
