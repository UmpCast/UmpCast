import { useCallback, useContext } from 'react'

import ClientError from 'global/errors'

import { LoaderSubscriptionContext } from '../containers/loaderProvider'
import { LoaderStyles } from '../models/Loader'
import { LoaderPromiseFn } from './useLoaderSubscription'

export type LoaderSubscriberReturn = (
    toPromise: LoaderPromiseFn
) => Promise<any>

export default function useLoaderSubscriber(
    initialStyles: LoaderStyles
): LoaderSubscriberReturn {
    const loaderPromiseWrapper = useContext(LoaderSubscriptionContext)
    if (!loaderPromiseWrapper) throw new ClientError('Loader subscription made when not initialized')

    const loaderPromiseSubscriber = useCallback(
        (toPromise) => loaderPromiseWrapper(toPromise, initialStyles),
        [loaderPromiseWrapper],
    )

    return loaderPromiseSubscriber
}
