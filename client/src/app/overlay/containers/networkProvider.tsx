import { useEffect } from 'react'

import { useQuery } from '@apollo/client'

import { getNetworkError } from 'app/overlay/graphql/queries/__generated__/getNetworkError'
import GET_NETWORK_ERROR from 'app/overlay/graphql/queries/getNetworkError'

import showNetworkErrorToast from '../components/showNetworkErrorToast'

interface Props {
    children: JSX.Element
}

export default function NetworkErrorProvider(props: Props) {
    const { children } = props

    const { data } = useQuery<getNetworkError>(GET_NETWORK_ERROR)
    const networkError = data?.networkError

    useEffect(() => {
        if (networkError) {
            showNetworkErrorToast(networkError)
        }
    }, [networkError])

    return children
}
