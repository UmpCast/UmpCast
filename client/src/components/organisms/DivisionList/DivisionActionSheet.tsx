import {
    EditStructService,
    EditStructState
} from '@/machines/editStructMachine'
import { useSelector } from '@xstate/react'
import { Actionsheet, Box, Heading, Text } from 'native-base'

export default function DivisionActionSheet({
    editStructService
}: {
    editStructService: EditStructService
}) {
    const { isOpen, name, edit } = useSelector(
        editStructService,
        (state: EditStructState) => ({
            isOpen: state.matches('editing'),
            name: state.context.selected?.name,
            edit: state.context.edit
        }),
        (prev, next) => prev.isOpen === next.isOpen
    )

    const onClose = () => editStructService.send({ type: 'FINISH' })

    const onSelectDelete = () => edit?.send({ type: 'CONFIRM_DELETE' })
    console.log('action')
    return (
        <Actionsheet
            isOpen={isOpen}
            onClose={onClose}
            testID="division-edit-actionsheet"
        >
            <Actionsheet.Content>
                <Box px={4} py={2} width="100%">
                    <Heading>{name}</Heading>
                </Box>
                <Actionsheet.Item onPress={onSelectDelete}>
                    <Text color="danger.2">Delete</Text>
                </Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
    )
}
