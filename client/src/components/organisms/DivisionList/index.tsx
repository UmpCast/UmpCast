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

import { useGetSeasonStructureQuery } from '@/generated'
import useDivisionEdit from '@/hooks/useDivisionEdit'

export interface DivisionListProps {
    seasonId: string
}

export default function DivisionList({ seasonId }: DivisionListProps) {
    const [{ data }] = useGetSeasonStructureQuery({
        variables: {
            id: seasonId
        }
    })

    const {
        confirmModal,
        actionModal,
        startDivisionEdit,
        confirmDivisionDelete,
        selectedDivision
    } = useDivisionEdit()

    return (
        <>
            <VStack space={4}>
                {data?.season?.divisionList?.map(
                    (division) =>
                        division && (
                            <VStack key={division.id} space={4}>
                                <HStack space={2} alignItems="center">
                                    <Pressable
                                        onPress={() =>
                                            startDivisionEdit(division)
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
            {selectedDivision && (
                <>
                    <Actionsheet
                        {...actionModal}
                        testID="division-edit-actionsheet"
                    >
                        <Actionsheet.Content>
                            <Box px={4} py={2} width="100%">
                                <Heading>{selectedDivision.name}</Heading>
                            </Box>
                            <Actionsheet.Item onPress={confirmModal.onOpen}>
                                <Text color="danger.2">Delete</Text>
                            </Actionsheet.Item>
                        </Actionsheet.Content>
                    </Actionsheet>
                    <Modal {...confirmModal} testID="division-delete-modal">
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
                                        onPress={confirmModal.onClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        colorScheme="danger"
                                        onPress={confirmDivisionDelete}
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
