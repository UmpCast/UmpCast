import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
    HStack,
    Icon,
    VStack,
    Text,
    Actionsheet,
    Box,
    Heading,
    Button,
    Pressable,
    Modal
} from 'native-base'

import {
    useDeleteDivisionMutation,
    useGetSeasonStructureQuery
} from '@/generated'
import useDivisionEdit from '@/hooks/useDivisionEdit'
import { useNavigation } from '@react-navigation/core'
import { RootStackParamList, RootStackRoutes } from '@/navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import { useMachine } from '@xstate/react'
import { divisionListMachine } from './divisionListMachine'
import { stat } from 'fs'

export interface DivisionListProps {
    seasonId: string
}

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

    const [state, send] = useMachine(divisionListMachine)

    const onPositionAdd = (divisionId: string) => {
        navigation.navigate(RootStackRoutes.PositionCreate, {
            divisionId
        })
    }

    const [_, deleteDivision] = useDeleteDivisionMutation()

    return (
        <>
            <VStack space={4}>
                {data?.season?.divisionList?.map(
                    (division) =>
                        division && (
                            <VStack key={division.id} space={4}>
                                <HStack
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <HStack space={2} alignItems="center">
                                        <Pressable
                                            onPress={() =>
                                                send({
                                                    type: 'EDIT',
                                                    edit: {
                                                        id: division.id,
                                                        typeName: 'division',
                                                        name:
                                                            division.name ??
                                                            'N/A'
                                                    }
                                                })
                                            }
                                        >
                                            <Icon
                                                as={Ionicons}
                                                color="primary.2"
                                                name="create-outline"
                                                testID={`division-edit-icon-${division.id}`}
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
                                    <Pressable
                                        onPress={() =>
                                            onPositionAdd(division.id)
                                        }
                                    >
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
                                            <HStack
                                                justifyContent="space-between"
                                                key={position.id}
                                            >
                                                <HStack
                                                    alignItems="center"
                                                    space={4}
                                                    pl={4}
                                                >
                                                    <Icon
                                                        as={Ionicons}
                                                        color="secondary.2"
                                                        name="person-outline"
                                                    />
                                                    <Text
                                                        color="secondary.2"
                                                        fontSize="lg"
                                                    >
                                                        {position.name}
                                                    </Text>
                                                </HStack>
                                                <Icon
                                                    as={Ionicons}
                                                    color="secondary.2"
                                                    name="md-ellipsis-vertical"
                                                    size={5}
                                                />
                                            </HStack>
                                        )
                                )}
                            </VStack>
                        )
                )}
            </VStack>
            {state.matches('editing') && (
                <>
                    <Actionsheet
                        isOpen={state.context.edit?.typeName === 'division'}
                        onClose={() => send({ type: 'CANCEL' })}
                        testID="division-edit-actionsheet"
                    >
                        <Actionsheet.Content>
                            <Box px={4} py={2} width="100%">
                                <Heading>{state.context.edit?.name}</Heading>
                            </Box>
                            <Actionsheet.Item
                                onPress={() => send({ type: 'DELETE' })}
                            >
                                <Text color="danger.2">Delete</Text>
                            </Actionsheet.Item>
                        </Actionsheet.Content>
                    </Actionsheet>
                    <Modal
                        isOpen={state.matches('editing.deleting')}
                        onClose={() => send({ type: 'CANCEL' })}
                        testID="division-delete-modal"
                    >
                        <Modal.Content>
                            <Modal.Header>Delete Division</Modal.Header>
                            <Modal.Body>
                                <Text>
                                    Are you sure want to delete this division?
                                    All positions will be removed.
                                </Text>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button
                                        variant="ghost"
                                        colorScheme="blueGray"
                                        onPress={() => send({ type: 'CANCEL' })}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        colorScheme="danger"
                                        onPress={() => {
                                            send({ type: 'CONFIRM' })
                                            deleteDivision({
                                                id:
                                                    state.context.edit?.id ??
                                                    '1'
                                            })
                                        }}
                                    >
                                        Confirm
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </>
            )}
        </>
    )
}
