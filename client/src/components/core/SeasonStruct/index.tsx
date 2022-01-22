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
import DivisionDeleteModal from './DivisionDeleteModal'
import DivisionActionSheet from './DivisionActionSheet'

type EditData = {
    id: string
    name: string
}

export default function ({ seasonId }: { seasonId: string }) {
    const [{ data }] = useGetSeasonStructureQuery({
        variables: {
            id: seasonId
        }
    })

    const [selectedDiv, setSelectedDiv] = useState<EditData | null>(null)

    return (
        <>
            <VStack space={4}>
                {data?.season?.divisionList?.map(
                    (division) =>
                        division && (
                            <VStack key={division.id} space={4}>
                                <HStack
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <HStack alignItems="center" space={2}>
                                        <Pressable
                                            onPress={() =>
                                                setSelectedDiv({
                                                    id: division.id,
                                                    name: division.name ?? 'N/A'
                                                })
                                            }
                                            testID={`division-edit-icon-${division.id}`}
                                        >
                                            <Icon
                                                as={Ionicons}
                                                color="primary.2"
                                                name="create-outline"
                                            />
                                        </Pressable>
                                        <Text
                                            bold
                                            color="secondary.3"
                                            fontSize="xl"
                                        >
                                            {division?.name}
                                        </Text>
                                    </HStack>
                                    <Pressable onPress={() => {}}>
                                        <Icon
                                            as={Ionicons}
                                            color="primary.2"
                                            name="md-person-add-outline"
                                            testID={`division-add-icon-${division.id}`}
                                        />
                                    </Pressable>
                                </HStack>
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
            <DivisionActionSheet division={selectedDiv} />
        </>
    )
}
