import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'

import { VStack } from 'native-base'

import { useGetSeasonStructureQuery } from '@/generated'
import { RootStackParamList, RootStackRoutes } from '@/navigation'

import DivisionActionSheet from './DivisionActionSheet'
import DivisionDeleteModal from './DivisionDeleteModal'
import DivisionHeader from './DivisionHeader'
import PositionItem from './PositionItem'
import { useInterpret } from '@xstate/react'
import editStructMachine from '@/machines/editStructMachine'
import useEditSeasonStruct from '@/hooks/useEditSeasonStruct'

export default function ({ seasonId }: { seasonId: string }) {
    const [{ data }] = useGetSeasonStructureQuery({
        variables: {
            id: seasonId
        }
    })

    const editReducer = useEditSeasonStruct()

    return (
        <>
            <VStack space={4}>
                {data?.season?.divisionList?.map(
                    (division) =>
                        division && (
                            <VStack key={division.id} space={4}>
                                <DivisionHeader
                                    editReducer={editReducer}
                                    division={division}
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
            <DivisionActionSheet editStructService={editStructService} />
            <DivisionDeleteModal editStructService={editStructService} />
        </>
    )
}
