import React from 'react'

import { useQuery } from '@apollo/client'

import { selectedSeasonVar } from '@/apollo/appCache'

import SeasonList from '../components/SeasonList'
import SeasonSelectable from '../components/SeasonSelectable'
import { GetManagerSeasons } from '../graphql/queries/__generated__/GetManagerSeasons'
import { GetSelectedSeason } from '../graphql/queries/__generated__/GetSelectedSeason'
import { GET_MANAGER_SEASONS } from '../graphql/queries/getManagerSeasons'
import { GET_SELECTED_SEASON } from '../graphql/queries/getSelectedSeason'

export default function ManagerSeasonList() {
    const { loading, data: { me } = {} } =
        useQuery<GetManagerSeasons>(GET_MANAGER_SEASONS)

    const { data: { selectedSeason } = {} } =
        useQuery<GetSelectedSeason>(GET_SELECTED_SEASON)

    const seasons =
        me?.userPermit.managerPermitList.map(({ season }) => season) ?? []

    if (loading) return null

    return (
        <SeasonList
            seasons={seasons}
            renderItem={(season) => (
                <SeasonSelectable
                    season={season}
                    isSelected={season.id === selectedSeason}
                    onSelect={selectedSeasonVar}
                    key={season.id}
                />
            )}
        />
    )
}
