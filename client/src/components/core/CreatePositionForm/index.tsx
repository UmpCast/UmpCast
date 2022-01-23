import { VStack, Text } from 'native-base'

import useCreatePositionForm, {
    CreatePositionInput
} from '@/hooks/useCreatePositionForm'

import NBControlledInput from '../../helper/NBControlledInput'
import GenericButton from '../../helper/SignInButton'

interface CreatePositionFormProps {
    divisionId: string
    onCreate: (input: CreatePositionInput) => void
}

export default function CreatePositionForm({
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
            <GenericButton disabled={false} onPress={onSubmit}>
                <Text bold fontSize="lg">
                    Create
                </Text>
            </GenericButton>
        </VStack>
    )
}
