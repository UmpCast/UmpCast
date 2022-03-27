import { Modal, Button, Text, VStack } from 'native-base'
import { IModalProps } from 'native-base/lib/typescript/components/composites/Modal'
import { useEffect } from 'react'

import * as Form from '@/components/Form'

import useUserJoinedOrgJoinForm from './useForm'

export interface UserJoinedOrgJoinModalProps extends IModalProps {}

export default function UserJoinedOrgJoinModal(
    props: UserJoinedOrgJoinModalProps
) {
    const { isOpen, onClose } = props
    const { control, reset, handleSubmit } = useUserJoinedOrgJoinForm()

    const onSubmit = handleSubmit(onClose)

    useEffect(() => {
        if (!isOpen) reset()
    }, [isOpen])

    return (
        <Modal {...props} testID="UserJoinedOrgJoinModal">
            <Modal.Content testID="org-member-join-modalContent">
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
