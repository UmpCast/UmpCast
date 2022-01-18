import { Actionsheet, Box, Heading, Text } from 'native-base'
import React, { useContext } from 'react'
import { StructContext } from '.'

export default function DivisionActionSheet() {
    const [state, send] = useContext(StructContext)

    return (
        <Actionsheet
            isOpen={state.context.edit?.typeName === 'division'}
            onClose={() => send({ type: 'CANCEL' })}
            testID="division-edit-actionsheet"
        >
            <Actionsheet.Content>
                <Box px={4} py={2} width="100%">
                    <Heading>{state.context.edit?.name}</Heading>
                </Box>
                <Actionsheet.Item onPress={() => send({ type: 'DELETE' })}>
                    <Text color="danger.2">Delete</Text>
                </Actionsheet.Item>
            </Actionsheet.Content>
        </Actionsheet>
    )
}
