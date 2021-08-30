import { useCallback, useContext } from 'react'

import ClientError from 'global/errors'

import { defaultLoaderStyles, LoaderStyles } from '../models/Loader'
import { LoaderSubscriptionContext } from './LoaderSubscriptionContext'
import { LoaderPromiseFn } from './useLoaderSubscription'

export type LoaderSubscriberReturn = (
    toPromise: LoaderPromiseFn
) => Promise<any>

export default function useLoaderSubscriber(
    initialStyles: LoaderStyles = defaultLoaderStyles
): LoaderSubscriberReturn {
    const loaderPromiseWrapper = useContext(LoaderSubscriptionContext)
    if (!loaderPromiseWrapper)
        throw new ClientError('Loader subscription made when not initialized')

    const loaderPromiseSubscriber = useCallback(
        (toPromise) => loaderPromiseWrapper(toPromise, initialStyles),
        [loaderPromiseWrapper]
    )

    return loaderPromiseSubscriber
}
