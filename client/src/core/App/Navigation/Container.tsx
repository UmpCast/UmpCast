import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'native-base'

import NavigationLinking from '@/navigation/linking'

export interface AppNavigationContainerProps {
    children: JSX.Element
}

export default function AppNavigationContainer({
    children
}: AppNavigationContainerProps) {
    const theme = useTheme()
    return (
        <NavigationContainer
            linking={NavigationLinking}
            theme={{
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    background: '#FFF',
                    text: theme.colors.blueGray['700'],
                    primary: theme.colors.indigo['600']
                }
            }}
        >
            {children}
        </NavigationContainer>
    )
}
