import { useDisclose, Actionsheet, Modal, Button } from 'native-base'

export interface DeleteItemProps {
    renderPressable: (onOpen: () => void) => JSX.Element
    handleConfirm: (onClose: () => void) => Promise<void> | void
    title: string
    confirmBody: JSX.Element
}

export default function DeleteItem({
    renderPressable,
    handleConfirm,
    title,
    confirmBody
}: DeleteItemProps) {
    const { isOpen, onOpen, onClose } = useDisclose()

    return (
        <>
            {renderPressable(onOpen)}
            <Modal isOpen={isOpen} onClose={onClose}>
                <Modal.Content>
                    <Modal.Header>{title}</Modal.Header>
                    <Modal.Body>{confirmBody}</Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme="danger"
                                onPress={() => handleConfirm(onClose)}
                            >
                                Confirm
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    )
}
