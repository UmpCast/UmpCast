import React from 'react'

import AbsoluteOverlay from './absoluteOverlay'

export default function LoaderOverlay({
    showOverlay,
    alert,
    children
}: {
    showOverlay: boolean
    alert: JSX.Element
    children: JSX.Element
}) {
    return (
        <>
            {showOverlay ? <AbsoluteOverlay>{alert}</AbsoluteOverlay> : null}
            {children}
        </>
    )
}
