import { Modal, Button, Text } from 'native-base'

export default function DivisionDeleteModal({
    isOpen,
    onClose,
    onConfirm
}: {
    isOpen: boolean
    onClose: () => any
    onConfirm: () => any
}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            testID="division-delete-modal"
            animationPreset="slide"
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
                        <Button colorScheme="danger" onPress={onConfirm}>
                            Confirm
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}
