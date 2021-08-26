import React from 'react'

import { View } from 'native-base'

import usePrepareApp from '../hooks/usePrepareApp'

interface Props {
    children: JSX.Element
}

export default function AppBootstrapper(props: Props) {
    const { children } = props

    const [appPrepared, onLayout] = usePrepareApp()
    if (!appPrepared) return null

    return <View onLayout={onLayout}>{children}</View>
}
