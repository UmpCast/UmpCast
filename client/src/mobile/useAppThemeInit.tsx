import { StorageKey } from '@/config/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export type AppColorMode = 'light' | 'dark'

export type AppTheme = {
    colorMode?: AppColorMode
    toggle: () => void
}

export default function useInitAppTheme(): AppTheme {
    const [colorMode, setColorMode] = useState<AppColorMode>()

    useEffect(() => {
        const init = async () => {
            const storedColorMode = await AsyncStorage.getItem(
                StorageKey.COLOR_MODE
            )

            if (storedColorMode !== null) {
                setColorMode(storedColorMode as AppColorMode)
            } else {
                setColorMode('light')
            }
        }

        init()
    })

    const toggle = () => {
        const newColorMode = colorMode === 'light' ? 'dark' : 'light'

        setColorMode(newColorMode)
        AsyncStorage.setItem(StorageKey.COLOR_MODE, newColorMode)
    }

    return {
        colorMode,
        toggle
    }
}
