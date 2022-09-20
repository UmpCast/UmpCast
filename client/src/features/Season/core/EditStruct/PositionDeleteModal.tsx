import { Modal, Button, Text } from 'native-base'

export default function PositionDeleteModal({
    isOpen,
    onClose,
    onConfirm
}: {
    isOpen: boolean
    onClose: () => any
    onConfirm: () => any
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} testID="position-delete-modal">
            <Modal.Content>
                <Modal.Header>Delete Position</Modal.Header>
                <Modal.Body>
                    <Text>Are you sure want to delete this position?</Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button colorScheme="blueGray" onPress={onClose} variant="ghost">
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
