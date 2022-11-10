import { AppThemeContext, AppColorMode } from '@/hooks/useAppTheme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ReactNode, useEffect, useState } from 'react'

type Props =  {
    children: ReactNode
}
enum StorageKey {
    COLOR_MODE = 'COLOR_MODE'
}

export default function ThemeProvider({children}: Props) {
    const [colorMode, setColorMode] = useState<AppColorMode | null>(null)

    useEffect(() => {
        const init = async () => {
            const storedColorMode = await AsyncStorage.getItem(
                StorageKey.COLOR_MODE
            )

            if (storedColorMode !== null) {
                setColorMode(storedColorMode as AppColorMode)
            } else {
                setColorMode("light")
            }
        }

        init()
    })

    const toggle = () => {
        const newColorMode = colorMode === 'light' ? 'dark' : 'light'
        
        setColorMode(newColorMode)
        AsyncStorage.setItem(StorageKey.COLOR_MODE, newColorMode)
    }

    const themeValue = {
        colorMode,
        toggle
    }

    return (
        <AppThemeContext.Provider value={themeValue}>
            {children}
        </AppThemeContext.Provider>
    )
}
