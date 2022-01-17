import { Ionicons } from '@expo/vector-icons'
import { Icon, Actionsheet, useDisclose, Heading, Box, Text } from 'native-base'
import { Pressable } from 'react-native'
import ConfirmModal from './ConfirmModal'
import DeleteActionItem from './ConfirmModal'

export interface DivisionEditActionProps {
    divisionName: string
    onDelete: () => void
    children: JSX.Element
}

export default function DivisionEditAction({
    divisionName,
    onDelete,
    children
}: DivisionEditActionProps) {
    const { isOpen, onOpen, onClose } = useDisclose()

    return (
        <>
            <Pressable onPress={onOpen}>{children}</Pressable>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Box px={4} py={2} width="100%">
                        <Heading>{divisionName}</Heading>
                    </Box>
                    <ConfirmModal
                        renderPressable={(onOpen) => (
                            <Actionsheet.Item onPress={onOpen}>
                                <Text color="danger.2">Delete</Text>
                            </Actionsheet.Item>
                        )}
                        title="Delete Division"
                        confirmBody={
                            <Text>
                                Are you sure want to delete this division? All
                                positions will be removed.
                            </Text>
                        }
                        handleConfirm={(onModalClose) => {
                            onModalClose()
                            onDelete()
                            onClose()
                        }}
                    />
                </Actionsheet.Content>
            </Actionsheet>
        </>
    )
}
