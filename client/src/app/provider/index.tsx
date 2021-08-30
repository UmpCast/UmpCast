import React from 'react'

import AppBootstrapper from './containers/appBootstrapper'
import LoaderProvider from './containers/loaderProvider'

export default function AppProvider({ children }: { children: JSX.Element }) {
    return (
        <LoaderProvider>
            <AppBootstrapper>{children}</AppBootstrapper>
        </LoaderProvider>
    )
}
