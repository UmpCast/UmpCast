import { VStack } from 'native-base'
import { useState } from 'react'

import { useGetSeasonStructureQuery } from '@/generated'

import { DivisionEditSelection } from '../models'

import DivisionActionSheet from './Actionsheet'
import DivisionHeader from './Header'
import { PositionEditSelection } from '@/core/Position/models'
import PositionActionSheet from '@/core/Position/Edit/Actionsheet'
import PositionEditItem from '@/core/Position/Edit/Item'

export type SeasonPositionItem =
    | {
          id: string
          name?: string | null
      }
    | null
    | undefined

export type SeasonDivisionItem =
    | {
          id: string
          name?: string | null
          positionList?: (SeasonPositionItem | null)[] | null
      }
    | null
    | undefined

export default function DivisionEditList({ seasonId }: { seasonId: string }) {
    const [{ data }] = useGetSeasonStructureQuery({
        variables: {
            id: seasonId
        }
    })

    const [divisionSelection, setDivisionSelection] =
        useState<DivisionEditSelection | null>(null)

    const [positionSelection, setPositionSelection] =
        useState<PositionEditSelection | null>(null)

    const renderPositionItems = (positions: SeasonPositionItem[]) => {
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

    const renderDivisionItems = (divisions: SeasonDivisionItem[]) => {
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
