import { Modal, Button, Text } from 'native-base'

import { useDeleteDivisionMutation } from '@/generated'
import { useSelector } from '@xstate/react'
import { EditStructService } from '@/machines/editStructMachine'

export default function DivisionDeleteModal({
    editStructService
}: {
    editStructService: EditStructService
}) {
    const { isOpen, id } = useSelector(
        editStructService,
        ({ value, context: ctx, matches }) => {
            console.log(value)
            return {
                isOpen: matches('editing.confirmingDelete'),
                id: ctx.selected?.id
            }
        },
        (prev, next) => prev.isOpen === next.isOpen
    )

    const [_, deleteDivision] = useDeleteDivisionMutation()

    const onCancel = () => editStructService.send({ type: 'CANCEL' })

    const onConfirm = () => {
        editStructService.send({ type: 'FINISH' })
        if (id) deleteDivision({ id })
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCancel}
            testID="division-delete-modal"
        >
            <Modal.Content>
                <Modal.Header>Delete Division</Modal.Header>
                <Modal.Body>
                    <Text>
                        Are you sure want to delete this division? All positions
                        will be removed.
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button
                            colorScheme="blueGray"
                            onPress={onCancel}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button colorScheme="danger" onPress={onConfirm}>
                            Confirm
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}
