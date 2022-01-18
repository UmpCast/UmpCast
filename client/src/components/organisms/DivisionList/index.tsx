import React from 'react'
import { VStack } from 'native-base'

import { useGetSeasonStructureQuery } from '@/generated'
import { useNavigation } from '@react-navigation/core'
import { RootStackParamList, RootStackRoutes } from '@/navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import { useMachine } from '@xstate/react'
import {
    divisionListMachine,
    XStructContext,
    XStructEvent
} from './divisionListMachine'
import PositionItem from './PositionItem'
import DivisionActionSheet from './DivisionActionSheet'
import DivisionDeleteModal from './DivisionDeleteModal'
import DivisionHeader from './DivisionHeader'
import { createMachineContext } from '@/utils/react'

export interface DivisionListProps {
    seasonId: string
}

export const StructContext = createMachineContext<
    XStructContext,
    XStructEvent
>()

export default function DivisionList({ seasonId }: DivisionListProps) {
    const [{ data }] = useGetSeasonStructureQuery({
        variables: {
            id: seasonId
        }
    })

    const navigation =
        useNavigation<
            StackNavigationProp<
                RootStackParamList,
                RootStackRoutes.SeasonStructure
            >
        >()

    const machine = useMachine(divisionListMachine)

    return (
        <StructContext.Provider value={machine}>
            <VStack space={4}>
                {data?.season?.divisionList?.map(
                    (division) =>
                        division && (
                            <VStack key={division.id} space={4}>
                                <DivisionHeader division={division} />
                                {division?.positionList?.map(
                                    (position) =>
                                        position && (
                                            <PositionItem
                                                position={position}
                                                key={position.id}
                                            />
                                        )
                                )}
                            </VStack>
                        )
                )}
            </VStack>
            <DivisionActionSheet />
            <DivisionDeleteModal />
        </StructContext.Provider>
    )
}
