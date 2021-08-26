import React, { useCallback, useEffect, useState } from 'react'

import { View } from 'react-native'

import initializeVars from 'apollo/initializeVars'

import LoaderProvider from './containers/loaderProvider'
import useSplash from './hooks/useSplash'

interface Props {
    children: JSX.Element
}

export default function AppProvider(props: Props) {
    const { children } = props

    const [appIsReady, setAppIsReady] = useState(false)
    const { persistSplash, hideSplash } = useSplash()

    useEffect(() => {
        async function prepare() {
            await persistSplash()

            await initializeVars()
            await new Promise((resolve) => setTimeout(resolve, 2000))

            setAppIsReady(true)
        }

        prepare()
    }, [])

    const onLayout = useCallback(async () => {
        if (appIsReady) await hideSplash()
    }, [appIsReady, hideSplash])

    return (
        <LoaderProvider>
            <View onLayout={onLayout}>{children}</View>
        </LoaderProvider>
    )
}
