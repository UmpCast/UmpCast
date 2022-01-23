import usePositionCreateForm from '@/hooks/usePositionCreateForm'
import { VStack, Heading, Text } from 'native-base'

import NBControlledInput from '../../helper/NBControlledInput'
import GenericButton from '../../helper/SignInButton'

export default function PositionCreateForm({
    divisionId
}: PositionCreateFormConfig) {
    const { control, submitPositionCreate } = usePositionCreateForm({
        divisionId
    })

    const onSubmit = submitPositionCreate

    return (
        <VStack flex={1} p={4} space={4} testID="position-create-form">
            <Heading textAlign="center">Create Position</Heading>
            <NBControlledInput
                control={control}
                name="name"
                title="Position Name"
            />
            <GenericButton disabled={false} onPress={onSubmit}>
                <Text bold fontSize="lg">
                    Create
                </Text>
            </GenericButton>
        </VStack>
    )
}
