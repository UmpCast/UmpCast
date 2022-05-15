import { Button, VStack, Text, Modal } from 'native-base'
import { IModalProps } from 'native-base/lib/typescript/components/composites/Modal'

interface ConfirmationSimpleModalProps extends IModalProps {
    title: string
    description: JSX.Element
    onConfirmPress: () => any
    confirmText?: string
    cancelText?: string
}

export default function ConfirmationSimpleModal({
    title,
    description,
    confirmText = 'Yes',
    cancelText = 'No',
    onConfirmPress,
    ...rest
}: ConfirmationSimpleModalProps) {
    return (
        <Modal {...rest}>
            <Modal.Content>
                <Modal.Header>{title}</Modal.Header>
                <Modal.Body>
                    <VStack space={4}>
                        <Text fontSize="sm">{description}</Text>
                        <VStack space={2}>
                            <Button
                                colorScheme="indigo"
                                onPress={onConfirmPress}
                                variant="subtle"
                            >
                                {confirmText}
                            </Button>
                            <Button
                                colorScheme="blueGray"
                                onPress={rest.onClose}
                                variant="subtle"
                            >
                                {cancelText}
                            </Button>
                        </VStack>
                    </VStack>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    )
}
