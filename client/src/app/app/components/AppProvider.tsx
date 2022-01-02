import Navigation from '@/app/navigation'
import { NativeBaseProvider } from 'native-base'
import { ApolloAppProvider } from './ApolloAppProvider'

export interface AppProviderProps {
    children: JSX.Element
}

export default function AppProvider({ children }: AppProviderProps) {
    return (
        <ApolloAppProvider>
            <NativeBaseProvider>
                <Navigation.AppNavigationContainer>
                    {children}
                </Navigation.AppNavigationContainer>
            </NativeBaseProvider>
        </ApolloAppProvider>
    )
}
