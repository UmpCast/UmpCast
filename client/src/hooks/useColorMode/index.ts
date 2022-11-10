import { createContext, useContext } from 'react'

export type ColorMode = "light" | "dark"

export type ThemeContextValue = {
    colorMode: ColorMode,
    toggle: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
    colorMode: "light",
    toggle: () => {}
})

export function useTheme() {
    return useContext(ThemeContext)
}
