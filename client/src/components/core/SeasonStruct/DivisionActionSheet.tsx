import { EditStructService } from '@/machines/editStructMachine'
import { useSelector } from '@xstate/react'
import { Actionsheet, Box, Heading, Text } from 'native-base'

export default function DivisionActionSheet({
    division,
    onSelectDelete,
    onClose
}: {
    onSelectDelete: () => any
    onClose: () => any
    division: {
        id: string
        name?: string
    } | null
}) {
    return (
        <Actionsheet
            isOpen={division !== null}
            onClose={onClose}
            testID="division-action-sheet"
        >
            <Actionsheet.Content>
                <Box px={4} py={2} width="100%">
                    <Heading>{division?.name}</Heading>
                </Box>
                <Actionsheet.Item onPress={onSelectDelete}>
                    <Text color="danger.2">Delete</Text>
                </Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
    )
}
