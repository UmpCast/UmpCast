import { useCallback } from 'react'

import { loaderVar, appLoadingVar } from 'apollo/reactiveVars'

import Loader from '../models/Loader'

export default function useLoader() {
    const startLoading = useCallback(
        (loader: Loader = {}) => {
            loaderVar(loader)
            appLoadingVar(true)
        },
        [loaderVar]
    )

    const stopLoading = useCallback(() => {
        appLoadingVar(false)
    }, [loaderVar])

    return {
        startLoading,
        stopLoading
    }
}
