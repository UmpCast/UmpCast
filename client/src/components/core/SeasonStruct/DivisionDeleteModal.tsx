import { Modal, Button, Text, useDisclose } from 'native-base'

import { useDeleteDivisionMutation } from '@/generated'
import { useSelector } from '@xstate/react'
import { EditStructService } from '@/machines/editStructMachine'

export default function DivisionDeleteModal({
    editStructService

}: {
    editStructService: EditStructService
}) {

    const {isOpen, onClose} = useDisclose()

    const [_, deleteDivision] = useDeleteDivisionMutation()

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
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
                            onPress={onClose}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button colorScheme="danger" onPress={() =>deleteDivision}>
                            Confirm
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}
