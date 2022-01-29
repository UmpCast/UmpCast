import { Actionsheet, Box, Heading, Text, useDisclose } from 'native-base'

import { useDeletePositionMutation } from '@/generated'

import PositionDeleteModal from '../Delete/Modal'
import { PositionEditSelection } from '../models'

export default function PositionActionSheet({
    position,
    deselectPosition
}: {
    position: PositionEditSelection | null
    deselectPosition: () => void
}) {
    const [_, deletePosition] = useDeletePositionMutation()

    const confirmModal = useDisclose()

    const onConfirmDelete = async () => {
        confirmModal.onClose()
        deselectPosition()

        if (position) await deletePosition({ id: position.id })
    }

    const onSelectDelete = () => {
        confirmModal.onOpen()
    }

    return (
        <>
            <Actionsheet
                isOpen={position !== null}
                onClose={deselectPosition}
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
