import { VStack } from 'native-base'
import { useState } from 'react'

import { useGetSeasonStructureQuery } from '@/generated'
import { DivisionSelection } from '@/models/SeasonStruct'

import DivisionActionSheet from './DivisionActionSheet'
import DivisionHeader from './DivisionHeader'
import PositionItem from './PositionItem'

export default function SeasonStruct({ seasonId }: { seasonId: string }) {
    const [{ data }] = useGetSeasonStructureQuery({
        variables: {
            id: seasonId
        }
    })

    const [divisionSelection, setDivisionSelection] =
        useState<DivisionSelection | null>(null)

    const deselectDivision = () => {
        setDivisionSelection(null)
    }

    const selectDivision = setDivisionSelection

    return (
        <>
            <VStack space={4}>
                {data?.season?.divisionList?.map(
                    (division) =>
                        division && (
                            <VStack key={division.id} space={4}>
                                <DivisionHeader
                                    division={division}
                                    selectDivision={selectDivision}
                                />
                                {division?.positionList?.map(
                                    (position) =>
                                        position && (
                                            <PositionItem
                                                key={position.id}
                                                position={position}
                                            />
                                        )
                                )}
                            </VStack>
                        )
                )}
            </VStack>
            <DivisionActionSheet
                deselectDivision={deselectDivision}
                division={divisionSelection}
            />
        </>
    )
}
