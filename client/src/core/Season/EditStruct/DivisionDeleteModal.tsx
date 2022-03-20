import { Button, Modal, Text } from 'native-base'
import { IModalProps } from 'native-base/lib/typescript/components/composites/Modal'

import { buildID, TestID } from '@/testing/testID'

export interface SeasonEditStructDivisionDeleteModalProps extends IModalProps {
    onConfirm: () => any
}

export default function SeasonEditStructDivisionDeleteModal({
    onConfirm,
    ...rest
}: SeasonEditStructDivisionDeleteModalProps) {
    const { onClose } = rest
    return (
        <Modal
            testID={buildID(TestID.CORE, 'SeasonEditStructDivisionDeleteModal')}
            {...rest}
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
