import { useCallback } from 'react'

import { loaderOptionsVar, appLoadingVar } from 'apollo/reactiveVars'

import Loader from '../models/LoaderOptions'

export default function useLoader() {
    const startLoading = useCallback(
        (loaderOptions: Loader = {}) => {
            loaderOptionsVar(loaderOptions)
            appLoadingVar(true)
        },
        [loaderOptionsVar]
    )

    const stopLoading = useCallback(() => {
        appLoadingVar(false)
    }, [loaderOptionsVar])

    return {
        startLoading,
        stopLoading
    }
}
