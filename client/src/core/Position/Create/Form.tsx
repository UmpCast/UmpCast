import { VStack, Text } from 'native-base'

import SolidButton from '@/components/Button/Solid'
import NBControlledInput from '@/components/NB/ControlledInput'

import useCreatePositionForm, { CreatePositionInput } from './useForm'

interface CreatePositionFormProps {
    divisionId: string
    onCreate: (input: CreatePositionInput) => void
}

export default function PositionCreateForm({
    onCreate,
    divisionId
}: CreatePositionFormProps) {
    const { control, onSubmit } = useCreatePositionForm({
        divisionId,
        onCreate
    })

    return (
        <VStack space={4}>
            <NBControlledInput control={control} name="name" title="Name" />
            <SolidButton disabled={false} onPress={onSubmit}>
                <Text bold fontSize="lg">
                    Create
                </Text>
            </SolidButton>
        </VStack>
    )
}
