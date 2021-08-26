import React, { useEffect, useState } from 'react'

import { useReactiveVar } from '@apollo/client'

import { appLoadingVar, loaderVar } from 'apollo/reactiveVars'

import LoaderDisplay from '../components/loaderDisplay'
import LoadingOverlay from '../components/loaderOverlay'

interface Props {
    children: JSX.Element | null
}

export default function LoaderProvider(props: Props) {
    const { children } = props

    const loader = useReactiveVar(loaderVar)
    const loading = useReactiveVar(appLoadingVar)

    const [overlayVisible, setOverlayVisible] = useState(loading)

    useEffect(() => {
        if (loading) setOverlayVisible(true)
    }, [loading])

    const onExit = () => {
        setOverlayVisible(false)
    }

    const { icon, title, message } = loader

    return (
        <LoadingOverlay
            loaderDisplay={
                <LoaderDisplay icon={icon} title={title} message={message} />
            }
            overlayVisible={overlayVisible}
            loaderVisible={loading}
            onExit={onExit}
        >
            {children}
        </LoadingOverlay>
    )
}
