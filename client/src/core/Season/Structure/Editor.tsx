import { VStack } from 'native-base'
import { useState } from 'react'

import { useGetSeasonStructureQuery } from '@/generated'

import { PositionEditSelection } from '@/core/Position/models'
import PositionActionSheet from '@/core/Position/Edit/Actionsheet'
import PositionEditItem from '@/core/Position/Edit/Item'
import DivisionActionSheet from '@/core/Division/Edit/Actionsheet'
import DivisionHeader from '@/core/Division/Edit/Header'
import { DivisionEditSelection } from '@/core/Division/models'

type SeasonStructurePosition =
    | {
          id: string
          name?: string | null
      }
    | null
    | undefined

type SeasonStructureDivision =
    | {
          id: string
          name?: string | null
          positionList?: SeasonStructurePosition[] | null
      }
    | null
    | undefined

export default function SeasonStructurEditor({
    seasonId
}: {
    seasonId: string
}) {
    const [{ data }] = useGetSeasonStructureQuery({
        variables: {
            id: seasonId
        }
    })

    const [divisionSelection, setDivisionSelection] =
        useState<DivisionEditSelection | null>(null)

    const [positionSelection, setPositionSelection] =
        useState<PositionEditSelection | null>(null)

    const renderPositionItems = (positions: SeasonStructurePosition[]) => {
        return positions.map(
            (position) =>
                position && (
                    <PositionEditItem
                        key={position.id}
                        position={position}
                        onPress={() => {
                            setPositionSelection(position)
                        }}
                    />
                )
        )
    }

    const renderDivisionItems = (divisions: SeasonStructureDivision[]) => {
        return divisions.map(
            (division) =>
                division && (
                    <VStack key={division.id} space={4}>
                        <DivisionHeader
                            division={division}
                            onTitlePress={() => {
                                setDivisionSelection(division)
                            }}
                        />
                        {renderPositionItems(division?.positionList ?? [])}
                    </VStack>
                )
        )
    }

    return (
        <>
            <VStack space={4}>
                {renderDivisionItems(data?.season?.divisionList ?? [])}
            </VStack>
            <DivisionActionSheet
                deselectDivision={() => {
                    setDivisionSelection(null)
                }}
                division={divisionSelection}
            />
            <PositionActionSheet
                deselectPosition={() => {
                    setPositionSelection(null)
                }}
                position={positionSelection}
            />
        </>
    )
}
