import { useEffect, useState } from 'react'

import { useReactiveVar } from '@apollo/client'

import { appLoadingVar } from 'apollo/reactiveVars'

import { LoaderMountStage } from '../models/LoaderState'

export default function useLoaderMountStages(): {
    stage: LoaderMountStage
    onUnmount: () => void
} {
    const loading = useReactiveVar(appLoadingVar)
    const [stage, setStage] = useState<LoaderMountStage | null>(null)

    useEffect(() => {
        if (stage !== null || loading)
            setStage(
                loading
                    ? LoaderMountStage.MOUNTED
                    : LoaderMountStage.PENDING_UNMOUNT
            )
    }, [loading])

    const onUnmount = () => setStage(LoaderMountStage.UNMOUNTED)

    return {
        stage: stage ?? LoaderMountStage.UNMOUNTED,
        onUnmount
    }
}
