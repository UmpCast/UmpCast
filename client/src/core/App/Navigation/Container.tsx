import {
    DefaultTheme,
    NavigationContainer,
    NavigationContainerProps
} from '@react-navigation/native'
import { useTheme } from 'native-base'

import NavigationLinking from '@/navigation/linking'

export default function AppNavigationContainer({
    children,
    ...rest
}: NavigationContainerProps) {
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
            {...rest}
        >
            {children}
        </NavigationContainer>
    )
}
