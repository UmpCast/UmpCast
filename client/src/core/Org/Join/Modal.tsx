import { Modal, Button, Text, VStack } from 'native-base'
import { useEffect } from 'react'

import * as Form from '@/components/Form'

import useOrgJoinForm from './useForm'

export default function OrgJoinModal({
    isOpen,
    onClose
}: {
    isOpen: boolean
    onClose: () => any
}) {
    const { control, onSubmit, reset } = useOrgJoinForm({
        onSuccess: onClose
    })

    useEffect(() => {
        if (!isOpen) return
        reset()
    }, [isOpen])

    return (
        <Modal isOpen={isOpen} onClose={onClose} testID="org-join-modal">
            <Modal.Content>
                <Modal.Header>Join Organization</Modal.Header>
                <Modal.Body>
                    <VStack space={2}>
                        <Text>Provide your organization&apos;s join code</Text>
                        <Form.Controller
                            control={control}
                            name="code"
                            render={() => (
                                <Form.Control>
                                    <Form.Input />
                                    <Form.ErrorMessage />
                                </Form.Control>
                            )}
                        />
                    </VStack>
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
                        <Button colorScheme="indigo" onPress={onSubmit}>
                            Join
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}
