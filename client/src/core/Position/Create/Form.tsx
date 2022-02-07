import { VStack, Text } from 'native-base'

import SignInButton from '@/core/Auth/SignIn/Solid'
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
            <SignInButton disabled={false} onPress={onSubmit}>
                <Text bold fontSize="lg">
                    Create
                </Text>
            </SignInButton>
        </VStack>
    )
}
