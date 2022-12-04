import { AppTheme } from '@/mobile/useAppThemeInit'
import { createContext, useContext } from 'react'

export const AppThemeContext = createContext<AppTheme>({
    colorMode: 'light',
    toggle: () => {}
})

export function useAppTheme() {
    return useContext(AppThemeContext)
}
