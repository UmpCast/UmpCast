import { useState, useEffect } from 'react'

import recoverAuth from 'app/auth/graphql/mutations/recoverAuth'
import useTimer from 'utils/timer'

import { persistSplash, hideSplash } from './useSplash'

async function initializeVars(): Promise<void> {
    await recoverAuth()
}

export default function usePrepareApp(): [
    boolean,
    () => Promise<boolean | void>
] {
    const splashMin = useTimer(500)

    const [initialized, setInitialized] = useState(false)
    const [prepared, setPrepared] = useState(false)

    useEffect(() => {
        async function initialize() {
            await persistSplash()
            await initializeVars()

            setInitialized(true)
        }

        initialize()
    }, [])

    useEffect(() => {
        setPrepared(initialized && splashMin)
    }, [initialized, splashMin])

    const onLayout = () => hideSplash()

    return [prepared, onLayout]
}
