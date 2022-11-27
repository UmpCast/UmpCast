import {
    DefaultTheme,
    NavigationContainer,
    NavigationContainerProps
} from '@react-navigation/native'

import navigationLinking from '@/mobile/navigation/linking'

export default function AppNavigationContainer({
    children,
    ...rest
}: NavigationContainerProps) {
    return (
        <NavigationContainer
            linking={navigationLinking}
            theme={{
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    background: '#FFF',
                }
            }}
            {...rest}
        >
            {children}
        </NavigationContainer>
    )
}
