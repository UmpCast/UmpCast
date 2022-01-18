import React, { useContext } from 'react'
import { Modal, Button, Text } from 'native-base'
import { StructContext } from '.'
import { useDeleteDivisionMutation } from '@/generated'

export default function DivisionDeleteModal() {
    const [state, send] = useContext(StructContext)
    const [_, deleteDivision] = useDeleteDivisionMutation()

    return (
        <Modal
            isOpen={state.matches('editing.deleting')}
            onClose={() => send({ type: 'CANCEL' })}
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
                                    id: state.context.edit?.id ?? '1'
                                })
                            }}
                        >
                            Confirm
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}
