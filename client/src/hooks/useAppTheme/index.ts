import { createContext, useContext } from 'react'

export type AppColorMode = "light" | "dark"

export type AppThemeContextValue = {
    colorMode?: AppColorMode,
    toggle: () => void
}

export const AppThemeContext = createContext<AppThemeContextValue>({
    colorMode: "light",
    toggle: () => {}
})

export function useAppTheme() {
    return useContext(AppThemeContext)
}
