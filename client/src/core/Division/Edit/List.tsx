import { VStack } from 'native-base'
import { useState } from 'react'

import PositionEditItem from '@/core/Position/Edit/Item'
import { useGetSeasonStructureQuery } from '@/generated'

import { DivisionEditSelection } from '../models'

import DivisionActionSheet from './Actionsheet'
import DivisionHeader from './Header'
import { PositionEditSelection } from '@/core/Position/models'

export default function DivisionEditList({ seasonId }: { seasonId: string }) {
    const [{ data }] = useGetSeasonStructureQuery({
        variables: {
            id: seasonId
        }
    })

    const [divisionSelection, setDivisionSelection] =
        useState<DivisionEditSelection | null>(null)

    const deselectDivision = () => {
        setDivisionSelection(null)
    }

    const selectDivision = setDivisionSelection

    const [positionSelection, setPositionSelection] =
        useState<PositionEditSelection | null>(null)

    const deselectPosition = () => {
        setPositionSelection(null)
    }

    const selectPosition = setPositionSelection

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
                                            <PositionEditItem
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
