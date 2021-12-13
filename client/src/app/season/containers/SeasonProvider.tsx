import { useEffect } from 'react'

import { useQuery } from '@apollo/client'

import { selectedSeasonVar } from '@/apollo/appCache'

import { GetManagerSeasons } from '../graphql/queries/__generated__/GetManagerSeasons'
import { GET_MANAGER_SEASONS } from '../graphql/queries/getManagerSeasons'

export type OrganizationProviderProps = {
    children: JSX.Element
}

export default function SeasonProvider({
    children
}: OrganizationProviderProps) {
    const { loading, data } = useQuery<GetManagerSeasons>(GET_MANAGER_SEASONS)

    useEffect(() => {
        if (loading || !data) return

        const firstSeason = data.me?.userPermit.managerPermitList?.[0].season
        selectedSeasonVar(firstSeason ? firstSeason.id : null)
    }, [loading])

    return loading ? null : children
}
