import { useCallback, useState } from 'react'

import { LoaderStyles, defaultLoaderStyles } from '../models/Loader'
import usePromiseSubscription from './usePromiseSubscription'

export type SetMessageFn = (s: string) => void
export type LoaderPromiseFn = (setMsg: SetMessageFn) => Promise<any>
export type LoaderPromiseWrapperFn = (
    cb: LoaderPromiseFn,
    styles: LoaderStyles
) => Promise<any>

export type LoaderSubscriptionReturn = [
    boolean,
    LoaderStyles,
    LoaderPromiseWrapperFn
]

export default function useLoaderSubscription(): LoaderSubscriptionReturn {
    const [loaderStyles, setLoaderStyles] =
        useState<LoaderStyles>(defaultLoaderStyles)

    const [subscribed, promiseWrapper] = usePromiseSubscription()

    const setMessage: SetMessageFn = useCallback(
        (newMessage) => {
            setLoaderStyles((styles) => ({
                ...styles,
                message: newMessage
            }))
        },
        [setLoaderStyles]
    )

    const loaderPromiseWrapper = useCallback(
        async (loaderPromise: LoaderPromiseFn, initialStyles: LoaderStyles) => {
            setLoaderStyles(initialStyles)
            return promiseWrapper(() => loaderPromise(setMessage))
        },
        [promiseWrapper, setMessage]
    )

    return [subscribed, loaderStyles, loaderPromiseWrapper]
}
