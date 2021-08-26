import React from 'react'

import { LoaderMountStage } from '../models/LoaderState'
import LoaderTransition from './loaderTransition'

interface Props {
    loaderDisplay: JSX.Element
    children: JSX.Element | null
    visibility: LoaderMountStage
    onUnmount: () => void
}

export default function Loader(props: Props) {
    const { loaderDisplay, visibility, onUnmount, children } = props

    return (
        <>
            {visibility > LoaderMountStage.UNMOUNTED ? (
                <LoaderTransition
                    type="scale"
                    visible={visibility > LoaderMountStage.PENDING_UNMOUNT}
                    onExit={onUnmount}
                >
                    {loaderDisplay}
                </LoaderTransition>
            ) : null}
            {children}
        </>
    )
}
