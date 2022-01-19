import { Modal, Button, Text } from 'native-base'

import { useDeleteDivisionMutation } from '@/generated'
import { useSelector } from '@xstate/react'
import { EditStructService } from '@/machines/editStructMachine'

export default function DivisionDeleteModal({
    editStructService
}: {
    editStructService: EditStructService
}) {
    const { isOpen, id, edit } = useSelector(
        editStructService,
        ({ context: ctx }) => {
            return {
                edit: ctx.edit,
                isOpen:
                    ctx.edit?.getSnapshot()?.matches('confirmingDelete') ??
                    false,
                id: ctx.selected?.id
            }
        },
        (prev, next) => prev.isOpen === next.isOpen
    )
    console.log('delete')

    const [_, deleteDivision] = useDeleteDivisionMutation()

    const onCancel = () => edit?.send({ type: 'CANCEL' })

    const onConfirm = () => {
        edit?.send({ type: 'CONFIRM' })
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
