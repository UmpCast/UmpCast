import React from 'react'

import AppBootstrapper from './containers/appBootstrapper'
import LoaderProvider from './containers/loaderProvider'

interface Props {
    children: JSX.Element
}
export default function AppProvider({ children }: Props) {
    return (
        <LoaderProvider>
            <AppBootstrapper>{children}</AppBootstrapper>
        </LoaderProvider>
    )
}
