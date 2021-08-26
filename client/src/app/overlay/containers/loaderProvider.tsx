import React from 'react'

import { useReactiveVar } from '@apollo/client'

import { loaderOptionsVar } from 'apollo/reactiveVars'

import Loader from '../components/loader'
import LoaderDisplay from '../components/loaderDisplay'
import useLoaderMountStages from '../hooks/useLoaderMountStages'

interface Props {
    children: JSX.Element | null
}

export default function LoaderProvider(props: Props) {
    const { children } = props

    const loaderOptions = useReactiveVar(loaderOptionsVar)
    const { stage, onUnmount } = useLoaderMountStages()

    const { icon, title, message } = loaderOptions

    return (
        <Loader
            loaderDisplay={
                <LoaderDisplay icon={icon} title={title} message={message} />
            }
            visibility={stage}
            onUnmount={onUnmount}
        >
            {children}
        </Loader>
    )
}
