import React, { useEffect, useState } from 'react'
import * as Urql from 'urql'

import { getNativeBaseTheme } from '@/config/nativeBase/theme'
import serverMocks from '@/mock/mocks'
import createMockClient from '@/mock/urqlClient'
import overrideMocks from './overrideMocks'
import { NativeBaseProvider } from 'native-base'
import RootView from '../RootView'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import navigationLinking from '../navigation/linking'
import { AppThemeContext } from '@/hooks/useAppTheme'
import useInitAppTheme from '../useAppThemeInit'
import * as NavigationBar from 'expo-navigation-bar'
import { Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'

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

    const appTheme = useInitAppTheme()

    const resetClient = () => {
        const newClient = createClient()
        setClient(newClient)
    }

    useEffect(() => {
        resetClient()
    }, [])

    const { colorMode } = appTheme

    useEffect(() => {
        if (colorMode) {
            const { colors } = getNativeBaseTheme(colorMode)

            if (Platform.OS === 'android') {
                NavigationBar.setBackgroundColorAsync(colors.secondary.bg)
                NavigationBar.setBorderColorAsync(colors.secondary.bg)
            }
        }
    }, [colorMode])

    if (!colorMode) {
        return null
    }

    const nativeBaseTheme = getNativeBaseTheme(colorMode)

    const { colors } = nativeBaseTheme
    const { primary, secondary } = colors
    const key = 0

    return (
        <>
            <StatusBar style={colorMode == 'dark' ? 'light' : 'dark'} />
            <AppThemeContext.Provider value={appTheme}>
                <Urql.Provider value={client}>
                    <NativeBaseProvider theme={nativeBaseTheme}>
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
            </AppThemeContext.Provider>
        </>
    )
}
