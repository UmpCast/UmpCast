import React from 'react'

import { Stack } from 'native-base'

import { Season } from '../models/Season'

export type SeasonListProps = {
    seasons: Season[]
    renderItem: (season: Season) => JSX.Element
}

export default function SeasonList({ seasons, renderItem }: SeasonListProps) {
    return (
        <Stack direction="column" space={4}>
            {seasons.map(renderItem)}
        </Stack>
    )
}
