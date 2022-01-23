import { useDeleteDivisionMutation } from '@/generated'
import { DivisionSelection } from '@/models/SeasonStruct'
import { sleep } from '@/utils/object'
import { Actionsheet, Box, Heading, Text, useDisclose } from 'native-base'
import DivisionDeleteModal from './DivisionDeleteModal'

export default function DivisionActionSheet({
    division,
    deselectDivision
}: {
    division: DivisionSelection | null
    deselectDivision: () => void
}) {
    const [_, deleteDivision] = useDeleteDivisionMutation()

    const confirmModal = useDisclose()

    const onConfirmDelete = async () => {
        confirmModal.onClose()
        console.log()
        deselectDivision()

        if (division) await deleteDivision({ id: division.id })
    }

    const onSelectDelete = () => {
        confirmModal.onOpen()
    }

    return (
        <>
            <Actionsheet
                isOpen={division !== null}
                onClose={deselectDivision}
                testID="division-action-sheet"
            >
                <Actionsheet.Content>
                    <Box px={4} py={2} width="100%">
                        <Heading>{division?.name ?? 'N/A'}</Heading>
                    </Box>
                    <Actionsheet.Item onPress={onSelectDelete}>
                        <Text color="danger.2">Delete</Text>
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
            <DivisionDeleteModal
                {...confirmModal}
                onConfirm={onConfirmDelete}
            />
        </>
    )
}
