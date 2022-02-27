import { OrgDeleteModal_OrganizationFragment } from '@/generated'
import { Button, VStack, Modal, Text, Box } from 'native-base'

interface ContentProp {
    org: OrgDeleteModal_OrganizationFragment
    onConfirmPress: () => any
    onCancelPress: () => any
}

function Content({ org, onConfirmPress, onCancelPress }: ContentProp) {
    return (
        <Modal.Content>
            <Modal.Header>Delete Organization</Modal.Header>
            <Modal.Body>
                <VStack space={4}>
                    <Text fontSize="sm">
                        Are you sure you want to delete{' '}
                        <Box fontWeight="bold">{org.title}</Box>?
                    </Text>
                    <VStack space={2}>
                        <Button colorScheme="indigo" onPress={onConfirmPress}>
                            Yes
                        </Button>
                        <Button colorScheme="blueGray" onPress={onCancelPress}>
                            No
                        </Button>
                    </VStack>
                </VStack>
            </Modal.Body>
        </Modal.Content>
    )
}

const OrgDeleteModal = {
    Content
}

export default OrgDeleteModal
