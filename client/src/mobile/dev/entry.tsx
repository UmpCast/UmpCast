import React, { useEffect, useMemo, useState } from 'react'
import * as Urql from 'urql'

import { getAppTheme } from '@/config/nativeBase/appTheme'
import serverMocks from '@/mock/mocks'
import createMockClient from '@/mock/urqlClient'
import overrideMocks from './overrideMocks'
import { NativeBaseProvider } from 'native-base'
import RootView from '../RootView'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import navigationLinking from '../navigation/linking'
import { ColorMode, ThemeContext } from '@/hooks/useColorMode'

const createClient = () =>
    createMockClient({
        withDevTools: true,
        mocks: {
            ...serverMocks,
            ...overrideMocks
        }
    })

export default function AppDev() {
    const [client, setClient] = useState(createClient)

    const resetClient = () => {
        const newClient = createClient()
        setClient(newClient)
    }

    useEffect(() => {
        resetClient()
    }, [])

    const [colorMode, setColorMode] = useState<ColorMode>("light")

    const toggle = () => {
        setColorMode(colorMode === "light" ? "dark" : "light") 
    }

    const themeValue = {
        colorMode,
        toggle
    }

    const appTheme = getAppTheme(colorMode)
    const { colors } = appTheme
    const { primary, secondary } = colors

    const key = 0

    return (
        <ThemeContext.Provider value={themeValue}>
            <Urql.Provider value={client}>
                <NativeBaseProvider theme={appTheme}>
                    <NavigationContainer
                        linking={navigationLinking}
                        theme={{
                            ...DefaultTheme,
                            colors: {
                                ...DefaultTheme.colors,
                                background: secondary.bg,
                                primary: primary.solid,
                                card: secondary.bg,
                                text: secondary.solid,
                                border: secondary.lite
                            }
                        }}
                    >
                        <RootView resetClient={resetClient} key={key} />
                    </NavigationContainer>
                </NativeBaseProvider>
            </Urql.Provider>
        </ThemeContext.Provider>
    )
}
