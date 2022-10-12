import { NativeBaseProvider } from 'native-base'
import { Client, Provider as UrqlProvider } from 'urql'

import appTheme from '@/config/constants/nativeBase/theme'

import createMockClient from './client'

export interface AppMockProviderProps {
    client?: Client
    children: React.ReactNode
}

export default function AppMockProvider({
    client = createMockClient(),
    children
}: AppMockProviderProps) {
    return (
        <UrqlProvider value={client}>
            <NativeBaseProvider theme={appTheme}>{children}</NativeBaseProvider>
        </UrqlProvider>
    )
}
