import { useState, useEffect } from 'react'

import { useQuery } from '@apollo/client'

import { GetAuthentication } from '../graphql/queries/__generated__/GetAuthentication'
import { GET_AUTHENTICATION } from '../graphql/queries/getAuthentication'

const useAuthentication = (initialized: boolean) => {
    const [prepared, setPrepared] = useState(false)
    const { data, refetch } = useQuery<GetAuthentication>(GET_AUTHENTICATION)

    useEffect(() => {
        async function prepare() {
            await refetch()
            setPrepared(true)
        }

        if (initialized) prepare()
    }, [initialized])

    return [prepared, data?.authentication]
}

export default useAuthentication
