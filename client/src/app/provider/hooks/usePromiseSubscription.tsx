import { useCallback, useState } from 'react'

export type PromiseFn = () => Promise<any>
export type PromiseWrapperFn = (process: PromiseFn) => Promise<any>

export type PromiseSubscriptionReturn = [
    subscribed: boolean,
    processWrapper: PromiseWrapperFn
]

export default function usePromiseSubscription(): PromiseSubscriptionReturn {
    const [subscribed, setSubscribed] = useState<boolean>(false)

    const promiseWrapper: PromiseWrapperFn = useCallback(
        async (toPromise) => {
            setSubscribed(true)

            const response = await toPromise()

            setSubscribed(false)
            return response
        },
        [setSubscribed]
    )

    return [subscribed, promiseWrapper]
}
