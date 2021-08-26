import { useState, useEffect } from 'react'

import initializeVars from 'apollo/initializeVars'

import useSplash from './useSplash'

export default function usePrepareApp(): [
    boolean,
    () => Promise<boolean | void>
] {
    const [appPrepared, setAppPrepared] = useState(false)
    const { persistSplash, hideSplash: onLayout } = useSplash()

    useEffect(() => {
        async function prepare() {
            await persistSplash()

            await initializeVars()
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setAppPrepared(true)
        }

        prepare()
    }, [])

    return [appPrepared, onLayout]
}
