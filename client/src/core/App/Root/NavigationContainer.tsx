import {
    DefaultTheme,
    NavigationContainer,
    NavigationContainerProps
} from '@react-navigation/native'
import { useTheme } from 'native-base'

import navigationLinking from '@/config/navigation/linking'

export default function AppRootNavigationContainer({
    children,
    ...rest
}: NavigationContainerProps) {
    const theme = useTheme()
    return (
        <NavigationContainer
            linking={navigationLinking}
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
