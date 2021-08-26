import Loader from 'app/provider/models/LoaderOptions'
import { loaderOptionsVar, appLoadingVar } from 'global/reactiveVars'

export const startLoading = (loaderOptions: Loader = {}) => {
    loaderOptionsVar(loaderOptions)
    appLoadingVar(true)
}

export const stopLoading = () => appLoadingVar(false)
