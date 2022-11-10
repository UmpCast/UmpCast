import React, { useEffect, useState } from 'react'
import * as Urql from 'urql'

import { getAppTheme } from '@/config/nativeBase/appTheme'
import serverMocks from '@/mock/mocks'
import createMockClient from '@/mock/urqlClient'
import overrideMocks from './overrideMocks'
import { NativeBaseProvider } from 'native-base'
import RootView from '../RootView'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import navigationLinking from '../navigation/linking'
import { useAppTheme } from '@/hooks/useAppTheme'
import ThemeProvider from '../ThemeProvider'

const createClient = () =>
    createMockClient({
        withDevTools: true,
        mocks: {
            ...serverMocks,
            ...overrideMocks
        }
    })

function Entry() {
    const { colorMode } = useAppTheme()

    const [client, setClient] = useState(createClient)

    const resetClient = () => {
        const newClient = createClient()
        setClient(newClient)
    }

    useEffect(() => {
        resetClient()
    }, [])

    if (!colorMode) {
        return null
    }

    const appTheme = getAppTheme(colorMode)
    const { colors } = appTheme
    const { primary, secondary } = colors
    const key = 0

    return (
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
    )
}

export default function AppDev() {
    return (
        <ThemeProvider>
            <Entry />
        </ThemeProvider>
    )
}
