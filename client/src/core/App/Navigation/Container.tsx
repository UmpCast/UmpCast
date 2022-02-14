import NavigationLinking from '@/navigation/linking'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'native-base'

export interface AppNavigationContainerProps {
    children: JSX.Element
}

export default function AppNavigationContainer({
    children
}: AppNavigationContainerProps) {
    const theme = useTheme()
    console.log(theme.colors.indigo['500'])

    return (
        <NavigationContainer
            theme={{
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    background: '#FFF',
                    text: theme.colors.blueGray['700'],
                    primary: theme.colors.indigo['600']
                }
            }}
            linking={NavigationLinking}
        >
            {children}
        </NavigationContainer>
    )
}
