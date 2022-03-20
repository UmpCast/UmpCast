import { Actionsheet, Box, Heading, Text, useDisclose } from 'native-base'

import {
    PositionEditActionsheet_PositionFragment,
    useDeletePositionMutation
} from '@/generated'
import PositionDeleteModal from './PositionDeleteModal'

export default function PositionActionSheet({
    position,
    onClose,
    isOpen
}: {
    position: PositionEditActionsheet_PositionFragment | null
    onClose: () => void
    isOpen: boolean
}) {
    const [_, deletePosition] = useDeletePositionMutation()

    const confirmModal = useDisclose()

    const onConfirmDelete = async () => {
        confirmModal.onClose()
        onClose()

        if (position)
            await deletePosition({ input: { positionId: position.id } })
    }

    const onSelectDelete = () => {
        confirmModal.onOpen()
    }

    return (
        <>
            <Actionsheet
                isOpen={isOpen}
                onClose={onClose}
                testID="position-action-sheet"
            >
                <Actionsheet.Content>
                    <Box px={4} py={2} width="100%">
                        <Heading>{position?.name ?? 'N/A'}</Heading>
                    </Box>
                    <Actionsheet.Item onPress={onSelectDelete}>
                        <Text color="danger.2">Delete</Text>
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
            <PositionDeleteModal
                {...confirmModal}
                onConfirm={onConfirmDelete}
            />
        </>
    )
}
