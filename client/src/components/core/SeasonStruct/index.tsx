import {
    Actionsheet,
    Box,
    Button,
    Heading,
    HStack,
    Icon,
    Modal,
    Pressable,
    VStack,
    Text,
    useDisclose
} from 'native-base'
import { useState } from 'react'

import {
    useDeleteDivisionMutation,
    useGetSeasonStructureQuery
} from '@/generated'

import PositionItem from './PositionItem'
import { Ionicons } from '@expo/vector-icons'
import DivisionActionSheet from './DivisionActionSheet'
import { DivisionSelection } from '@/models/SeasonStruct'
import DivisionHeader from './DivisionHeader'

export default function ({ seasonId }: { seasonId: string }) {
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
                division={divisionSelection}
                deselectDivision={deselectDivision}
            />
        </>
    )
}
