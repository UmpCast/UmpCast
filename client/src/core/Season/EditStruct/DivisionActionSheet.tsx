import { Actionsheet, Box, Heading, Text, useDisclose } from 'native-base'

import {
    SeasonEditStructDivisionActionSheet_DivisionFragment as Division,
    useDeleteDivisionMutation
} from '@/generated'
import { ComponentID } from '@/testing/testID'
import SeasonEditStructDivisionDeleteModal from './DivisionDeleteModal'

export default function SeasonEditStructDivisionActionSheet({
    division,
    onClose,
    isOpen
}: {
    division: Division | null
    onClose: () => void
    isOpen: boolean
}) {
    const [_, deleteDivision] = useDeleteDivisionMutation()

    const divisionDeleteDisclose = useDisclose()

    const onConfirmDelete = async () => {
        divisionDeleteDisclose.onClose()
        onClose()

        if (division)
            await deleteDivision({ input: { divisionId: division.id } })
    }

    const onSelectDelete = () => {
        divisionDeleteDisclose.onOpen()
    }

    return (
        <>
            <Actionsheet
                isOpen={isOpen}
                onClose={onClose}
                testID={`${ComponentID.CORE}:SeasonEditStructDivisionActionSheet`}
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
            <SeasonEditStructDivisionDeleteModal
                {...divisionDeleteDisclose}
                onConfirm={onConfirmDelete}
            />
        </>
    )
}
